import { NextResponse } from 'next/server';
import sharp from 'sharp';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return new NextResponse('Please upload a file.', { status: 400 });
        }
        
        if (file.type !== 'image/webp') {
             return new NextResponse('Please upload a valid WebP image file.', { status: 400 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());

        const pngBuffer = await sharp(fileBuffer)
            .png()
            .toBuffer();

        return new NextResponse(pngBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                'Content-Disposition': `attachment; filename="${file.name.replace(/\.[^/.]+$/, "")}.png"`,
            },
        });

    } catch (error) {
        console.error('Error converting WebP to PNG:', error);
        return new NextResponse('An error occurred during the image conversion.', { status: 500 });
    }
}
