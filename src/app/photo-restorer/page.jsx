import React from 'react';
import PhotoRestorer from '../components/tools/PhotoRestorer';

export const metadata = {
    title: 'AI Photo Restorer & Upscaler | Restore Your Old Photos For Free | File Tools 4U',
    description: 'Bring your old, blurry, or scratched family photos back to life. Our AI tool intelligently removes damage, enhances faces, and upscales resolution for free.',
    keywords: 'ai photo restorer, restore old photos, photo enhancement, fix blurry photos, scratch removal, image upscaler',
    alternates: {
        canonical: 'https://filetools4u.com/photo-restorer',
    },
};

export default function PhotoRestorerPage() {
    return <PhotoRestorer />;
}
