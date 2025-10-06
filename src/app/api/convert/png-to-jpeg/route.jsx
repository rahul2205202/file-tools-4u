import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return new NextResponse('No file uploaded.', { status: 400 });
        }

        if (file.type !== 'image/png') {
            return new NextResponse('Invalid file type. Please upload a PNG file.', { status: 400 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());

        const outputBuffer = await sharp(fileBuffer)
            .flatten({ background: { r: 255, g: 255, b: 255 } })
            .jpeg({ quality: 90 })
            .toBuffer();
            
        const contentType = 'image/jpeg';
    
        return new NextResponse(outputBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Length': outputBuffer.length,
                'Content-Disposition': `attachment; filename="converted.jpeg"`,
            },
        });

    } catch (error) {
        console.error('Error converting PNG to JPEG:', error);
        return new NextResponse('An error occurred during the image conversion.', { status: 500 });
    }
}
