import { NextResponse } from 'next/server';
import axios from 'axios';
import { Buffer } from 'buffer';

// This configures the max body size for this specific API route
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

        // Convert the uploaded file to a buffer and then to base64
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const base64Image = fileBuffer.toString('base64');
        const mimeType = file.type;

        // --- CORRECTED: Use the gemini-2.5-flash-image-preview model ---
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('Gemini API key is not configured on the server.');
        }
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{
                parts: [
                    { text: "Restore this old, blurry, and scratched photo. Enhance the details, clarify faces, remove all scratches and damage, and upscale the resolution. Return only the restored image." },
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: base64Image
                        }
                    }
                ]
            }],
             generationConfig: {
                responseModalities: ['IMAGE']
            },
        };

        const response = await axios.post(apiUrl, payload);

        // --- CORRECTED: Extract the image data from the response ---
        const base64Data = response.data?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

        if (!base64Data) {
            console.error('Gemini API Response did not contain image data:', response.data);
            throw new Error('The AI model did not return a valid image. It might be due to a safety policy violation or an issue with the input image.');
        }

        // Convert the base64 string back to a buffer
        const imageBuffer = Buffer.from(base64Data, 'base64');

        // Return the image buffer directly
        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png', // The model usually returns PNG
            },
        });

    } catch (error) {
        console.error('Error restoring photo:', error.response ? error.response.data : error.message);
        const errorMessage = error.response?.data?.error?.message || 'An unexpected error occurred during photo restoration.';
        return new NextResponse(errorMessage, { status: 500 });
    }
}

