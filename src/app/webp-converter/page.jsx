import React from 'react';
import WebpConverter from '../components/tools/WebpConverter'; 

export const metadata = {
    title: 'Free WebP Converter | Convert JPG & PNG to WebP Online',
    description: 'Convert your JPG and PNG images to the modern, high-efficiency WebP format for free. Reduce file size and improve website speed with our online tool.',
    keywords: 'webp converter, convert to webp, jpg to webp, png to webp, image converter, free tool',
    alternates: {
        canonical: 'https://filetools4u.com/webp-converter',
    },
};

export default function WebpConverterPage() {
    return <WebpConverter />;
}
