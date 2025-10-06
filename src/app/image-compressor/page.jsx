import React from 'react';
import ImageCompressor from '../components/tools/ImageCompressor';

export const metadata = {
    title: 'Free Image Compressor - Reduce JPG/PNG Size | File Tools 4U',
    description: 'Compress JPG, PNG, and other images online for free with File Tools 4U. Reduce file size with an adjustable quality slider and instant previews.',
    keywords: 'image compressor, compress jpg, compress png, reduce image size, image optimizer, photo compressor',
    alternates: {
        canonical: 'https://filetools4u.com/image-compressor',
    },
};

export default function ImageCompressorPage() {
    return <ImageCompressor />;
}
