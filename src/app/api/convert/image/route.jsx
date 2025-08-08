import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const toFormat = formData.get('toFormat')?.toLowerCase();

        if (!file) {
            return new NextResponse('Please upload a file.', { status: 400 });
        }

        const supportedFormats = ['jpeg', 'png', 'gif', 'bmp'];
        if (!toFormat || !supportedFormats.includes(toFormat)) {
            return new NextResponse(`Unsupported output format. Please use one of: ${supportedFormats.join(', ')}.`, { status: 400 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());
        let outputBuffer;
        let contentType;

        // Use Sharp to convert the image to the specified format
        switch (toFormat) {
            case 'jpeg':
                outputBuffer = await sharp(fileBuffer).jpeg({ quality: 90 }).toBuffer();
                contentType = 'image/jpeg';
                break;
            case 'png':
                outputBuffer = await sharp(fileBuffer).png().toBuffer();
                contentType = 'image/png';
                break;
            case 'gif':
                outputBuffer = await sharp(fileBuffer).gif().toBuffer();
                contentType = 'image/gif';
                break;
            case 'bmp':
                // Sharp outputs BMP as raw pixel data, so we need to specify the format
                outputBuffer = await sharp(fileBuffer).raw().toBuffer();
                contentType = 'image/bmp';
                break;
            default:
                // This case should not be reached due to the validation above
                return new NextResponse('Invalid format specified.', { status: 400 });
        }

        return new NextResponse(outputBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Length': outputBuffer.length,
            },
        });

    } catch (error) {
        console.error('Error converting image:', error);
        return new NextResponse('Error during image conversion.', { status: 500 });
    }
}
