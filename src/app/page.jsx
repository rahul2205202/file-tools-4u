import React from 'react';
import Link from 'next/link';

// SEO metadata is now handled by this exported object
export const metadata = {
    title: 'File Tools 4U - Free Online Image & PDF Tools',
    description: 'Your one-stop destination for free online file utilities. Compress, convert, and create images and PDFs with File Tools 4U.',
    keywords: 'file tools, image tools, pdf tools, online converter, online compressor, free tools',
    alternates: {
        canonical: 'https://filetools4u.com/',
    },
};

// Helper component for tool cards
const ToolCard = ({ icon, title, description, to }) => (
    <Link href={to} className="block bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex-shrink-0 w-14 h-14 bg-black rounded-full flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </Link>
);

export default function Homepage() {
    const icons = {
        compressor: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>,
        generator: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15l-4 6h12l-4-6 2.293-2.293a1 1 0 011.414 0L19 12M5 12l2.293 2.293a1 1 0 001.414 0L11 12l-4-6H3l2 6z"></path></svg>,
        converter: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>,
        imgToPdf: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>,
    };

    return (
        <div className="w-full">
            <section className="text-center bg-white py-20 px-4 rounded-lg shadow-xl">
                <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4">
                    Your Complete File Toolkit
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                    Compress, convert, and create with our powerful suite of free online tools for your images and PDFs.
                </p>
                <Link href="/compress-pdf" className="bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105">
                    Get Started
                </Link>
            </section>

            <section className="py-16">
                <h2 className="text-3xl font-bold text-black text-center mb-10">Explore Our Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ToolCard to="/compress-image" icon={icons.compressor} title="Image Compressor" description="Optimize your images for the web without losing quality." />
                    <ToolCard to="/generate-ai-image" icon={icons.generator} title="AI Image Generator" description="Turn your text prompts into stunning, unique images." />
                    <ToolCard to="/convert-image-format" icon={icons.converter} title="Image Format Converter" description="Convert images between JPG, PNG, GIF, and more." />
                    <ToolCard to="/convert-image-to-pdf" icon={icons.imgToPdf} title="Image to PDF" description="Combine multiple images into a single PDF document." />
                </div>
            </section>
        </div>
    );
}
