import React from 'react';
import Link from 'next/link';

// SEO metadata for the homepage
export const metadata = {
    title: 'File Tools 4U - Free Online Image & PDF Tools',
    description: 'Your one-stop destination for free online file utilities. Compress, convert, and create images and PDFs with our powerful, easy-to-use tools.',
    keywords: 'file tools, image tools, pdf tools, online converter, online compressor, free tools, ai image generator',
    alternates: {
        canonical: 'https://filetools4u.com/', // Replace with your actual domain
    },
};

// --- Helper Component for Tool Cards ---
// This component is now styled to accept a color theme.
const ToolCard = ({ icon, title, description, to, color = 'red' }) => {
    // Define color themes to easily switch between styles
    const colorThemes = {
        red: {
            bg: 'bg-red-600',
            text: 'text-red-600',
            hoverBorder: 'hover:border-red-500',
        },
        purple: {
            bg: 'bg-purple-600',
            text: 'text-purple-600',
            hoverBorder: 'hover:border-purple-500',
        },
        teal: {
            bg: 'bg-teal-500',
            text: 'text-teal-500',
            hoverBorder: 'hover:border-teal-400',
        },
        green: {
            bg: 'bg-green-600',
            text: 'text-green-600',
            hoverBorder: 'hover:border-green-500',
        },
    };

    const theme = colorThemes[color] || colorThemes.red;

    return (
        <Link href={to} className={`block bg-white p-6 rounded-lg shadow-md border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${theme.hoverBorder}`}>
            <div className={`flex-shrink-0 w-14 h-14 ${theme.bg} rounded-full flex items-center justify-center mb-4`}>
                {icon}
            </div>
            <h3 className={`text-xl font-bold text-slate-800 mb-2`}>{title}</h3>
            <p className="text-slate-600">{description}</p>
        </Link>
    );
};


// --- Main Homepage Component ---
export default function Homepage() {
    // Icons for the tool cards
    const icons = {
        compressor: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" /></svg>,
        generator: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15l-4 6h12l-4-6 2.293-2.293a1 1 0 011.414 0L19 12M5 12l2.293 2.293a1 1 0 001.414 0L11 12l-4-6H3l2 6z"></path></svg>,
        pngToJpeg: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>,
        imgToPdf: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>,
    };

    return (
        <div className="w-full bg-white font-sans">
            <div className="container mx-auto px-4 py-10 sm:py-16">
                
                {/* Hero Section */}
                <section className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-4">
                        Your Complete File Toolkit
                    </h1>
                    <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-8">
                        Compress, convert, and create with our powerful suite of free online tools for your images and PDFs. No software, no sign-ups.
                    </p>
                    <Link href="#tools" className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors duration-300 inline-block">
                        Explore Tools
                    </Link>
                </section>
                <div className="my-5 border-t border-gray-200"></div>

                {/* Tools Grid Section */}
                <section id="tools" className="py-5 rounded-lg">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-slate-800 text-center mb-12">
                            What can we help you with?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                            <ToolCard 
                                to="/compress-image" 
                                icon={icons.compressor} 
                                title="Image Compressor" 
                                description="Reduce file sizes of JPG, PNG, and WEBP images with adjustable quality." 
                                color="purple"
                            />
                            <ToolCard 
                                to="/generate-ai-image" 
                                icon={icons.generator} 
                                title="AI Image Generator" 
                                description="Turn your text prompts into stunning, unique images with artificial intelligence." 
                                color="teal"
                            />
                            <ToolCard 
                                to="/convert-image-to-pdf" 
                                icon={icons.imgToPdf} 
                                title="Image to PDF" 
                                description="Combine multiple JPG or PNG images into a single, professional PDF document." 
                                color="red"
                            />
                            <ToolCard 
                                to="/png-to-jpeg" 
                                icon={icons.pngToJpeg} 
                                title="PNG to JPEG Converter" 
                                description="Convert transparent PNG files into the universally compatible JPEG format." 
                                color="green"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
