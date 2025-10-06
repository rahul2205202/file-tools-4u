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
        
        if (file.type !== 'image/jpeg') {
             return new NextResponse('Please upload a valid JPEG image file.', { status: 400 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());

        const webpBuffer = await sharp(fileBuffer)
            .webp({ quality: 80 })
            .toBuffer();

        return new NextResponse(webpBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/webp',
                'Content-Disposition': `attachment; filename="${file.name.replace(/\.[^/.]+$/, "")}.webp"`,
            },
        });

    } catch (error) {
        console.error('Error converting JPEG to WebP:', error);
        return new NextResponse('An error occurred during the image conversion.', { status: 500 });
    }
}
