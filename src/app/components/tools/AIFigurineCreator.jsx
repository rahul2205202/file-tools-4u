'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createFigurineFromImage } from '../../../lib/apiService'; 

export default function AIFigurineCreator() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [originalImagePreview, setOriginalImagePreview] = useState(null);
    const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const [logMessage, setLogMessage] = useState('');

    useEffect(() => {
        let timer;
        if (isLoading && progress < 95) {
            timer = setTimeout(() => {
                setProgress(prev => {
                    if (prev < 20) {
                        setLogMessage('Uploading your image...');
                        return prev + 5;
                    }
                    if (prev < 60) {
                        setLogMessage('Analyzing composition for 3D form...');
                        return prev + 2;
                    }
                    if (prev < 90) {
                        setLogMessage('Rendering figurine and packaging...');
                        return prev + 1;
                    }
                    setLogMessage('Finalizing product shot...');
                    return prev;
                });
            }, 500);
        }
        return () => clearTimeout(timer);
    }, [isLoading, progress]);


    const handleReset = () => {
        setSelectedFile(null);
        setOriginalImagePreview(null);
        setGeneratedImageUrl(null);
        setError(null);
        setIsLoading(false);
        setProgress(0);
        setLogMessage('');
        const fileInput = document.getElementById('art-upload-input');
        if (fileInput) fileInput.value = '';
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            handleReset();
            setSelectedFile(file);
            setOriginalImagePreview(URL.createObjectURL(file));
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', file);
            
            try {
                const generatedBlob = await createFigurineFromImage(formData);
                setProgress(100);
                setLogMessage('Generation complete!');
                setGeneratedImageUrl(URL.createObjectURL(generatedBlob));
            } catch (err) {
                setError(err.message || 'An unexpected error occurred during figurine creation.');
                setLogMessage('');
            } finally {
                setIsLoading(false);
            }
        } else {
            handleReset();
            setError('Please select a valid image file.');
        }
    };
    
    return (
        <div className="w-full max-w-3xl min-h-screen bg-background font-sans">
            <div className="container mx-auto bg-background">
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <svg className="w-10 h-10 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75v-2.25M12 21.75l-2.25-1.313M12 21.75l2.25-1.313M3 10.5v-2.25m2.25-1.313l-2.25-1.313m15 0l2.25-1.313m-2.25 1.313l2.25 1.313m0 0v2.25m-2.25 1.313l2.25 1.313m0 0l-2.25 1.313m-2.25-1.313l-2.25-1.313m-2.25 0l-2.25 1.313m2.25 1.313v2.25m-2.25-1.313l-2.25 1.313m9-3l-2.25 1.313m2.25-1.313l2.25 1.313M12 15l-2.25 1.313M12 15l2.25 1.313" /></svg>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">Nano Banana 3D Figurine Creator</h1>
                    </div>
                    <p className="text-lg text-slate-500 mb-8">Upload any photo and let our AI turn it into a collectible 3D figurine.</p>

                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4 text-left" role="alert"><strong className="font-bold">Error: </strong><span>{error}</span></div>}
                    
                    {!selectedFile && (
                        <label htmlFor="art-upload-input" className="relative block w-full border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-yellow-500 hover:bg-yellow-50 transition-colors">
                            <input id="art-upload-input" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <span className="mt-4 block text-lg font-semibold text-slate-700">Drop a photo here or <span className="text-yellow-600">click to browse</span></span>
                            <span className="mt-1 block text-sm text-slate-500">Upload any character, person, or pet!</span>
                        </label>
                    )}

                    {isLoading && (
                        <div className="my-8 max-w-2xl mx-auto">
                            <h3 className="text-xl font-semibold text-slate-700 mb-4">{logMessage}</h3>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div className="bg-yellow-500 h-4 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    )}
                    
                    {(generatedImageUrl || originalImagePreview) && !isLoading && (
                         <div className="my-8 space-y-6">
                            {generatedImageUrl && <h3 className="text-2xl font-bold text-green-600">✓ Your Figurine is Ready!</h3>}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-2">Original Photo</h3>
                                    <div className="h-96 flex items-center justify-center bg-slate-50 rounded-md border">
                                        <img src={originalImagePreview} alt="Original" className="max-h-full max-w-full object-contain" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-2">AI Generated Figurine</h3>
                                    <div className="h-96 flex items-center justify-center bg-slate-50 rounded-md border">
                                        {generatedImageUrl ?
                                            <img src={generatedImageUrl} alt="Generated AI figurine" className="max-h-full max-w-full object-contain" /> :
                                            <p className="text-slate-500 p-4">Your AI-generated figurine will appear here once you upload a photo.</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            {generatedImageUrl && (
                                <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-6'>
                                    <a href={generatedImageUrl} download="ai-figurine.png" className="w-full sm:w-auto bg-yellow-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-yellow-600 transition-colors">Download Figurine</a>
                                    <button onClick={handleReset} className="w-full sm:w-auto bg-slate-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-800 transition-colors">Start Over</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                <div className="my-5"></div>
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-12">How It Works</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">1</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Upload Your Photo</h3><p className="text-slate-600">Select any photo with a clear subject. The tool will start working automatically.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">2</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Download Your Figurine</h3><p className="text-slate-600">Your unique, AI-generated product shot will be ready to download and share in seconds.</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

