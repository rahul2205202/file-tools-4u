import React from 'react';
import AIArtCreator from '../components/tools/AIFigurineCreater'; // Import the main component

// SEO metadata for the AI Figurine Creator page
export const metadata = {
    title: 'Nano Banana AI Figurine Creator | Turn Photos into 3D Collectibles | File Tools 4U',
    description: 'Instantly transform any photo of a person, character, or pet into a hyper-realistic, collectible 3D figurine with our free "Nano Banana" AI tool.',
    keywords: 'ai figurine creator, nano banana, photo to figurine, custom figurine, 3d model from photo, gemini image generator, ai art creator',
    
    // Core SEO
    alternates: {
        canonical: 'https://filetools4u.com/ai-figurine-creator',
    },
};

// The page component itself is very simple
export default function AIFigurineCreatorPage() {
    // The component name is AIArtCreator, but we're framing it as the Figurine Creator page
    return <AIArtCreator />;
}

