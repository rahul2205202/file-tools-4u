import React from 'react';
import HeicToPngConverter from '../components/tools/HeicToPngConverter';

export const metadata = {
    title: 'Free HEIC to PNG Converter | Preserve Transparency | File Tools 4U',
    description: 'Instantly convert your Apple HEIC photos to high-quality, lossless PNG format. Our free online tool is perfect for preserving transparency in iPhone images.',
    keywords: 'heic to png, heic to png converter, convert heic to png, iphone photo to png, heif to png, lossless converter, free file tools',
    
    alternates: {
        canonical: 'https://filetools4u.com/convert-heic-to-png',
    },
};

export default function HeicToPngPage() {
    return <HeicToPngConverter />;
}
