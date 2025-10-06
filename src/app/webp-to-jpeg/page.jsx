import React from 'react';
import WebpToJpegConverter from '../components/tools/WebpToJpegConverter';

export const metadata = {
    title: 'Convert WebP to JPEG Free | Online WebP to JPG Converter | File Tools 4U',
    description: 'Easily convert your WebP images back to the universally supported JPEG (.jpg) format for free. Perfect for compatibility with older software and devices.',
    keywords: 'webp to jpeg, webp to jpg, convert webp to jpeg, image converter, free image tools, webp format, webp to jpeg converter, webp to jpg online, jpeg image format, photo conversion, webp to jpeg converter free',
    
    // Core SEO
    alternates: {
        canonical: 'https://filetools4u.com/webp-to-jpeg',
    },
};

export default function WebpToJpegPage() {
    return <WebpToJpegConverter />;
}
