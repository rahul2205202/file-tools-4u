import { NextResponse } from 'next/server';

export async function GET(request) {
    const apiKey = process.env.GEMINI_API_KEY;

    // Log the key to the server logs (visible in Google Cloud Logging)
    console.log('Attempting to read GEMINI_API_KEY...');
    console.log('Key found:', !!apiKey); // This will print true or false

    if (apiKey) {
        // For security, only show the first few characters in the response
        const maskedKey = `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`;
        return NextResponse.json({ 
            message: 'Secret was loaded successfully!',
            key: maskedKey 
        });
    } else {
        return NextResponse.json({ 
            message: 'Error: Secret could not be found in the environment.' 
        }, { status: 500 });
    }
}