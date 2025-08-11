import { NextResponse } from 'next/server';
import sharp from 'sharp';

/**
 * API route to handle converting a PNG image to a JPEG image.
 */
export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        // 1. Validate that a file was uploaded
        if (!file) {
            return new NextResponse('No file uploaded.', { status: 400 });
        }

        // 2. Validate that the uploaded file is a PNG
        if (file.type !== 'image/png') {
            return new NextResponse('Invalid file type. Please upload a PNG file.', { status: 400 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());

        // 3. Convert the PNG buffer to a JPEG buffer using sharp
        // The .flatten() method adds a white background to transparent areas.
        const outputBuffer = await sharp(fileBuffer)
            .flatten({ background: { r: 255, g: 255, b: 255 } }) // Handle transparency
            .jpeg({ quality: 90 }) // Set JPEG quality
            .toBuffer();
            
        const contentType = 'image/jpeg';

        // 4. Return the converted file as a response
        return new NextResponse(outputBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Length': outputBuffer.length,
                // Optional: Suggest a filename for the download
                'Content-Disposition': `attachment; filename="converted.jpeg"`,
            },
        });

    } catch (error) {
        console.error('Error converting PNG to JPEG:', error);
        return new NextResponse('An error occurred during the image conversion.', { status: 500 });
    }
}
