import { NextResponse } from 'next/server';
import sharp from 'sharp';

// Increase the body size limit to handle larger image files
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
        
        // Ensure the uploaded file is a WebP image for this specific route
        if (file.type !== 'image/webp') {
             return new NextResponse('Please upload a valid WebP image file.', { status: 400 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());

        // Use sharp to convert the WebP buffer to a PNG buffer
        const pngBuffer = await sharp(fileBuffer)
            .png() // Specify the output format as PNG
            .toBuffer();

        // Return the new PNG image file
        return new NextResponse(pngBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                // Optional: Suggest a filename for the download
                'Content-Disposition': `attachment; filename="${file.name.replace(/\.[^/.]+$/, "")}.png"`,
            },
        });

    } catch (error) {
        console.error('Error converting WebP to PNG:', error);
        return new NextResponse('An error occurred during the image conversion.', { status: 500 });
    }
}
