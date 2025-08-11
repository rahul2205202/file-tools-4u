import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        // 1. Validate that a file was uploaded
        if (!file) {
            return new NextResponse('No file uploaded.', { status: 400 });
        }

        // 2. Validate that the uploaded file is a JPEG
        if (file.type !== 'image/jpeg') {
            return new NextResponse('Invalid file type. Please upload a JPEG.', { status: 400 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());

        // 3. Convert the JPEG buffer to a PNG buffer using sharp
        const outputBuffer = await sharp(fileBuffer)
            .png() // Specify PNG output
            .toBuffer();
            
        const contentType = 'image/png';

        // 4. Return the converted file
        return new NextResponse(outputBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Length': outputBuffer.length,
            },
        });

    } catch (error) {
        console.error('Error converting image:', error);
        return new NextResponse('Error during image conversion.', { status: 500 });
    }
}
