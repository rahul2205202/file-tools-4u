'use client';

import React, { useState, useEffect } from 'react';
import { compressPdf } from '../../../lib/apiService'; // Using the path alias

export default function PdfCompressor() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [compressedPdfUrl, setCompressedPdfUrl] = useState(null);
    const [quality, setQuality] = useState(0.5);
    
    const [originalSize, setOriginalSize] = useState(0);
    const [compressedSize, setCompressedSize] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        return () => {
            if (compressedPdfUrl) URL.revokeObjectURL(compressedPdfUrl);
        };
    }, [compressedPdfUrl]);

    const handleReset = () => {
        setSelectedFile(null);
        setCompressedPdfUrl(null);
        setOriginalSize(0);
        setCompressedSize(0);
        setError(null);
        setIsLoading(false);
        const fileInput = document.getElementById('pdf-upload-input');
        if (fileInput) fileInput.value = '';
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            handleReset();
            setSelectedFile(file);
            setOriginalSize(file.size);
        } else {
            handleReset();
            setError('Please select a valid PDF file.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setError('Please select a PDF file first.');
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('quality', quality);

        try {
            const compressedBlob = await compressPdf(formData);
            setCompressedPdfUrl(URL.createObjectURL(compressedBlob));
            setCompressedSize(compressedBlob.size);
        } catch (err) {
            setError(err.message);
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
        <div className="w-full min-h-screen bg-white font-sans">
            <div className="container mx-auto px-4 py-10 sm:py-10">
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <svg className="w-10 h-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">PDF Compressor</h1>
                    </div>
                    <p className="text-lg text-slate-500 mb-8">Reduce the file size of your PDFs while keeping the best quality.</p>

                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4 text-left" role="alert"><strong className="font-bold">Error: </strong><span>{error}</span></div>}
                    
                    {!isLoading && !compressedPdfUrl && (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="pdf-upload-input" className="relative block w-full border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                                <input id="pdf-upload-input" type="file" accept="application/pdf" onChange={handleFileChange} className="sr-only" />
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <span className="mt-4 block text-lg font-semibold text-slate-700">Drop PDF here or <span className="text-blue-600">click to browse</span></span>
                                <span className="mt-1 block text-sm text-slate-500">Supports PDF documents</span>
                            </label>

                            {selectedFile && (
                                <div className="mt-8 text-left space-y-6">
                                    <div>
                                        <label htmlFor="quality-slider" className="block text-sm font-bold text-slate-700 mb-2">Compression Level ({Math.round(quality * 100)}%):</label>
                                        <input id="quality-slider" type="range" min="0.1" max="1.0" step="0.05" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                                        <p className="text-xs text-slate-500 mt-1">Lower quality results in a smaller file size.</p>
                                    </div>
                                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors">
                                        Compress PDF
                                    </button>
                                </div>
                            )}
                        </form>
                    )}

                    {isLoading && <div className="my-8 max-w-2xl mx-auto"><h3 className="text-xl font-semibold text-slate-700 mb-4">Compressing... Please wait.</h3><div className="w-full bg-gray-200 rounded-full h-4"><div className="bg-blue-600 h-4 rounded-full animate-pulse"></div></div></div>}
                    
                    {compressedPdfUrl && !isLoading && (
                        <div className="my-8 space-y-6">
                            <h3 className="text-2xl font-bold text-green-600">✓ Compression Complete!</h3>
                            <div className="flex justify-center items-center space-x-4 sm:space-x-8 text-slate-700">
                                <div><p className="text-sm text-slate-500">Original Size</p><p className="text-lg font-semibold">{formatFileSize(originalSize)}</p></div>
                                <div className="text-green-600"><p className="font-bold text-lg">~{getReductionPercent()}% smaller</p></div>
                                <div><p className="text-sm text-slate-500">New Size</p><p className="text-lg font-semibold">{formatFileSize(compressedSize)}</p></div>
                            </div>
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                                <a href={compressedPdfUrl} download={`compressed-${selectedFile.name}`} className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors">Download Compressed PDF</a>
                                <button onClick={handleReset} className="w-full sm:w-auto bg-slate-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-800 transition-colors">Start Over</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="my-5 border-t border-gray-200"></div>
                
                <div className="mt-10 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-12">Compress a PDF in 3 Simple Steps</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">1</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Upload PDF</h3><p className="text-slate-600">Select your PDF file by clicking the upload area or dragging and dropping.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">2</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Set Compression</h3><p className="text-slate-600">Use the slider to choose the desired image quality within your PDF.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">3</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Download</h3><p className="text-slate-600">Your smaller PDF will be ready instantly. Click to download and you're all set!</p></div>
                    </div>
                </div>

                {/* --- NEW: Features Section --- */}
                <div className="my-5 border-t border-gray-200"></div>
                <div className="mt-10 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-1">Advanced Compression</h4>
                                <p className="text-slate-600">Reduces file size by intelligently downsampling and re-compressing large images embedded in your PDF.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-1">Adjustable Quality</h4>
                                <p className="text-slate-600">You have full control over the compression level with an easy-to-use quality slider.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-1">Secure & Private</h4>
                                <p className="text-slate-600">Your files are processed securely and are immediately deleted from our servers after compression.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-1">No Software Installation</h4>
                                <p className="text-slate-600">Our compressor works entirely in your browser. No downloads or installations are required.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
