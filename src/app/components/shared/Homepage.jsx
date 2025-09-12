import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import figurineImage from '../../components/images/ai-figurine.png';

// --- Helper Component for Tool Cards ---
// Refined styling for a cleaner, more professional look
const ToolCard = ({ icon, title, description, to, color = 'red' }) => {
    const colorThemes = {
        red: { bg: 'bg-red-600', hoverBorder: 'hover:border-red-500' },
        blue: { bg: 'bg-blue-600', hoverBorder: 'hover:border-blue-500' },
        purple: { bg: 'bg-purple-600', hoverBorder: 'hover:border-purple-500' },
        teal: { bg: 'bg-teal-500', hoverBorder: 'hover:border-teal-400' },
        green: { bg: 'bg-green-600', hoverBorder: 'hover:border-green-500' },
        orange: { bg: 'bg-orange-500', hoverBorder: 'hover:border-orange-500' },
        yellow: { bg: 'bg-yellow-500', hoverBorder: 'hover:border-yellow-400' },
    };
    const theme = colorThemes[color] || colorThemes.red;

    return (
        <Link href={to} className={`block bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${theme.hoverBorder}`}>
            <div className={`flex-shrink-0 w-14 h-14 ${theme.bg} rounded-full flex items-center justify-center mb-5`}>
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
        pdfCompressor: <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" /></svg>,
        imgCompressor: <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
        generator: <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15l-4 6h12l-4-6 2.293-2.293a1 1 0 011.414 0L19 12M5 12l2.293 2.293a1 1 0 001.414 0L11 12l-4-6H3l2 6z" /></svg>,
        restorer: <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" /></svg>,
        converter: <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25" /></svg>,
        imgToPdf: <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
        pdfToImg: <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
        mergePdf: <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>,
    };

    return (
        <div className="w-full bg-white font-sans">
            {/* Hero Section */}
            <section className="text-center py-20 sm:py-24 bg-white relative">
                <div className="absolute inset-0 bg-slate-50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-6 tracking-tight">
                        Your Complete File Toolkit
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                        Compress, convert, and create with our powerful suite of free online tools for your images and PDFs. Fast, secure, and easy to use.
                    </p>
                    <Link href="#tools" className="bg-red-600 text-white font-bold py-4 px-10 rounded-lg hover:bg-red-700 transition-transform duration-300 transform hover:scale-105 inline-block shadow-lg">
                        Explore All Tools
                    </Link>
                </div>
            </section>

            <section className="py-10 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-slate-200">
                        <Link 
                            href="/ai-figurine-creator" 
                            className="grid md:grid-cols-2 items-stretch group"
                        >
                        {/* Left Section: Full Image with Trending text above */}
                        <div className="relative h-64 md:h-auto">
                        {/* Image filling the entire section */}
                        <Image 
                            src={figurineImage} 
                            alt="Nano Banana Figurine" 
                            fill 
                            className="object-cover" 
                            priority
                        />
                        {/* Trending Text - Positioned Top */}
                        <div className="absolute top-4 left-4">
                            <span className="bg-white text-orange-700 font-bold text-sm px-4 py-1 rounded-full">
                            🔥 Trending Now
                            </span>
                        </div>
                        </div>

                        {/* Right Info Section */}
                        <div className="p-8 md:p-12 bg-white flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-slate-800 mb-3">
                            Nano Banana AI Figurine Creator
                        </h2>
                        <p className="text-slate-600 text-lg mb-6">
                            Turn any photo into a hyper-realistic, collectible 3D figurine. 
                            Be part of the viral trend everyone is talking about!
                        </p>
                        <span className="inline-block text-orange-600 font-semibold group-hover:underline">
                            Try the Viral Tool →
                        </span>
                        </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Tools Section */}
            <section id="tools" className="py-10 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-slate-800 text-center mb-12">
                        What can we help you with?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        <ToolCard to="/pdf-compressor" icon={icons.pdfCompressor} title="PDF Compressor" description="Reduce the file size of your PDF documents quickly." color="blue" />
                        <ToolCard to="/image-compressor" icon={icons.imgCompressor} title="Image Compressor" description="Optimize your images for the web without losing quality." color="purple" />
                        <ToolCard to="/generate-ai-image" icon={icons.generator} title="AI Image Generator" description="Turn your text prompts into stunning, unique images." color="teal" />
                        <ToolCard to="/photo-restorer" icon={icons.restorer} title="AI Photo Restorer" description="Restore old, blurry, or damaged photos with AI." color="yellow" />
                    </div>
                </div>
            </section>

            {/* Redesigned Features Section */}
            <section className="bg-white py-10">
                <div className="max-w-6xl mx-auto text-center px-4">
                    <h2 className="text-4xl font-bold text-slate-800 mb-6">Why Choose File Tools 4U?</h2>
                    <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
                        We believe powerful file utilities should be simple, private, and accessible to everyone.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-xl shadow-md text-left">
                             <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-7 h-7 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-slate-800">Blazing Fast</h3>
                            <p className="text-slate-600">Our tools process your files in seconds, running directly in your browser or on our optimized servers.</p>
                        </div>
                         {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-md text-left">
                            <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-7 h-7 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-slate-800">Privacy First</h3>
                            <p className="text-slate-600">We respect your privacy. Your files are never stored and are automatically deleted after processing.</p>
                        </div>
                         {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-md text-left">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                 <svg className="w-7 h-7 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-slate-800">Completely Free</h3>
                            <p className="text-slate-600">All our tools are 100% free to use. No hidden costs, no sign-ups, and no limits.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

