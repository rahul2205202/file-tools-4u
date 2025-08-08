import React from 'react';
import ImageConverter from '../components/tools/ImageConverter'; // 1. Import the tool component

// 2. SEO metadata is defined in the page file
export const metadata = {
    title: 'Free Image Converter - Convert JPG, PNG, GIF | File Tools 4U',
    description: 'Easily convert images to and from JPG, PNG, GIF, and BMP formats for free with File Tools 4U. Instant online image format conversion.',
    keywords: 'image converter, convert image, jpg to png, png to jpg, gif converter, bmp converter',
    alternates: {
        canonical: 'https://filetools4u.com/image-converter',
    },
};

// 3. The page component renders the tool
export default function ImageConverterPage() {
    return <ImageConverter />;
}
