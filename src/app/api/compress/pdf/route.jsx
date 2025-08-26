import { NextResponse } from 'next/server';
import { PDFDocument, PDFName } from 'pdf-lib';
import sharp from 'sharp';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const quality = parseFloat(formData.get('quality'));

        if (!file) {
            return new NextResponse('Please upload a file.', { status: 400 });
        }
        if (isNaN(quality) || quality < 0.1 || quality > 1.0) {
            return new NextResponse('Quality must be between 0.1 and 1.0.', { status: 400 });
        }

        const pdfBuffer = Buffer.from(await file.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBuffer, { 
            updateMetadata: false 
        });

        // --- NEW, MORE ROBUST LOGIC ---
        
        // 1. Find all unique image objects in the PDF
        const imageRefs = new Set();
        pdfDoc.getPages().forEach(page => {
            const resources = page.node.Resources();
            if (resources) {
                const xobjects = resources.get(PDFName.of('XObject'));
                if (xobjects) {
                    xobjects.entries().forEach(([key, value]) => {
                        if (value.get(PDFName.of('Subtype')) === PDFName.of('Image')) {
                            imageRefs.add(value);
                        }
                    });
                }
            }
        });

        // 2. Process each unique image
        const imagePromises = Array.from(imageRefs).map(async (ref) => {
            const image = pdfDoc.context.lookup(ref);
            if (image.get(PDFName.of('Subtype')) !== PDFName.of('Image')) return;

            try {
                const imageBytes = image.getContents();
                const sharpImage = sharp(imageBytes);
                const metadata = await sharpImage.metadata();

                // Aggressive downsampling logic
                let maxDimension = 0;
                if (quality <= 0.2) maxDimension = 400;
                else if (quality <= 0.5) maxDimension = 720;
                else if (quality <= 0.8) maxDimension = 1080;
                else maxDimension = 1500;

                let processedImage = sharpImage;
                if (metadata.width > maxDimension || metadata.height > maxDimension) {
                    processedImage = sharpImage.resize({
                        width: maxDimension,
                        height: maxDimension,
                        fit: 'inside',
                        withoutEnlargement: true,
                    });
                }

                const compressedImageBytes = await processedImage
                    .jpeg({ quality: Math.round(quality * 100), mozjpeg: true })
                    .toBuffer();

                // 3. Embed the new, compressed image into the PDF
                const newImage = await pdfDoc.embedJpg(compressedImageBytes);

                // 4. Replace the old image reference with the new one everywhere it's used
                pdfDoc.context.assign(ref, newImage.ref);

            } catch (e) {
                console.warn(`Skipping an image that could not be re-compressed: ${e.message}`);
            }
        });

        await Promise.all(imagePromises);

        // --- END OF NEW LOGIC ---

        const compressedPdfBytes = await pdfDoc.save();

        return new NextResponse(compressedPdfBytes, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
            },
        });

    } catch (error) {
        console.error('Error compressing PDF:', error);
        return new NextResponse('Error during PDF compression.', { status: 500 });
    }
}
