import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return new NextResponse('Prompt is required.', { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('Gemini API key is not configured on the server.');
        }

        const payload = {
            instances: [{ prompt }],
            parameters: { "sampleCount": 1 }
        };
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

        const response = await axios.post(apiUrl, payload);
        
        const predictions = response.data.predictions;
        if (predictions && predictions.length > 0 && predictions[0].bytesBase64Encoded) {
            const imageUrl = `data:image/png;base64,${predictions[0].bytesBase64Encoded}`;
            return NextResponse.json({ imageUrl });
        } else {
            throw new Error('API did not return a valid image.');
        }

    } catch (error) {
        console.error('Error in AI image generation API route:', error);
        const errorMessage = error.response?.data?.error?.message || error.message;
        return new NextResponse(errorMessage || 'An unexpected error occurred.', { status: 500 });
    }
}
