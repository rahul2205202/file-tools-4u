import { NextResponse } from 'next/server';
import convert from 'heic-convert';

// Increase the body size limit to handle larger HEIC files
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '15mb', // HEIC files can be larger
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
        
        // --- FIX ---
        // The unreliable MIME type check has been removed.
        // The 'heic-convert' library will validate the file content itself.
        // --- END OF FIX ---

        const inputBuffer = Buffer.from(await file.arrayBuffer());

        // Use the heic-convert library to perform the conversion
        const outputBuffer = await convert({
            buffer: inputBuffer, // The HEIC file buffer
            format: 'JPEG',      // The output format
            quality: 0.9         // A high quality setting (0 to 1)
        });

        // Return the new JPEG image file
        return new NextResponse(outputBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/jpeg',
                // Suggest a filename for the download, changing the extension to .jpeg
                'Content-Disposition': `attachment; filename="${file.name.replace(/\.[^/.]+$/, "")}.jpeg"`,
            },
        });

    } catch (error) {
        console.error('Error converting HEIC to JPEG:', error);
        // Provide a more specific error if the conversion itself fails
        if (error.message.includes('Input buffer is not a HEIC file')) {
             return new NextResponse('The uploaded file is not a valid HEIC image.', { status: 400 });
        }
        return new NextResponse('An error occurred during the image conversion.', { status: 500 });
    }
}
