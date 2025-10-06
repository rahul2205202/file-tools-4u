import { NextResponse } from 'next/server';
import convert from 'heic-convert';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '15mb',
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
        
        const inputBuffer = Buffer.from(await file.arrayBuffer());

        const outputBuffer = await convert({
            buffer: inputBuffer,
            format: 'PNG'
        });

        return new NextResponse(outputBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                'Content-Disposition': `attachment; filename="${file.name.replace(/\.[^/.]+$/, "")}.png"`,
            },
        });

    } catch (error) {
        console.error('Error converting HEIC to PNG:', error);
        if (error.message.includes('Input buffer is not a HEIC file')) {
             return new NextResponse('The uploaded file is not a valid HEIC image.', { status: 400 });
        }
        return new NextResponse('An error occurred during the image conversion.', { status: 500 });
    }
}
