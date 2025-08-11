import React from 'react';
import WebpConverter from '../components/tools/WebpConverter'; // Adjust the import path based on your file structure

// SEO metadata for the WebP converter page
export const metadata = {
    title: 'Free WebP Converter | Convert JPG & PNG to WebP Online',
    description: 'Convert your JPG and PNG images to the modern, high-efficiency WebP format for free. Reduce file size and improve website speed with our online tool.',
    keywords: 'webp converter, convert to webp, jpg to webp, png to webp, image converter, free tool',
    alternates: {
        canonical: 'https://filetools4u.com/webp-converter', // Replace with your actual URL
    },
};

// The page component now only renders the client component.
export default function WebpConverterPage() {
    return <WebpConverter />;
}
