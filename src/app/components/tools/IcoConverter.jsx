'use client';

import React, { useState, useEffect } from 'react';
import { convertImageToIco } from '../../../lib/apiService'; 
import FaqItem from '../shared/FaqItem';

export default function IcoConverter() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [originalImagePreview, setOriginalImagePreview] = useState(null);
    const [convertedIconUrl, setConvertedIconUrl] = useState(null);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        return () => {
            if (originalImagePreview) URL.revokeObjectURL(originalImagePreview);
            if (convertedIconUrl) URL.revokeObjectURL(convertedIconUrl);
        };
    }, [originalImagePreview, convertedIconUrl]);

    const handleReset = () => {
        setSelectedFile(null);
        setOriginalImagePreview(null);
        setConvertedIconUrl(null);
        setError(null);
        setIsLoading(false);
        const fileInput = document.getElementById('ico-upload-input');
        if (fileInput) fileInput.value = '';
    };

    const handleFileChange = (event) => {
        setConvertedIconUrl(null);
        setError(null);
        
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setOriginalImagePreview(URL.createObjectURL(file));
        } else {
            handleReset();
            if(file) setError('Please select a valid image file (e.g., PNG, JPG).');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setError('Please upload an image file to convert.');
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const convertedBlob = await convertImageToIco(formData);
            setConvertedIconUrl(URL.createObjectURL(convertedBlob));
        } catch (err) {
            setError(err.message || 'Something went wrong during conversion. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl min-h-screen bg-background font-sans">
            <div className="container mx-auto bg-background">
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <svg className="w-10 h-10 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" /></svg>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">Image to ICO Converter</h1>
                    </div>
                    <p className="text-lg text-slate-500 mb-8">Create a .ico favicon for your website from any image.</p>

                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4 text-left" role="alert"><strong className="font-bold">Error: </strong><span>{error}</span></div>}
                    
                    {!isLoading && !convertedIconUrl && (
                        <form onSubmit={handleSubmit}>
                            {!selectedFile && (
                                <label htmlFor="ico-upload-input" className="relative block w-full border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-slate-500 hover:bg-slate-50 transition-colors">
                                    <input id="ico-upload-input" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <span className="mt-4 block text-lg font-semibold text-slate-700">Drop an image here or <span className="text-slate-600">click to browse</span></span>
                                    <span className="mt-1 block text-sm text-slate-500">Supports PNG, JPG, WebP, etc.</span>
                                </label>
                            )}

                            {selectedFile && (
                                <div className="mt-8 text-left">
                                    <div className="h-40 flex items-center justify-center bg-slate-50 rounded-md border mb-4">
                                        <img src={originalImagePreview} alt="Original preview" className="max-h-full max-w-full object-contain" />
                                    </div>
                                    <button type="submit" className="w-full bg-slate-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-slate-700 transition-colors">
                                        Convert to ICO
                                    </button>
                                </div>
                            )}
                        </form>
                    )}

                    {isLoading && <div className="my-8 max-w-2xl mx-auto"><h3 className="text-xl font-semibold text-slate-700 mb-4">Creating your icon...</h3><div className="w-full bg-gray-200 rounded-full h-4"><div className="bg-slate-500 h-4 rounded-full animate-pulse"></div></div></div>}
                    
                    {convertedIconUrl && !isLoading && (
                        <div className="my-8 space-y-6">
                             <div className="flex justify-center items-center">
                                <img src={convertedIconUrl} alt="Generated ICO preview" className="w-16 h-16 border p-1" />
                            </div>
                            <h3 className="text-2xl font-bold text-green-600">✓ Your Favicon is Ready!</h3>
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                                <a href={convertedIconUrl} download="favicon.ico" className="w-full sm:w-auto bg-slate-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-700 transition-colors">Download favicon.ico</a>
                                <button onClick={handleReset} className="w-full sm:w-auto bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-800 transition-colors">Start Over</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="my-5"></div>
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-12">How to Create a Favicon?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-slate-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">1</span></div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Upload Image</h3>
                            <p className="text-slate-600">Select any image (PNG, JPG) that you want to use as your website's icon.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-slate-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">2</span></div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Convert to ICO</h3>
                            <p className="text-slate-600">Our tool will automatically resize and convert your image into the correct ICO format.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-slate-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">3</span></div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Download & Use</h3>
                            <p className="text-slate-600">Download your `favicon.ico` file and add it to your website's root directory.</p>
                        </div>
                    </div>
                </div>
                <div className="my-5"></div>
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10">
                    <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <FaqItem question="What is an ICO file?">
                           <p>An ICO (.ico) file is a special image format used for website icons, commonly known as "favicons." These are the small icons you see in your browser tabs. An ICO file can contain multiple sizes of the same image, allowing the browser to pick the best one for the context.</p>
                        </FaqItem>
                         <FaqItem question="What is the best size for a favicon?">
                            <p>Modern browsers can use a variety of sizes. A good ICO file should contain multiple sizes, such as 16x16, 32x32, and 48x48 pixels. Our tool automatically generates a multi-size ICO file from your image to ensure maximum compatibility.</p>
                        </FaqItem>
                         <FaqItem question="Does my original image need to be square?">
                            <p>No. Our tool will automatically resize your image to fit within a square canvas, adding a transparent background if necessary. For the best results, it's recommended to upload a square-shaped image.</p>
                        </FaqItem>
                        <FaqItem question="Will my transparent background be preserved?">
                            <p>Yes. If you upload an image with a transparent background (like a PNG), our tool will preserve that transparency in the final .ico file. This is ideal for modern browser tabs and themes.</p>
                        </FaqItem>
                         <FaqItem question="How do I add the favicon to my website?">
                            <p>It's simple! For most modern websites (including Next.js), you just need to place the downloaded `favicon.ico` file in the root of your public folder (usually `public/` or `app/`). The browser will automatically detect and use it. No code is required.</p>
                        </FaqItem>
                    </div>
                </div>
            </div>
        </div>
    );
}
