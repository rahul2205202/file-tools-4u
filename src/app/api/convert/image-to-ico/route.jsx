import { NextResponse } from 'next/server';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

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
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const pngBuffer = await sharp(fileBuffer)
            .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .png()
            .toBuffer();
        const icoBuffer = await pngToIco(pngBuffer);
        return new NextResponse(icoBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/x-icon',
                'Content-Disposition': `attachment; filename="favicon.ico"`,
            },
        });

    } catch (error) {
        console.error('Error converting image to ICO:', error);
        return new NextResponse('An error occurred during the icon conversion. Please ensure you are uploading a valid image file.', { status: 500 });
    }
}
