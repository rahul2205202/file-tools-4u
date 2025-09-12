import { NextResponse } from 'next/server';
import axios from 'axios';
import { Buffer } from 'buffer';

// Allow this route to run for up to 90 seconds, as AI generation can be slow.
export const maxDuration = 800;

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return new NextResponse('Please upload a file.', { status: 400 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const base64Image = fileBuffer.toString('base64');
        const mimeType = file.type;

        // The powerful prompt we developed, designed for this specific task
        const figurinePrompt = "Create a 1/7 scale commercialized figurine of the characters in the picture, in a realistic style, in a real environment. The figurine is placed on a computer desk. The figurine has a round transparent acrylic base, with no text on the base. The content on the computer screen is a 3D modeling process of this figurine. Next to the computer screen is a toy packaging box, designed in a style reminiscent of high-quality collectible figures, printed with original artwork. The packaging features two-dimensional flat illustrations.";

        const payload = {
            contents: [{
                parts: [
                    { text: figurinePrompt },
                    { inlineData: { mimeType: mimeType, data: base64Image } }
                ]
            }],
             generationConfig: {
                responseModalities: ['IMAGE']
            },
        };

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('Gemini API key is not configured on the server.');
        }
        
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;

        const response = await axios.post(apiUrl, payload);
        const base64Data = response.data?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

        if (!base64Data) {
            throw new Error('AI model did not return a valid image.');
        }

        const imageBuffer = Buffer.from(base64Data, 'base64');
        
        return new NextResponse(imageBuffer, {
            status: 200,
            headers: { 'Content-Type': 'image/png' },
        });

    } catch (error) {
        console.error('Error creating figurine:', error.response ? error.response.data : error.message);
        const errorMessage = error.response?.data?.error?.message || 'An unexpected error occurred during image generation.';
        return new NextResponse(JSON.stringify({ error: errorMessage }), { status: 500 });
    }
}
