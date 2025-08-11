'use client';

import React, { useState, useEffect } from 'react';

// Make sure this path is correct for your project structure
import { convertPngToJpeg } from '../../../lib/apiService';

export default function PngToJpegConverter() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [convertedImageUrl, setConvertedImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [logMessage, setLogMessage] = useState('');

    useEffect(() => {
        // Cleanup object URLs to prevent memory leaks
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
            if (convertedImageUrl) URL.revokeObjectURL(convertedImageUrl);
        };
    }, [imagePreview, convertedImageUrl]);

    // Resets the component to its initial state
    const handleReset = () => {
        setSelectedFile(null);
        setImagePreview(null);
        setConvertedImageUrl(null);
        setError(null);
        setLogMessage('');
        const fileInput = document.getElementById('image-upload-input');
        if (fileInput) fileInput.value = '';
    };

    // Handles file selection from the input
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type !== 'image/png') {
                setError('Invalid file type. Please upload a PNG (.png) image.');
                return;
            }
            handleReset(); // Reset previous state on new file selection
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Handles the form submission and API call
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setError('Please select a PNG file to convert.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setConvertedImageUrl(null);
        setLogMessage('Converting to JPEG...');

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('toFormat', 'jpeg'); // Hardcoded to 'jpeg'

        try {
            // This function is imported from your apiService file
            const imageBlob = await convertPngToJpeg(formData); 
            setLogMessage('Conversion successful!');
            setConvertedImageUrl(URL.createObjectURL(imageBlob));
        } catch (err) {
            setError(err.message || 'An unexpected error occurred during conversion.');
            setLogMessage('');
        } finally {
            setIsLoading(false);
        }
    };

    // Generates a sanitized filename for the download
    const getDownloadFileName = () => {
        if (!selectedFile) return `converted_image.jpeg`;
        const nameWithoutExtension = selectedFile.name.split('.').slice(0, -1).join('.') || 'download';
        return `${nameWithoutExtension}.jpeg`;
    };

    return (
        <div className="w-full min-h-screen bg-white font-sans">
            <div className="container mx-auto px-4 py-10 sm:py-10">

                {/* Main Converter Component */}
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    <div className="flex justify-center items-center gap-3 mb-2">
                         <svg className="w-10 h-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">PNG to JPEG Converter</h1>
                    </div>
                    <p className="text-lg text-slate-500 mb-8">Convert your transparent PNG images into standard JPEG format.</p>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4 text-left" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span>{error}</span>
                        </div>
                    )}

                    {!isLoading && !convertedImageUrl && (
                        <form onSubmit={handleSubmit}>
                            {!selectedFile && (
                                <label htmlFor="image-upload-input" className="relative block w-full border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors">
                                    <input id="image-upload-input" type="file" accept="image/png" onChange={handleFileChange} className="sr-only" />
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <span className="mt-4 block text-lg font-semibold text-slate-700">Drop a PNG here or <span className="text-green-600">click to browse</span></span>
                                    <span className="mt-1 block text-sm text-slate-500">Supports .PNG files</span>
                                </label>
                            )}
                            
                            {selectedFile && (
                                <div className="mt-8 text-left">
                                    <button type="submit" className="w-full bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors disabled:bg-slate-400">
                                        Convert to JPEG
                                    </button>
                                </div>
                            )}
                        </form>
                    )}

                    {isLoading && (
                        <div className="my-8 max-w-2xl mx-auto flex flex-col items-center justify-center space-y-4">
                             <svg className="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <h3 className="text-xl font-semibold text-slate-700">{logMessage}</h3>
                        </div>
                    )}
                    
                    {convertedImageUrl && !isLoading && (
                        <div className="my-8 space-y-4">
                            <h3 className="text-2xl font-bold text-green-600">✓ Your JPEG is Ready!</h3>
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                                <a href={convertedImageUrl} download={getDownloadFileName()} className="w-full sm:w-auto bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors">
                                    Download JPEG
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
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 text-left">Original (PNG)</h3>
                                    <div className="h-80 flex items-center justify-center rounded-md">
                                        {imagePreview ? <img src={imagePreview} alt="Original PNG preview" className="max-h-full max-w-full object-contain" /> : <p className="text-gray-400">...</p>}
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-md">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 text-left">Converted (JPEG)</h3>
                                    <div className="h-80 flex items-center justify-center rounded-md">
                                        {isLoading && <p className="text-slate-500">Processing...</p>}
                                        {convertedImageUrl && !isLoading && <img src={convertedImageUrl} alt="Converted JPEG preview" className="max-h-full max-w-full object-contain" />}
                                        {!isLoading && !convertedImageUrl && <p className="text-slate-400">Your JPEG will appear here</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="my-5 border-t border-gray-200"></div>
                
                {/* How it Works Section */}
                <div className="mt-10 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-12">How to Convert PNG to JPEG</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">1</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Upload PNG</h3><p className="text-slate-600">Click the upload area to select a PNG image from your computer.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">2</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Convert</h3><p className="text-slate-600">Click the "Convert to JPEG" button to start the process instantly.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">3</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Download JPEG</h3><p className="text-slate-600">Your new JPEG file will be ready for download immediately.</p></div>
                    </div>
                </div>

                <div className="my-5 border-t border-gray-200"></div>

                {/* Features Section */}
                <div className="mt-10 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Why Convert PNG to JPEG?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5-13.5h16.5" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-1">Smaller File Size</h4>
                                <p className="text-slate-600">JPEG images are generally smaller than PNGs, making them faster to load on websites and easier to share.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-1">Great for Photos</h4>
                                <p className="text-slate-600">JPEG is the standard format for digital photography, offering an excellent balance of quality and file size.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-1">Secure & Private</h4>
                                <p className="text-slate-600">All uploaded files are automatically and permanently deleted from our servers after one hour.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
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
