import { NextResponse } from 'next/server';
import convert from 'heic-convert';

// Increase the body size limit to handle larger HEIC files
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

        // Use the heic-convert library to perform the conversion specifically to PNG
        const outputBuffer = await convert({
            buffer: inputBuffer, // The HEIC file buffer
            format: 'PNG'       // The output format
        });

        // Return the new PNG image file
        return new NextResponse(outputBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                // Suggest a filename for the download, changing the extension to .png
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
