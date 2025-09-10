import React from 'react';
import Homepage from './components/shared/Homepage'; // Import the main component

// SEO metadata for the homepage
export const metadata = {
    title: 'File Tools 4U - Free Online Image & PDF Tools',
    description: 'Your one-stop destination for free online file utilities. Compress, convert, and create images and PDFs with our powerful, easy-to-use tools.',
    keywords: 'file tools, image tools, pdf tools, webp converter, online converter, online compressor, free tools, ai image generator',
    alternates: {
        canonical: 'https://filetools4u.com/',
    },
};

// The page component itself is very simple
export default function HomePage() {
    return <Homepage />;
}
