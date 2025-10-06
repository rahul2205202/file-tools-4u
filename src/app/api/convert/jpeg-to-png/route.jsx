import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return new NextResponse('No file uploaded.', { status: 400 });
        }

        if (file.type !== 'image/jpeg') {
            return new NextResponse('Invalid file type. Please upload a JPEG.', { status: 400 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());

        const outputBuffer = await sharp(fileBuffer)
            .png()
            .toBuffer();
            
        const contentType = 'image/png';

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
