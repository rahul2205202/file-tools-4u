'use client';

import React, { useState, useEffect } from 'react';
import { compressImage } from '../../../lib/apiService'; 

export default function ImageCompressor() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [compressedImageUrl, setCompressedImageUrl] = useState(null);
    const [quality, setQuality] = useState(80);
    
    const [originalSize, setOriginalSize] = useState(0);
    const [compressedSize, setCompressedSize] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [logMessage, setLogMessage] = useState('');

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
            if (compressedImageUrl) URL.revokeObjectURL(compressedImageUrl);
        };
    }, [imagePreview, compressedImageUrl]);
    
    const handleReset = () => {
        setSelectedFile(null);
        setImagePreview(null);
        setOriginalSize(0);
        setCompressedImageUrl(null);
        setCompressedSize(0);
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
            setError('Please select a valid image file (e.g., JPG, PNG, WEBP).');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setError('Please select an image file to compress.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setCompressedImageUrl(null);
        setCompressedSize(0);
        setLogMessage('Compressing image...');

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('quality', quality / 100); 

        try {
            const compressedBlob = await compressImage(formData);
            setCompressedImageUrl(URL.createObjectURL(compressedBlob));
            setCompressedSize(compressedBlob.size);
            setLogMessage('Compression successful!');
        } catch (err) {
            setError(err.message || 'An unexpected error occurred during compression.');
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
        if (originalSize === 0 || compressedSize === 0) return 0;
        return Math.round(((originalSize - compressedSize) / originalSize) * 100);
    };

    return (
        <div className="w-full max-w-3xl min-h-screen bg-background font-sans">
            <div className="container mx-auto px-4 py-10 sm:py-10">
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <svg className="w-10 h-10 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" /></svg>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">Image Compressor</h1>
                    </div>
                    <p className="text-lg text-slate-500 mb-8">Reduce image file sizes with the perfect quality balance.</p>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4 text-left" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span>{error}</span>
                        </div>
                    )}

                    {!isLoading && !compressedImageUrl && (
                        <form onSubmit={handleSubmit}>
                            {!selectedFile && (
                                <label htmlFor="image-upload-input" className="relative block w-full border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors">
                                    <input id="image-upload-input" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <span className="mt-4 block text-lg font-semibold text-slate-700">Drop an image here or <span className="text-purple-600">click to browse</span></span>
                                    <span className="mt-1 block text-sm text-slate-500">Supports JPG, PNG, WEBP & more</span>
                                </label>
                            )}
                            
                            {selectedFile && (
                                <div className="mt-8 text-left space-y-6">
                                    <div>
                                        <label htmlFor="quality-slider" className="block text-sm font-bold text-slate-700 mb-2">Compression Quality: <span className="font-semibold text-purple-600">{quality}%</span></label>
                                        <input id="quality-slider" type="range" min="10" max="100" step="5" value={quality} onChange={(e) => setQuality(parseInt(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-purple-600" />
                                    </div>
                                    <button type="submit" className="w-full bg-purple-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-purple-700 transition-colors">
                                        Compress Image
                                    </button>
                                </div>
                            )}
                        </form>
                    )}

                    {isLoading && (
                        <div className="my-8 max-w-2xl mx-auto flex flex-col items-center justify-center space-y-4">
                             <svg className="animate-spin h-10 w-10 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <h3 className="text-xl font-semibold text-slate-700">{logMessage}</h3>
                        </div>
                    )}
                    
                    {compressedImageUrl && !isLoading && (
                        <div className="my-8 space-y-4">
                            <h3 className="text-2xl font-bold text-green-600">✓ Image Compressed!</h3>
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                                <a href={compressedImageUrl} download={`compressed-${selectedFile?.name}`} className="w-full sm:w-auto bg-purple-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-purple-700 transition-colors">
                                    Download Image
                                </a>
                                <button onClick={handleReset} className="w-full sm:w-auto bg-slate-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-800 transition-colors">
                                    Compress Another
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {(imagePreview || compressedImageUrl) && (
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
                                        <h3 className="text-lg font-bold text-slate-800 text-left">Compressed</h3>
                                        {compressedSize > 0 && <span className="text-sm font-medium text-green-700 bg-green-100 px-2 py-1 rounded">{formatFileSize(compressedSize)} ({getReductionPercent()}% smaller)</span>}
                                    </div>
                                    <div className="h-80 flex items-center justify-center rounded-md">
                                        {isLoading && <p className="text-slate-500">Processing...</p>}
                                        {compressedImageUrl && !isLoading && <img src={compressedImageUrl} alt="Compressed preview" className="max-h-full max-w-full object-contain" />}
                                        {!isLoading && !compressedImageUrl && <p className="text-slate-400">Your compressed image will appear here</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="my-5 border-t border-gray-200"></div>
                
                <div className="mt-10 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-12">How to Compress an Image</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">1</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Upload Image</h3><p className="text-slate-600">Select the image file you want to make smaller.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">2</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Set Quality</h3><p className="text-slate-600">Use the slider to find the best balance of quality and file size.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">3</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Download</h3><p className="text-slate-600">Instantly download your new, optimized image file.</p></div>
                    </div>
                </div>

                <div className="my-5 border-t border-gray-200"></div>

                <div className="mt-10 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Key Compression Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l-1.414-1.414M6.05 6.05l-1.414-1.414m12.728 0l-1.414 1.414M6.05 17.95l-1.414 1.414" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-1">Adjustable Quality</h4>
                                <p className="text-slate-600">You have full control over the compression level with an easy-to-use quality slider for perfect results.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-1">Fast & Efficient</h4>
                                <p className="text-slate-600">Our tool uses smart compression to significantly reduce file size while maintaining high visual quality.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-1">Secure & Private</h4>
                                <p className="text-slate-600">All uploaded files are automatically and permanently deleted from our servers after one hour.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-1">No Software Installation</h4>
                                <p className="text-slate-600">Our converter works entirely in your browser. No downloads or installations are required.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
