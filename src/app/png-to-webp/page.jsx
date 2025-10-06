import React from 'react';
import PngToWebpConverter from '../components/tools/PngToWebpConverter';

export const metadata = {
    title: 'Convert PNG to WebP Free | Online PNG to WebP Converter | File Tools 4U',
    description: 'Easily convert your PNG images to the modern, high-efficiency WebP format for free. Our online tool preserves transparency and quality, making your website faster.',
    keywords: 'png to webp, convert png to webp, png to webp converter, free image converter, webp optimization, png webp converter, png to webp converter online free',
    
    alternates: {
        canonical: 'https://filetools4u.com/png-to-webp',
    },
};

export default function PngToWebpPage() {
    return <PngToWebpConverter />;
}
