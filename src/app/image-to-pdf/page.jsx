import React from 'react';
import ImageToPdfConverter from '../components/tools/ImageToPdfConverter';

export const metadata = {
    title: 'Convert Images to PDF Free | Combine JPG, PNG to PDF | File Tools 4U',
    description: 'Combine multiple JPG, PNG, and other images into a single, high-quality PDF document for free with File Tools 4U. Each image is placed on a separate page.',
    keywords: 'image to pdf, jpg to pdf, png to pdf, combine images to pdf, image to pdf converter',
    alternates: {
        canonical: 'https://filetools4u.com/image-to-pdf',
    },
};

export default function ImageToPdfPage() {
    return <ImageToPdfConverter />;
}
