import { NextResponse } from 'next/server';
import sharp from 'sharp';

/**
 * API route to handle converting an image (JPG, PNG, etc.) to WebP format.
 */
export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const quality = parseInt(formData.get('quality'), 10);

        // 1. Validate that a file was uploaded
        if (!file) {
            return new NextResponse('No file uploaded.', { status: 400 });
        }

        // 2. Validate the quality setting
        if (isNaN(quality) || quality < 1 || quality > 100) {
            return new NextResponse('Quality must be an integer between 1 and 100.', { status: 400 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());

        // 3. Convert the image buffer to a WebP buffer using sharp
        const outputBuffer = await sharp(fileBuffer)
            .webp({ quality: quality }) // Set the WebP quality
            .toBuffer();
            
        const contentType = 'image/webp';

        // 4. Return the converted WebP file as a response
        return new NextResponse(outputBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Length': outputBuffer.length,
                // Optional: Suggest a filename for the download
                'Content-Disposition': `attachment; filename="converted.webp"`,
            },
        });

    } catch (error) {
        console.error('Error converting to WebP:', error);
        return new NextResponse('An error occurred during the image conversion.', { status: 500 });
    }
}
