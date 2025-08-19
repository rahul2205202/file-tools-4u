import React from 'react';
import Link from 'next/link';

// SEO metadata for the homepage
export const metadata = {
    title: 'File Tools 4U - Free Online Image & PDF Tools',
    description: 'Your one-stop destination for free online file utilities. Compress, convert, and create images and PDFs with our powerful, easy-to-use tools.',
    keywords: 'file tools, image tools, pdf tools, webp converter, online converter, online compressor, free tools, ai image generator',
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
            hoverBorder: 'hover:border-red-500',
        },
        purple: {
            bg: 'bg-purple-600',
            hoverBorder: 'hover:border-purple-500',
        },
        teal: {
            bg: 'bg-teal-500',
            hoverBorder: 'hover:border-teal-400',
        },
        green: {
            bg: 'bg-green-600',
            hoverBorder: 'hover:border-green-500',
        },
        orange: {
            bg: 'bg-orange-500',
            hoverBorder: 'hover:border-orange-500',
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
    // Icons for the tool cards - Updated for better relevance
    const icons = {
        compressor: <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" /></svg>,
        generator: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15l-4 6h12l-4-6 2.293-2.293a1 1 0 011.414 0L19 12M5 12l2.293 2.293a1 1 0 001.414 0L11 12l-4-6H3l2 6z"></path></svg>,
        pngToJpeg: <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-7.5a2.25 2.25 0 012.25-2.25h.75" /></svg>,
        imgToPdf: <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
        webpConverter: <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691V5.25a2.25 2.25 0 00-2.25-2.25L10.5 3z" /></svg>,
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

                {/* Tools Grid Section*/}
                <section id="tools" className="py-5 rounded-lg">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-slate-800 text-center mb-12">
                            What can we help you with?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            <ToolCard 
                                to="/image-compressor" 
                                icon={icons.compressor} 
                                title="Image Compressor" 
                                description="Reduce file sizes of JPG, PNG, and WEBP images." 
                                color="purple"
                            />
                            <ToolCard 
                                to="/generate-ai-image" 
                                icon={icons.generator} 
                                title="AI Image Generator" 
                                description="Turn your text prompts into stunning, unique images." 
                                color="teal"
                            />
                             <ToolCard 
                                to="/webp-converter" 
                                icon={icons.webpConverter} 
                                title="WebP Converter" 
                                description="Convert any image to the modern, high-efficiency WebP format." 
                                color="orange"
                            />
                            <ToolCard 
                                to="/image-to-pdf" 
                                icon={icons.imgToPdf} 
                                title="Image to PDF" 
                                description="Combine multiple images into a single PDF document." 
                                color="red"
                            />
                            <ToolCard 
                                to="/png-to-jpeg" 
                                icon={icons.pngToJpeg} 
                                title="PNG to JPEG Converter" 
                                description="Convert PNG files into the universally compatible JPEG format." 
                                color="green"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}


