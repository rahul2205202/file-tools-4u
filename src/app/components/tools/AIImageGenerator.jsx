'use client';

import React, { useState, useCallback } from 'react';
import { generateAiImage } from '@/lib/apiService'; // Using the path alias

// --- Helper Components (Styled for the light theme) ---

const Spinner = ({ size = 'md' }) => {
    const sizeClasses = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
    return <div className={`animate-spin rounded-full border-t-2 border-b-2 border-black ${sizeClasses[size]}`}></div>;
};

const ImageIcon = ({ className = '' }) => (
    <svg className={`w-24 h-24 text-gray-400 ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

// --- Main Component ---

export default function AIImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerateImage = useCallback(async (e) => {
        e.preventDefault();
        if (!prompt.trim()) {
            setError('Please enter a prompt to generate an image.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setImageUrl(null);

        try {
            const generatedImageUrl = await generateAiImage(prompt);
            setImageUrl(generatedImageUrl);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Failed to generate image: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [prompt]);

    const getDownloadFileName = () => {
        if (!prompt) return 'ai-generated-image.png';
        const sanitizedPrompt = prompt.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
        return `${sanitizedPrompt.slice(0, 50)}.png`;
    };

    return (
        <div className="w-full max-w-4xl">
            <div className="bg-white rounded-lg shadow-xl p-8">
                <header className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-black">AI Image Generator</h2>
                    <p className="mt-2 text-gray-500">Turn your imagination into stunning visuals with AI.</p>
                </header>

                <main className="w-full">
                    <form onSubmit={handleGenerateImage} className="flex flex-col sm:flex-row gap-4 mb-8">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., A majestic lion wearing a crown, cinematic fantasy art"
                            className="flex-grow bg-white border border-black rounded-lg p-4 focus:ring-2 focus:ring-black focus:outline-none transition-shadow duration-200 resize-none h-24 sm:h-auto"
                            disabled={isLoading}
                            aria-label="Image generation prompt"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !prompt.trim()}
                            className="bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
                        >
                            {isLoading ? <Spinner size="sm" /> : 'Generate'}
                        </button>
                    </form>

                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4" role="alert"><strong className="font-bold">Error: </strong><span className="block sm:inline">{error}</span></div>}

                    <div className="w-full bg-gray-50 border border-gray-200 rounded-xl shadow-inner overflow-hidden aspect-square flex items-center justify-center p-4" aria-live="polite">
                        {isLoading && <div className="text-center text-gray-500"><Spinner size="lg" /><p className="mt-4 text-lg animate-pulse">Generating your vision...</p></div>}
                        {!isLoading && !error && imageUrl && <img src={imageUrl} alt={prompt} className="w-full h-full object-contain rounded-lg animate-fade-in" key={imageUrl} />}
                        {!isLoading && !error && !imageUrl && <div className="text-center text-gray-500"><ImageIcon className="mx-auto" /><p className="mt-4 text-lg">Your generated image will appear here.</p></div>}
                    </div>

                    {imageUrl && !isLoading && (
                        <div className="mt-6 text-center">
                            <a href={imageUrl} download={getDownloadFileName()} className="inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105">
                                Download Image
                            </a>
                        </div>
                    )}
                </main>
                <style>{`@keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } .animate-fade-in { animation: fade-in 0.5s ease-in-out; }`}</style>
            </div>

            <div className="mt-12 bg-white rounded-lg shadow-xl p-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-black mb-10">How to Generate AI Images</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4"><span className="text-white font-bold text-2xl">1</span></div><h3 className="text-xl font-semibold text-black mb-2">Write a Prompt</h3><p className="text-gray-600 px-4">Describe the image you want to create in the text box. Be as detailed as you like.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4"><span className="text-white font-bold text-2xl">2</span></div><h3 className="text-xl font-semibold text-black mb-2">Generate</h3><p className="text-gray-600 px-4">Click the "Generate" button and our AI will get to work creating your unique image.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4"><span className="text-white font-bold text-2xl">3</span></div><h3 className="text-xl font-semibold text-black mb-2">Download</h3><p className="text-gray-600 px-4">Once your image appears, you can download it as a high-quality PNG file.</p></div>
                    </div>
                </div>
                <div className="my-12 border-t border-gray-200"></div>
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-black mb-10">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto text-left">
                        <div className="flex items-start space-x-4"><div className="flex-shrink-0 w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15l-4 6h12l-4-6 2.293-2.293a1 1 0 011.414 0L19 12M5 12l2.293 2.293a1 1 0 001.414 0L11 12l-4-6H3l2 6z"></path></svg></div><div><h4 className="text-lg font-semibold text-black mb-1">Powered by Advanced AI</h4><p className="text-gray-600">Utilizes a state-of-the-art text-to-image model to generate stunning and creative visuals from any prompt.</p></div></div>
                        <div className="flex items-start space-x-4"><div className="flex-shrink-0 w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div><div><h4 className="text-lg font-semibold text-black mb-1">Instant Creation</h4><p className="text-gray-600">Go from idea to image in seconds. Perfect for artists, marketers, and content creators.</p></div></div>
                        <div className="flex items-start space-x-4"><div className="flex-shrink-0 w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg></div><div><h4 className="text-lg font-semibold text-black mb-1">High-Quality Output</h4><p className="text-gray-600">All images are generated as high-resolution PNG files, ready for you to use in any project.</p></div></div>
                        <div className="flex items-start space-x-4"><div className="flex-shrink-0 w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l5.5-5.5a1 1 0 011.414 0l5.5 5.5A12.02 12.02 0 0012 21.944a11.955 11.955 0 018.618-3.04m-3.04-7.016a1 1 0 011.414 0l2.12 2.12a1 1 0 010 1.414l-2.12 2.12a1 1 0 01-1.414 0l-2.12-2.12a1 1 0 010-1.414l2.12-2.12z"></path></svg></div><div><h4 className="text-lg font-semibold text-black mb-1">Completely Free</h4><p className="text-gray-600">Unleash your creativity without any costs or subscriptions. Generate as many images as you need.</p></div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
