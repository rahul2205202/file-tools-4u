import React from 'react';
import PngToJpegConverter from '../components/tools/PngToJpegConverter'; // Adjust the import path based on your file structure

// SEO metadata for the PNG to JPEG converter page
export const metadata = {
    title: 'Free PNG to JPEG Converter | Convert PNG to JPG Online',
    description: 'Easily convert your PNG images to high-quality JPEG format for free. Our online tool is fast, secure, and requires no software installation.',
    keywords: 'png to jpeg, png to jpg, convert png to jpeg, image converter, free converter, online tool',
    alternates: {
        canonical: 'https://filetools4u.com/png-to-jpeg', // Replace with your actual URL
    },
};

// The page component that renders the converter tool
export default function PngToJpegConverterPage() {
    // This page component simply renders the client component,
    // keeping the page itself as a clean server component.
    return <PngToJpegConverter />;
}
