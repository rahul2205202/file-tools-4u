import { NextResponse } from 'next/server';
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

        const fileBuffer = Buffer.from(await file.arrayBuffer());

        const compressedImageBuffer = await sharp(fileBuffer)
            .jpeg({ 
                quality: Math.round(quality * 100),
                mozjpeg: true,
            })
            .toBuffer();

        return new NextResponse(compressedImageBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Length': compressedImageBuffer.length,
            },
        });

    } catch (error) {
        console.error('Error compressing image:', error);
        return new NextResponse('Error during image compression.', { status: 500 });
    }
}
