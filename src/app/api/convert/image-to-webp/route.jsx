import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const quality = parseInt(formData.get('quality'), 10);

        if (!file) {
            return new NextResponse('No file uploaded.', { status: 400 });
        }

        if (isNaN(quality) || quality < 1 || quality > 100) {
            return new NextResponse('Quality must be an integer between 1 and 100.', { status: 400 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());

        const outputBuffer = await sharp(fileBuffer)
            .webp({ quality: quality })
            .toBuffer();
            
        const contentType = 'image/webp';

        return new NextResponse(outputBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Length': outputBuffer.length,
                'Content-Disposition': `attachment; filename="converted.webp"`,
            },
        });

    } catch (error) {
        console.error('Error converting to WebP:', error);
        return new NextResponse('An error occurred during the image conversion.', { status: 500 });
    }
}
