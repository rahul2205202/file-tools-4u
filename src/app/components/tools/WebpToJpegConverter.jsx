'use client';

import React, { useState, useEffect } from 'react';
import { convertWebpToJpeg } from '../../../lib/apiService'; 

export default function WebpToJpegConverter() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [originalImagePreview, setOriginalImagePreview] = useState(null);
    const [convertedImageUrl, setConvertedImageUrl] = useState(null);
    
    const [originalSize, setOriginalSize] = useState(0);
    const [convertedSize, setConvertedSize] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
        const fileInput = document.getElementById('webp-jpeg-upload-input');
        if (fileInput) fileInput.value = '';
    };

    const handleFileChange = (event) => {
        setConvertedImageUrl(null);
        setConvertedSize(0);
        setError(null);
        
        const file = event.target.files[0];

        if (file) {
            if (file.type !== 'image/webp') {
                handleReset(); 
                setError('Invalid file type. Please upload a WebP (.webp) image.');
                event.target.value = '';
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
            setError('Please upload a WebP file to convert.');
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const convertedBlob = await convertWebpToJpeg(formData);
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
        if (!selectedFile) return 'converted.jpeg';
        const nameWithoutExtension = selectedFile.name.split('.').slice(0, -1).join('.') || selectedFile.name;
        return `${nameWithoutExtension}.jpeg`;
    };

    return (
        <div className="w-full min-h-screen bg-white font-sans">
            <div className="container mx-auto px-4 py-10 sm:py-10">
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <svg className="w-10 h-10 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691V5.25a2.25 2.25 0 00-2.25-2.25L10.5 3z" /></svg>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">WebP to JPEG Converter</h1>
                    </div>
                    <p className="text-lg text-slate-500 mb-8">Convert your WebP images to the universally supported JPEG format.</p>

                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4 text-left" role="alert"><strong className="font-bold">Error: </strong><span>{error}</span></div>}
                    
                    {!isLoading && !convertedImageUrl && (
                        <form onSubmit={handleSubmit}>
                            {!selectedFile && (
                                <label htmlFor="webp-jpeg-upload-input" className="relative block w-full border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-rose-500 hover:bg-rose-50 transition-colors">
                                    <input id="webp-jpeg-upload-input" type="file" accept="image/webp" onChange={handleFileChange} className="sr-only" />
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <span className="mt-4 block text-lg font-semibold text-slate-700">Drop a WebP file here or <span className="text-rose-600">click to browse</span></span>
                                    <span className="mt-1 block text-sm text-slate-500">Supports .webp files</span>
                                </label>
                            )}

                            {selectedFile && (
                                <div className="mt-8 text-left">
                                    <button type="submit" className="w-full bg-rose-500 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-rose-600 transition-colors">
                                        Convert to JPEG
                                    </button>
                                </div>
                            )}
                        </form>
                    )}

                    {isLoading && <div className="my-8 max-w-2xl mx-auto"><h3 className="text-xl font-semibold text-slate-700 mb-4">Converting... Please wait.</h3><div className="w-full bg-gray-200 rounded-full h-4"><div className="bg-rose-500 h-4 rounded-full animate-pulse"></div></div></div>}
                    
                    {convertedImageUrl && !isLoading && (
                        <div className="my-8 space-y-6">
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                                <a href={convertedImageUrl} download={getDownloadFileName()} className="w-full sm:w-auto bg-rose-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-rose-600 transition-colors">Download JPEG</a>
                                <button onClick={handleReset} className="w-full sm:w-auto bg-slate-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-800 transition-colors">Start Over</button>
                            </div>
                        </div>
                    )}

                    {(originalImagePreview || convertedImageUrl) && (
                        <div className="mt-10 border-t border-gray-200 pt-6">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-bold text-slate-800">Original (WebP)</h3>
                                        {originalSize > 0 && <span className="text-sm font-medium text-slate-600">{formatFileSize(originalSize)}</span>}
                                    </div>
                                    <div className="h-80 flex items-center justify-center bg-slate-50 rounded-md border">
                                        <img src={originalImagePreview} alt="Original WebP preview" className="max-h-full max-w-full object-contain" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-bold text-slate-800">Converted (JPEG)</h3>
                                        {convertedSize > 0 && <span className="text-sm font-medium text-green-600">{formatFileSize(convertedSize)}</span>}
                                    </div>
                                    <div className="h-80 flex items-center justify-center bg-slate-50 rounded-md border">
                                        {isLoading && <p className="text-slate-500">Processing...</p>}
                                        {convertedImageUrl ? 
                                            <img src={convertedImageUrl} alt="Converted JPEG preview" className="max-h-full max-w-full object-contain" /> :
                                            !isLoading && <p className="text-slate-400">Your JPEG will appear here</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="my-5 border-t border-gray-200"></div>
                
                <div className="mt-10 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-12">How to Convert WebP to JPEG</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-rose-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">1</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Upload WebP File</h3><p className="text-slate-600">Select your .webp image by clicking the upload area.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-rose-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">2</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Convert to JPEG</h3><p className="text-slate-600">Click the "Convert to JPEG" button to start the process instantly.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-rose-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">3</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Download</h3><p className="text-slate-600">Your new, universally compatible JPEG file will be ready to download.</p></div>
                    </div>
                </div>

                <div className="my-5 border-t border-gray-200"></div>
                
                <div className="mt-10 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Why Convert from WebP to JPEG?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25-2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-7.5a2.25 2.25 0 012.25-2.25h.75" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">Maximum Compatibility</h3>
                                <p className="text-slate-600">While WebP is modern, JPEG is universally supported by virtually all software, devices, and platforms, making it a safe choice for sharing.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">Standard for Photos</h3>
                                <p className="text-slate-600">JPEG remains the industry standard for digital photographs and is the preferred format for many printing services and photo applications.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
