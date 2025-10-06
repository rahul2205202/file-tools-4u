'use client';

import React, { useState, useEffect } from 'react';
import { convertToWebp } from '../../../lib/apiService'; 

export default function WebpConverter() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [convertedImageUrl, setConvertedImageUrl] = useState(null);
    const [quality, setQuality] = useState(75);
    
    const [originalSize, setOriginalSize] = useState(0);
    const [convertedSize, setConvertedSize] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [logMessage, setLogMessage] = useState('');

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
            if (convertedImageUrl) URL.revokeObjectURL(convertedImageUrl);
        };
    }, [imagePreview, convertedImageUrl]);
    
    const handleReset = () => {
        setSelectedFile(null);
        setImagePreview(null);
        setOriginalSize(0);
        setConvertedImageUrl(null);
        setConvertedSize(0);
        setError(null);
        setLogMessage('');
        const fileInput = document.getElementById('image-upload-input');
        if (fileInput) fileInput.value = '';
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            handleReset();
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
            setOriginalSize(file.size);
        } else {
            setError('Please select a valid image file (e.g., JPG, PNG).');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setError('Please select an image file to convert.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setConvertedImageUrl(null);
        setConvertedSize(0);
        setLogMessage('Converting to WebP...');

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('toFormat', 'webp');
        formData.append('quality', quality);

        try {
            const convertedBlob = await convertToWebp(formData);
            setConvertedImageUrl(URL.createObjectURL(convertedBlob));
            setConvertedSize(convertedBlob.size);
            setLogMessage('Conversion successful!');
        } catch (err) {
            setError(err.message || 'An unexpected error occurred during conversion.');
            setLogMessage('');
        } finally {
            setIsLoading(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    
    const getReductionPercent = () => {
        if (originalSize === 0 || convertedSize === 0) return 0;
        return Math.round(((originalSize - convertedSize) / originalSize) * 100);
    };

    return (
        <div className="w-full min-h-screen bg-white font-sans">
            <div className="container mx-auto px-4 py-10 sm:py-10">

                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <svg className="w-10 h-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" /></svg>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">WebP Converter</h1>
                    </div>
                    <p className="text-lg text-slate-500 mb-8">Convert any image to the modern, high-efficiency WebP format.</p>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4 text-left" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span>{error}</span>
                        </div>
                    )}

                    {!isLoading && !convertedImageUrl && (
                        <form onSubmit={handleSubmit}>
                            {!selectedFile && (
                                <label htmlFor="image-upload-input" className="relative block w-full border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                                    <input id="image-upload-input" type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} className="sr-only" />
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <span className="mt-4 block text-lg font-semibold text-slate-700">Drop an image here or <span className="text-orange-500">click to browse</span></span>
                                    <span className="mt-1 block text-sm text-slate-500">Supports JPG, PNG & more</span>
                                </label>
                            )}
                            
                            {selectedFile && (
                                <div className="mt-8 text-left space-y-6">
                                    <div>
                                        <label htmlFor="quality-slider" className="block text-sm font-bold text-slate-700 mb-2">WebP Quality: <span className="font-semibold text-orange-600">{quality}%</span></label>
                                        <input id="quality-slider" type="range" min="10" max="100" step="5" value={quality} onChange={(e) => setQuality(parseInt(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-orange-500" />
                                    </div>
                                    <button type="submit" className="w-full bg-orange-500 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-orange-600 transition-colors">
                                        Convert to WebP
                                    </button>
                                </div>
                            )}
                        </form>
                    )}

                    {isLoading && (
                        <div className="my-8 max-w-2xl mx-auto flex flex-col items-center justify-center space-y-4">
                             <svg className="animate-spin h-10 w-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <h3 className="text-xl font-semibold text-slate-700">{logMessage}</h3>
                        </div>
                    )}
                    
                    {convertedImageUrl && !isLoading && (
                        <div className="my-8 space-y-4">
                            <h3 className="text-2xl font-bold text-green-600">✓ WebP Image Ready!</h3>
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                                <a href={convertedImageUrl} download={`${selectedFile?.name.split('.')[0]}.webp`} className="w-full sm:w-auto bg-orange-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-orange-600 transition-colors">
                                    Download WebP
                                </a>
                                <button onClick={handleReset} className="w-full sm:w-auto bg-slate-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-800 transition-colors">
                                    Convert Another
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {(imagePreview || convertedImageUrl) && (
                        <div className="mt-10 border-t border-gray-200 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-4 bg-slate-50 rounded-md">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-bold text-slate-800 text-left">Original</h3>
                                        {originalSize > 0 && <span className="text-sm font-medium text-slate-600 bg-slate-200 px-2 py-1 rounded">{formatFileSize(originalSize)}</span>}
                                    </div>
                                    <div className="h-80 flex items-center justify-center rounded-md">
                                        {imagePreview && <img src={imagePreview} alt="Original preview" className="max-h-full max-w-full object-contain" />}
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-md">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-bold text-slate-800 text-left">Converted (WebP)</h3>
                                        {convertedSize > 0 && <span className="text-sm font-medium text-green-700 bg-green-100 px-2 py-1 rounded">{formatFileSize(convertedSize)} ({getReductionPercent()}% smaller)</span>}
                                    </div>
                                    <div className="h-80 flex items-center justify-center rounded-md">
                                        {isLoading && <p className="text-slate-500">Processing...</p>}
                                        {convertedImageUrl && !isLoading && <img src={convertedImageUrl} alt="Converted WebP preview" className="max-h-full max-w-full object-contain" />}
                                        {!isLoading && !convertedImageUrl && <p className="text-slate-400">Your WebP image will appear here</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="my-5 border-t border-gray-200"></div>
                
                <div className="mt-10 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-12">How to Convert to WebP</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">1</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Upload Image</h3><p className="text-slate-600">Select any JPG or PNG image you want to convert.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">2</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Set Quality</h3><p className="text-slate-600">Use the slider to choose the ideal compression level for your needs.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">3</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Download</h3><p className="text-slate-600">Instantly download your new, highly-optimized WebP image.</p></div>
                    </div>
                </div>

                <div className="my-5 border-t border-gray-200"></div>

                <div className="mt-10 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Why Use WebP?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-1">Superior Compression</h4>
                                <p className="text-slate-600">WebP offers significantly smaller file sizes than JPEG and PNG at the same quality, leading to faster websites.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-1">Supports Transparency</h4>
                                <p className="text-slate-600">Like PNG, WebP supports lossless transparency, but with much smaller file sizes, making it ideal for web graphics.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-1">Next-Gen Format</h4>
                                <p className="text-slate-600">Developed by Google, WebP is the modern standard for web images, supported by all major browsers.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-1">No Software Needed</h4>
                                <p className="text-slate-600">Our converter works entirely in your browser. No downloads or installations are required.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
