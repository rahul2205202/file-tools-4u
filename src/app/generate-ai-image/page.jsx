import React from 'react';
import AIImageGenerator from '../components/tools/AIImageGenerator';

export const metadata = {
    title: 'Free AI Image Generator - Create Art from Text | File Tools 4U',
    description: 'Generate unique, high-quality images from text prompts for free with the AI Image Generator from File Tools 4U. Turn your imagination into stunning visuals instantly.',
    keywords: 'ai image generator, text to image, ai art generator, free ai generator, create ai images',
    alternates: {
        canonical: 'https://filetools4u.com/generate-ai-image',
    },
};

export default function AIImageGeneratorPage() {
    return <AIImageGenerator />;
}
