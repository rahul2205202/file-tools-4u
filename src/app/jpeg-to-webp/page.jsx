import React from 'react';
import JpegToWebpConverter from '../components/tools/JpegToWebpConverter';

export const metadata = {
    title: 'Convert JPEG to WebP Free | Online JPG to WebP Converter | File Tools 4U',
    description: 'Easily convert your JPEG (.jpg, .jpeg) photos to the modern, high-efficiency WebP format for free. Optimize your images for faster website load times.',
    keywords: 'jpeg to webp, jpg to webp, convert jpeg to webp, image optimization, free image converter, webp converter, jpg to webp converter, jpeg to webp online, webp image format, photo conversion, jpeg to webp converter free',
    
    // Core SEO
    alternates: {
        canonical: 'https://filetools4u.com/jpeg-to-webp',
    },
};

export default function JpegToWebpPage() {
    return <JpegToWebpConverter />;
}
