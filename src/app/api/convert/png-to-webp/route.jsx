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
        
        // Ensure the uploaded file is a PNG for this specific route
        if (file.type !== 'image/png') {
             return new NextResponse('Please upload a valid PNG image file.', { status: 400 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());

        // Use sharp to convert the PNG buffer to a WebP buffer
        // The lossless option ensures maximum quality, similar to the original PNG
        const webpBuffer = await sharp(fileBuffer)
            .webp({ lossless: true })
            .toBuffer();

        // Return the new WebP image file
        return new NextResponse(webpBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/webp',
                // Suggest a filename for the download, changing the extension
                'Content-Disposition': `attachment; filename="${file.name.replace(/\.[^/.]+$/, "")}.webp"`,
            },
        });

    } catch (error) {
        console.error('Error converting PNG to WebP:', error);
        return new NextResponse('An error occurred during the image conversion.', { status: 500 });
    }
}
