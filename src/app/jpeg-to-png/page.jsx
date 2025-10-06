import React from 'react';
import JpegToPngConverter from '../components/tools/JepgToPngConverter';

export const metadata = {
    title: 'Free Image Converter - Convert JPG, PNG, GIF | File Tools 4U',
    description: 'Easily convert images to and from JPG, PNG, GIF, and BMP formats for free with File Tools 4U. Instant online image format conversion.',
    keywords: 'image converter, convert image, jpg to png, png to jpg, gif converter, bmp converter',
    alternates: {
        canonical: 'https://filetools4u.com/jpeg-to-png',
    },
};

export default function ImageConverterPage() {
    return <JpegToPngConverter />;
}
