import React from 'react';
import WebpToPngConverter from '../components/tools/WebpToPngConverter'; // Import the main component

// SEO metadata for the WebP to PNG Converter page
export const metadata = {
    title: 'Convert WebP to PNG Free | Online WebP to PNG Converter | File Tools 4U',
    description: 'Easily convert your modern WebP images to the universally compatible PNG format for free. Our online tool preserves transparency and quality.',
    keywords: 'webp to png, convert webp to png, webp to png converter, online webp converter, free image converter',
    
    // Core SEO
    alternates: {
        canonical: 'https://filetools4u.com/webp-to-png',
    },
};

// The page component itself is very simple
export default function WebpToPngPage() {
    return <WebpToPngConverter />;
}
