import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request) {
    try {
        const formData = await request.formData();
        // Use .getAll() to handle multiple files with the same key
        const files = formData.getAll('files');

        if (!files || files.length === 0) {
            return new NextResponse('Please upload at least one image file.', { status: 400 });
        }

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();

        for (const file of files) {
            const fileBuffer = Buffer.from(await file.arrayBuffer());
            let image;

            // Embed the image. pdf-lib supports JPG and PNG.
            if (file.type === 'image/jpeg') {
                image = await pdfDoc.embedJpg(fileBuffer);
            } else if (file.type === 'image/png') {
                image = await pdfDoc.embedPng(fileBuffer);
            } else {
                // Skip unsupported file types
                console.warn(`Skipping unsupported file type: ${file.type}`);
                continue;
            }

            // Add a new page to the document
            const page = pdfDoc.addPage();
            const { width, height } = page.getSize();
            
            // Scale the image to fit the page while maintaining aspect ratio
            const scaledDims = image.scaleToFit(width - 50, height - 50); // 25px margin

            // Draw the image on the page, centered
            page.drawImage(image, {
                x: (width - scaledDims.width) / 2,
                y: (height - scaledDims.height) / 2,
                width: scaledDims.width,
                height: scaledDims.height,
            });
        }

        // Save the PDF to a buffer
        const pdfBytes = await pdfDoc.save();

        return new NextResponse(pdfBytes, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Length': pdfBytes.length,
            },
        });

    } catch (error) {
        console.error('Error converting images to PDF:', error);
        return new NextResponse('Error during PDF creation.', { status: 500 });
    }
}
