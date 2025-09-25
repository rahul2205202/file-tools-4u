'use client';

import React, { useState, useEffect, useRef } from 'react';
import { convertPngToWebp } from '../../../lib/apiService'; 

export default function PngToWebpConverter() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [originalImagePreview, setOriginalImagePreview] = useState(null);
    const [convertedImageUrl, setConvertedImageUrl] = useState(null);
    
    const [originalSize, setOriginalSize] = useState(0);
    const [convertedSize, setConvertedSize] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fileInputRef = useRef(null);

    // ✅ Cleanup object URLs properly
    useEffect(() => {
        return () => {
            if (originalImagePreview) URL.revokeObjectURL(originalImagePreview);
            if (convertedImageUrl) URL.revokeObjectURL(convertedImageUrl);
        };
    }, [originalImagePreview, convertedImageUrl]);

    const handleReset = () => {
        setSelectedFile(null);
        setOriginalImagePreview(null);
        setConvertedImageUrl(null);
        setOriginalSize(0);
        setConvertedSize(0);
        setError(null);
        setIsLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleFileChange = (event) => {
        setConvertedImageUrl(null);
        setConvertedSize(0);
        setError(null);

        const file = event.target.files[0];

        if (file) {
            if (file.type !== 'image/png') {
                handleReset();
                setError('Invalid file type. Please upload a PNG (.png) image.');
                return;
            }
            setSelectedFile(file);
            setOriginalImagePreview(URL.createObjectURL(file));
            setOriginalSize(file.size);
        } else {
            handleReset();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setError('Please upload a PNG file to convert.');
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const convertedBlob = await convertPngToWebp(formData); // should return Blob
            setConvertedImageUrl(URL.createObjectURL(convertedBlob));
            setConvertedSize(convertedBlob.size);
        } catch (err) {
            setError(err.message || 'An unexpected error occurred during conversion.');
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

    const getDownloadFileName = () => {
        if (!selectedFile) return 'converted.webp';
        const nameWithoutExtension = selectedFile.name.split('.').slice(0, -1).join('.') || selectedFile.name;
        return `${nameWithoutExtension}.webp`;
    };

    return (
        <div className="w-full min-h-screen bg-white font-sans">
            <div className="container mx-auto px-4 py-10 sm:py-10">
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    
                    {/* Header */}
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <svg className="w-10 h-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691V5.25a2.25 2.25 0 00-2.25-2.25L10.5 3z" /></svg>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">PNG to WebP Converter</h1>
                    </div>
                    <p className="text-lg text-slate-500 mb-8">Convert your PNG images to the modern, high-efficiency WebP format.</p>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4 text-left" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span>{error}</span>
                        </div>
                    )}
                    
                    {/* Upload & Convert */}
                    {!isLoading && !convertedImageUrl && (
                        <form onSubmit={handleSubmit}>
                            {!selectedFile && (
                                <label htmlFor="png-upload-input" className="relative block w-full border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                                    <input
                                        id="png-upload-input"
                                        type="file"
                                        accept="image/png"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="sr-only"
                                    />
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="mt-4 block text-lg font-semibold text-slate-700">Drop a PNG file here or <span className="text-indigo-600">click to browse</span></span>
                                    <span className="mt-1 block text-sm text-slate-500">Supports .png files</span>
                                </label>
                            )}

                            {selectedFile && (
                                <div className="mt-8 text-left">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full font-bold py-4 px-8 rounded-lg text-lg transition-colors ${
                                            isLoading ? 'bg-indigo-400 text-white cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        }`}
                                    >
                                        {isLoading ? 'Converting...' : 'Convert to WebP'}
                                    </button>
                                </div>
                            )}
                        </form>
                    )}

                    {/* Loading */}
                    {isLoading && (
                        <div className="my-8 max-w-2xl mx-auto">
                            <h3 className="text-xl font-semibold text-slate-700 mb-4">Converting... Please wait.</h3>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div className="bg-indigo-600 h-4 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    )}
                    
                    {/* Download */}
                    {convertedImageUrl && !isLoading && (
                        <div className="my-8 space-y-6">
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                                <a href={convertedImageUrl} download={getDownloadFileName()} className="w-full sm:w-auto bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors">Download WebP</a>
                                <button onClick={handleReset} className="w-full sm:w-auto bg-slate-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-800 transition-colors">Start Over</button>
                            </div>
                        </div>
                    )}

                    {/* Preview Section */}
                    {(originalImagePreview || convertedImageUrl) && (
                        <div className="mt-10 border-t border-gray-200 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Original */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-bold text-slate-800">Original (PNG)</h3>
                                        {originalSize > 0 && <span className="text-sm font-medium text-slate-600">{formatFileSize(originalSize)}</span>}
                                    </div>
                                    <div className="h-80 flex items-center justify-center bg-slate-50 rounded-md border">
                                        <img src={originalImagePreview} alt="Original PNG preview" className="max-h-full max-w-full object-contain" />
                                    </div>
                                </div>

                                {/* Converted */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-bold text-slate-800">Converted (WebP)</h3>
                                        {convertedSize > 0 && <span className="text-sm font-medium text-green-600">{formatFileSize(convertedSize)}</span>}
                                    </div>
                                    <div className="h-80 flex items-center justify-center bg-slate-50 rounded-md border">
                                        {isLoading && <p className="text-slate-500">Processing...</p>}
                                        {convertedImageUrl ? 
                                            <img src={convertedImageUrl} alt="Converted WebP preview" className="max-h-full max-w-full object-contain" /> :
                                            !isLoading && <p className="text-slate-400">Your WebP will appear here</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="my-5 border-t border-gray-200"></div>
                
                <div className="mt-10 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-12">How to Convert PNG to WebP</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">1</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Upload PNG File</h3><p className="text-slate-600">Select your .png image by clicking the upload area or by dragging and dropping.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">2</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Convert Instantly</h3><p className="text-slate-600">Click the "Convert to WebP" button to start the high-speed conversion process.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">3</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Download WebP</h3><p className="text-slate-600">Your new, optimized WebP image will be ready to download immediately.</p></div>
                    </div>
                </div>

                <div className="my-5 border-t border-gray-200"></div>
                
                <div className="mt-10 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Why Convert to WebP?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">Superior Compression</h3>
                                <p className="text-slate-600">WebP offers significantly smaller file sizes than PNG for the same quality, leading to faster website load times.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">Preserves Transparency</h3>
                                <p className="text-slate-600">Just like PNG, WebP fully supports transparency, making it a perfect modern replacement for web graphics with clear backgrounds.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">Great for SEO</h3>
                                <p className="text-slate-600">Google recommends using next-gen formats like WebP to improve page speed, a key factor in search engine ranking.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">Instant & Secure</h3>
                                <p className="text-slate-600">Our efficient, browser-based tool converts your files in seconds. No software or sign-up required.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
