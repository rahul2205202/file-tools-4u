import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp'; // Import the sharp library

export async function POST(request) {
    try {
        const formData = await request.formData();
        const files = formData.getAll('files');
        const filename = formData.get('filename') || 'filetools4u-document.pdf';

        if (!files || files.length === 0) {
            return new NextResponse('Please upload at least one image file.', { status: 400 });
        }

        const pdfDoc = await PDFDocument.create();

        for (const file of files) {
            const fileBuffer = Buffer.from(await file.arrayBuffer());
            
            // --- ROBUST LOGIC ---
            // 1. Use sharp to process the image, converting it to a reliable PNG format.
            // This handles any input format (JPG, WEBP, GIF, etc.) and standardizes it.
            const pngBuffer = await sharp(fileBuffer).png().toBuffer();

            // 2. Embed the newly created and validated PNG buffer into the PDF
            const image = await pdfDoc.embedPng(pngBuffer);
            // --- END OF LOGIC ---

            const page = pdfDoc.addPage();
            const { width, height } = page.getSize();
            const scaledDims = image.scaleToFit(width - 50, height - 50);

            page.drawImage(image, {
                x: (width - scaledDims.width) / 2,
                y: (height - scaledDims.height) / 2,
                width: scaledDims.width,
                height: scaledDims.height,
            });
        }

        const pdfBytes = await pdfDoc.save();

        return new NextResponse(pdfBytes, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Length': pdfBytes.length,
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });

    } catch (error) {
        console.error('Error converting images to PDF:', error);
        return new NextResponse('Error during PDF creation.', { status: 500 });
    }
}
