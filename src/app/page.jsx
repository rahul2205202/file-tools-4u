import React from 'react';
import Homepage from './components/shared/Homepage';

export const metadata = {
    title: 'File Tools 4U - Free Online Image & PDF Tools',
    description: 'Your one-stop destination for free online file utilities. Compress, convert, and create images and PDFs with our powerful, easy-to-use tools.',
    keywords: 'file tools, image tools, pdf tools, webp converter, online converter, online compressor, free tools, ai image generator',
    alternates: {
        canonical: 'https://filetools4u.com/',
    },
};

export default function HomePage() {
    return <Homepage />;
}
