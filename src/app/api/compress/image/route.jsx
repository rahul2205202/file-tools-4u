import { NextResponse } from 'next/server';
import sharp from 'sharp'; // A modern, high-performance image processing library for Node.js

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

        // Convert the uploaded file into a buffer that Sharp can read
        const fileBuffer = Buffer.from(await file.arrayBuffer());

        // Use Sharp to process the image. We convert to JPEG as it's the best format for quality-based compression.
        const compressedImageBuffer = await sharp(fileBuffer)
            .jpeg({ 
                quality: Math.round(quality * 100),
                mozjpeg: true, // Use mozjpeg for better compression
            })
            .toBuffer();

        // Return the compressed image as a blob in the response
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
