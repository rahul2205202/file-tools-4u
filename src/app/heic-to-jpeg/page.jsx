import React from 'react';
import HeicToJpegConverter from '../components/tools/HeicToJpegConverter';

export const metadata = {
    title: 'Free HEIC to JPEG Converter | Convert iPhone Photos Online | File Tools 4U',
    description: 'Easily convert your Apple HEIC photos to the universally compatible JPEG (.jpg) format for free. Our online tool is fast, secure, and perfect for sharing iPhone pictures on any device or platform.',
    keywords: 'heic to jpeg, heic to jpg, convert heic to jpeg, iphone photo converter, heif to jpg, online heic converter, free file tools',
    
    // Core SEO
    alternates: {
        canonical: 'https://filetools4u.com/convert-heic-to-jpeg',
    },
};

export default function HeicToJpegPage() {
    return <HeicToJpegConverter />;
}
