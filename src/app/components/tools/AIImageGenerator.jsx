'use client';

import React, { useState, useCallback } from 'react';
import { generateAiImage } from '../../../lib/apiService';

// --- Helper Components (Styled to match the new theme) ---

const Spinner = () => (
    <svg className="animate-spin h-10 w-10 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const ImageIcon = ({ className = '' }) => (
    <svg className={`mx-auto h-12 w-12 text-gray-400 ${className}`} stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
        return `ai-${sanitizedPrompt.slice(0, 50)}.png`;
    };

    return (
        <div className="w-full min-h-screen bg-white font-sans">
            <div className="container mx-auto px-4 py-10 sm:py-10">
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    {/* Header */}
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <svg className="w-10 h-10 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.456-2.456L12.5 18l1.178-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" /></svg>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">AI Image Generator</h1>
                    </div>
                    <p className="text-lg text-slate-500 mb-8">Turn your imagination into stunning visuals with AI.</p>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4 text-left" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span>{error}</span>
                        </div>
                    )}
                    
                    {/* Generator UI */}
                    <form onSubmit={handleGenerateImage} className="w-full space-y-6">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., A majestic lion wearing a crown, cinematic fantasy art"
                            className="w-full border-2 border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 resize-none h-28 text-lg"
                            disabled={isLoading}
                            aria-label="Image generation prompt"
                        />
                         <button
                            type="submit"
                            disabled={isLoading || !prompt.trim()}
                            className="w-full bg-purple-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-purple-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? 'Generating...' : 'Generate Image'}
                        </button>
                    </form>

                    {/* Image Display Area */}
                     <div className="mt-10 border-t border-gray-200 pt-6">
                        <div className="p-4 bg-slate-50 rounded-md">
                             <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-slate-800 text-left">Generated Image</h3>
                            </div>
                            <div className="h-96 flex items-center justify-center rounded-md overflow-hidden">
                                {isLoading && <div className="text-center text-slate-500"><Spinner /><p className="mt-4 text-lg font-semibold animate-pulse">Generating your vision...</p></div>}
                                {!isLoading && !error && imageUrl && <img src={imageUrl} alt={prompt} className="w-full h-full object-contain rounded-lg animate-fade-in" key={imageUrl} />}
                                {!isLoading && !error && !imageUrl && <div className="text-center text-slate-500"><ImageIcon /><p className="mt-4 text-lg">Your generated image will appear here.</p></div>}
                           </div>
                        </div>
                    </div>

                    {imageUrl && !isLoading && (
                        <div className="my-8 space-y-4">
                            <h3 className="text-2xl font-bold text-green-600">✓ Generation Complete!</h3>
                            <a href={imageUrl} download={getDownloadFileName()} className="inline-block w-full sm:w-auto bg-purple-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-purple-700 transition-colors">
                                Download Image
                            </a>
                        </div>
                    )}

                    <div className="my-5 border-t border-gray-200"></div>

                    {/* How It Works Section */}
                    <div className="mt-10 text-center">
                        <h2 className="text-3xl font-bold text-slate-800 mb-12">How to Generate AI Images</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                            <div className="flex flex-col items-center"><div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">1</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Write a Prompt</h3><p className="text-slate-600">Describe the image you want to create. Be as detailed as you like.</p></div>
                            <div className="flex flex-col items-center"><div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">2</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Generate</h3><p className="text-slate-600">Our AI will get to work creating your unique image in seconds.</p></div>
                            <div className="flex flex-col items-center"><div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">3</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Download</h3><p className="text-slate-600">Instantly download your new, high-quality image file.</p></div>
                        </div>
                    </div>

                    <div className="my-5 border-t border-gray-200"></div>
                    
                    {/* Features Section */}
                    <div className="mt-10 max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Key Generation Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-left">
                           <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15l-4 6h12l-4-6 2.293-2.293a1 1 0 011.414 0L19 12M5 12l2.293 2.293a1 1 0 001.414 0L11 12l-4-6H3l2 6z"></path></svg>
                                </div>
                                <div><h4 className="text-lg font-semibold text-slate-800 mb-1">Powered by Advanced AI</h4><p className="text-slate-600">Utilizes a state-of-the-art model to generate stunning and creative visuals from any prompt.</p></div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <div><h4 className="text-lg font-semibold text-slate-800 mb-1">Instant Creation</h4><p className="text-slate-600">Go from idea to image in seconds. Perfect for artists, marketers, and content creators.</p></div>
                            </div>
                           <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                </div>
                                <div><h4 className="text-lg font-semibold text-slate-800 mb-1">High-Quality Output</h4><p className="text-slate-600">All images are generated as high-resolution PNG files, ready to use in any project.</p></div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l-1.414-1.414M6.05 6.05l-1.414-1.414m12.728 0l-1.414 1.414M6.05 17.95l-1.414 1.414" /></svg>
                                </div>
                                <div><h4 className="text-lg font-semibold text-slate-800 mb-1">Completely Free</h4><p className="text-slate-600">Unleash your creativity without any costs. Generate as many images as you need.</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`@keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } .animate-fade-in { animation: fade-in 0.5s ease-in-out; }`}</style>
        </div>
    );
}