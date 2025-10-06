import { NextResponse } from 'next/server';
import axios from 'axios';
import { Buffer } from 'buffer';

export const maxDuration = 60;

export async function POST(request) {
    try {
        const formData = await request.formData();
        const textContent = formData.get('textContent');
        const file = formData.get('file');

        if (!textContent && !file) {
            return new NextResponse(JSON.stringify({ error: 'Please provide either text or an image.' }), { status: 400 });
        }

        const payload = {
            contents: [{ parts: [] }]
        };

        const userPrompt = "Generate 20-30 trending and relevant SEO hashtags based on the user's input. The output should be a single string of hashtags separated by spaces, with each hashtag starting with a '#' symbol. The hashtags should be highly relevant and optimized for maximum reach. Do not include any other text, explanations, or formatting. Be concise and focus on the most effective tags.";
        
        payload.contents[0].parts.push({ text: userPrompt });

        if (textContent) {
            payload.contents[0].parts.push({ text: `\nDescription: ${textContent}` });
        }

        if (file) {
            const fileBuffer = Buffer.from(await file.arrayBuffer());
            const base64Image = fileBuffer.toString('base64');
            payload.contents[0].parts.push({
                inlineData: {
                    mimeType: file.type,
                    data: base64Image,
                },
            });
        }
        
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('Gemini API key is not configured on the server.');
        }
        
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        const response = await axios.post(apiUrl, payload);
        const generatedHashtags = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedHashtags) {
            throw new Error('AI did not return a valid response.');
        }
        
        return new NextResponse(generatedHashtags, {
            status: 200,
            headers: { 'Content-Type': 'text/plain' },
        });

    } catch (error) {
        console.error('Error generating hashtags:', error.response ? error.response.data : error.message);
        const errorMessage = error.response?.data?.error?.message || 'An unexpected error occurred during hashtag generation.';
        return new NextResponse(JSON.stringify({ error: errorMessage }), { status: 500 });
    }
}

