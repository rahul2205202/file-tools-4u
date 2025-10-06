'use client';

import React, { useState, useEffect } from 'react';
import { restorePhoto } from '../../../lib/apiService';

export default function PhotoRestorer() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [originalImagePreview, setOriginalImagePreview] = useState(null);
    const [restoredImageUrl, setRestoredImageUrl] = useState(null);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        return () => {
            if (originalImagePreview) URL.revokeObjectURL(originalImagePreview);
            if (restoredImageUrl) URL.revokeObjectURL(restoredImageUrl);
        };
    }, [originalImagePreview, restoredImageUrl]);

    const handleReset = () => {
        setSelectedFile(null);
        setOriginalImagePreview(null);
        setRestoredImageUrl(null);
        setError(null);
        setIsLoading(false);
        const fileInput = document.getElementById('photo-upload-input');
        if (fileInput) fileInput.value = '';
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            handleReset();
            setSelectedFile(file);
            setOriginalImagePreview(URL.createObjectURL(file));
        } else {
            handleReset();
            setError('Please select a valid image file.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setError('Please upload a photo to restore.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setRestoredImageUrl(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const restoredBlob = await restorePhoto(formData);
            setRestoredImageUrl(URL.createObjectURL(restoredBlob));
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-white font-sans">
            <div className="container mx-auto px-4 py-10 sm:py-10">
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <svg className="w-10 h-10 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.25 21.75l-.648-1.178a3.375 3.375 0 00-2.312-2.312L12 17.25l1.178-.648a3.375 3.375 0 002.312-2.312L16.25 13.5l.648 1.178a3.375 3.375 0 002.312 2.312L20.25 18l-1.178.648a3.375 3.375 0 00-2.312 2.312z" /></svg>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">AI Photo Restorer</h1>
                    </div>
                    <p className="text-lg text-slate-500 mb-8">Bring your old, damaged photos back to life with a single click.</p>

                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4 text-left" role="alert"><strong className="font-bold">Error: </strong><span>{error}</span></div>}
                    
                    {!selectedFile && (
                         <label htmlFor="photo-upload-input" className="relative block w-full border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-colors">
                            <input id="photo-upload-input" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <span className="mt-4 block text-lg font-semibold text-slate-700">Drop an old photo here or <span className="text-amber-600">click to browse</span></span>
                            <span className="mt-1 block text-sm text-slate-500">Supports JPG, PNG, WEBP etc.</span>
                        </label>
                    )}

                    {isLoading && <div className="my-8 max-w-2xl mx-auto"><h3 className="text-xl font-semibold text-slate-700 mb-4">Restoring your photo... This may take a moment.</h3><div className="w-full bg-gray-200 rounded-full h-4"><div className="bg-amber-500 h-4 rounded-full animate-pulse"></div></div></div>}

                    {selectedFile && !isLoading && (
                        <div className="mt-8">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">Before</h3>
                                    <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border">
                                        <img src={originalImagePreview} alt="Original" className="max-h-full max-w-full object-contain" />
                                    </div>
                                </div>
                                <div>
                                     <h3 className="text-xl font-bold text-slate-800 mb-2">After</h3>
                                    <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border">
                                        {restoredImageUrl ? (
                                            <img src={restoredImageUrl} alt="Restored" className="max-h-full max-w-full object-contain" />
                                        ) : (
                                            <p className="text-slate-500 px-4">Your restored photo will appear here.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                {!restoredImageUrl ? (
                                    <button onClick={handleSubmit} className="w-full sm:w-auto bg-amber-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-600 transition-colors">
                                        Restore Photo
                                    </button>
                                ) : (
                                     <a href={restoredImageUrl} download={`restored-${selectedFile.name}`} className="w-full sm:w-auto bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors">
                                        Download Restored Photo
                                    </a>
                                )}
                                <button onClick={handleReset} className="w-full sm:w-auto bg-slate-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-800 transition-colors">
                                    Start Over
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="my-5 border-t border-gray-200"></div>

                <div className="mt-10 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-12">Restore Memories in 3 Steps</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">1</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Upload Photo</h3><p className="text-slate-600">Select an old, blurry, or scratched photo you want to bring back to life.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">2</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">AI Restoration</h3><p className="text-slate-600">Click "Restore Photo" and our AI will intelligently fix damage and enhance details.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">3</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Download</h3><p className="text-slate-600">Your restored memory is ready! Download the high-quality image to save and share.</p></div>
                    </div>
                </div>

                <div className="my-5 border-t border-gray-200"></div>

                <div className="mt-10 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="flex items-start space-x-4"><div className="flex-shrink-0 w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg></div><div><h3 className="text-lg font-semibold text-slate-800 mb-1">Scratch & Blemish Removal</h3><p className="text-slate-600">Our AI intelligently identifies and removes scratches, dust, and tears from your photos.</p></div></div>
                        <div className="flex items-start space-x-4"><div className="flex-shrink-0 w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg></div><div><h3 className="text-lg font-semibold text-slate-800 mb-1">Face Enhancement</h3><p className="text-slate-600">AI clarifies and enhances facial details, bringing out the features of your loved ones.</p></div></div>
                        <div className="flex items-start space-x-4"><div className="flex-shrink-0 w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.375a6.375 6.375 0 006.375-6.375V9.75A6.375 6.375 0 0012 3.375a6.375 6.375 0 00-6.375 6.375V12a6.375 6.375 0 006.375 6.375z" /></svg></div><div><h3 className="text-lg font-semibold text-slate-800 mb-1">Color Correction</h3><p className="text-slate-600">Automatically corrects faded colors, restoring the original vibrancy of your photographs.</p></div></div>
                        <div className="flex items-start space-x-4"><div className="flex-shrink-0 w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9M20.25 20.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg></div><div><h3 className="text-lg font-semibold text-slate-800 mb-1">Resolution Upscaling</h3><p className="text-slate-600">Increases the resolution of your photos, making them sharper and suitable for printing.</p></div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
