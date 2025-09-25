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
        
        // Ensure the uploaded file is a JPEG image for this specific route
        if (file.type !== 'image/jpeg') {
             return new NextResponse('Please upload a valid JPEG image file.', { status: 400 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());

        // Use sharp to convert the JPEG buffer to a WebP buffer
        // We can specify a quality setting, 80 is a good balance for web use.
        const webpBuffer = await sharp(fileBuffer)
            .webp({ quality: 80 })
            .toBuffer();

        // Return the new WebP image file
        return new NextResponse(webpBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/webp',
                // Optional: Suggest a filename for the download
                'Content-Disposition': `attachment; filename="${file.name.replace(/\.[^/.]+$/, "")}.webp"`,
            },
        });

    } catch (error) {
        console.error('Error converting JPEG to WebP:', error);
        return new NextResponse('An error occurred during the image conversion.', { status: 500 });
    }
}
