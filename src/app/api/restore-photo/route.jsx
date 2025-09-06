import { NextResponse } from 'next/server';
import axios from 'axios';
import sharp from 'sharp'; // We will use sharp for upscaling
import { Buffer } from 'buffer';

export const maxDuration = 60; // Allow this function to run for up to 60 seconds

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

        // UPDATED PROMPT: We've removed the "Final Upscaling" step, as we will handle that ourselves.
        const restorationPrompt = `Act as a world-class digital archivist and photo restoration expert. Your task is to meticulously restore the following old, damaged photograph.

Follow these steps precisely:
1.  **Damage Removal:** Inpaint and completely remove all physical damage, including scratches, tears, cracks, dust, and water spots.
2.  **Detail & Clarity Enhancement:** Denoise the image to remove film grain and digital noise, then apply a sophisticated deblurring algorithm to sharpen the focus. Reconstruct fine, high-fidelity details.
3.  **Facial Reconstruction:** This is the most critical step. Reconstruct facial features with photorealistic accuracy, enhance the eyes to make them clear and bright, and restore natural-looking skin texture. Do not make the faces look artificial or overly smooth.
4.  **Color & Tone Correction:** Correct any fading and remove color casts to restore vibrant, natural tones. If it is black and white, enhance the dynamic range for maximum clarity.

Return only the final, restored image.`;
        
        const payload = {
            contents: [{
                parts: [
                    { text: restorationPrompt },
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

        // --- STEP 1: Get the restored image from the AI ---
        const response = await axios.post(apiUrl, payload);
        const base64Data = response.data?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

        if (!base64Data) {
            throw new Error('AI model did not return a valid restored image.');
        }

        const restoredImageBuffer = Buffer.from(base64Data, 'base64');

        // --- STEP 2: Upscale the restored image using Sharp ---
        const metadata = await sharp(restoredImageBuffer).metadata();
        const upscaledImageBuffer = await sharp(restoredImageBuffer)
            .resize(metadata.width * 2, metadata.height * 2, { // We'll double the resolution
                kernel: sharp.kernel.lanczos3, // This is a high-quality resizing algorithm
            })
            .png() // Output as PNG to preserve quality
            .toBuffer();

        // --- Return the final, upscaled image ---
        return new NextResponse(upscaledImageBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
            },
        });

    } catch (error) {
        console.error('Error restoring photo:', error.response ? error.response.data : error.message);
        const errorMessage = error.response?.data?.error?.message || 'An unexpected error occurred during restoration.';
        return new NextResponse(JSON.stringify({ error: errorMessage }), { status: 500 });
    }
}

