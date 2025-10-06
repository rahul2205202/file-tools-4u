import React from 'react';
import PngToJpegConverter from '../components/tools/PngToJpegConverter';

export const metadata = {
    title: 'Free PNG to JPEG Converter | Convert PNG to JPG Online',
    description: 'Easily convert your PNG images to high-quality JPEG format for free. Our online tool is fast, secure, and requires no software installation.',
    keywords: 'png to jpeg, png to jpg, convert png to jpeg, image converter, free converter, online tool',
    alternates: {
        canonical: 'https://filetools4u.com/png-to-jpeg',
    },
};

export default function PngToJpegConverterPage() {
    return <PngToJpegConverter />;
}
