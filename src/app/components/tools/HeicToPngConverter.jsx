'use client';

import React, { useState, useEffect } from 'react';
// Note: You will need to add the `convertHeicToPng` function to your apiService.js file
import { convertHeicToPng } from '../../../lib/apiService'; 
import FaqItem from '../shared/FaqItem'; // Assuming you have the reusable FAQ component

export default function HeicToPngConverter() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [originalImagePreview, setOriginalImagePreview] = useState(null);
    const [convertedImageUrl, setConvertedImageUrl] = useState(null);
    
    const [originalSize, setOriginalSize] = useState(0);
    const [convertedSize, setConvertedSize] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Cleanup object URLs to prevent memory leaks
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
        const fileInput = document.getElementById('heic-png-upload-input');
        if (fileInput) fileInput.value = '';
    };

    const handleFileChange = (event) => {
        setConvertedImageUrl(null);
        setConvertedSize(0);
        setError(null);
        
        const file = event.target.files[0];

        if (file) {
            const fileName = file.name.toLowerCase();
            const isHeicOrHeif = fileName.endsWith('.heic') || fileName.endsWith('.heif');

            if (!isHeicOrHeif) {
                handleReset(); 
                setError('Invalid file type. Please upload a HEIC (.heic, .heif) image.');
                event.target.value = '';
                return;
            }
            setSelectedFile(file);
            setOriginalImagePreview(null); // Browsers can't preview HEIC, so we keep this null
            setOriginalSize(file.size);
        } else {
            handleReset();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setError('Please upload a HEIC file to convert.');
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const convertedBlob = await convertHeicToPng(formData);
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
        if (!selectedFile) return 'converted.png';
        const nameWithoutExtension = selectedFile.name.split('.').slice(0, -1).join('.') || selectedFile.name;
        return `${nameWithoutExtension}.png`;
    };

    return (
        <div className="w-full min-h-screen bg-white font-sans">
            <div className="container mx-auto px-4 py-10 sm:py-10">
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <svg className="w-10 h-10 text-lime-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25" /></svg>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">HEIC to PNG Converter</h1>
                    </div>
                    <p className="text-lg text-slate-500 mb-8">Convert your iPhone HEIC photos to high-quality PNG with transparency.</p>

                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4 text-left" role="alert"><strong className="font-bold">Error: </strong><span>{error}</span></div>}
                    
                    {!isLoading && !convertedImageUrl && (
                        <form onSubmit={handleSubmit}>
                            {!selectedFile && (
                                <label htmlFor="heic-png-upload-input" className="relative block w-full border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-lime-500 hover:bg-lime-50 transition-colors">
                                    <input id="heic-png-upload-input" type="file" accept=".heic,.heif" onChange={handleFileChange} className="sr-only" />
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <span className="mt-4 block text-lg font-semibold text-slate-700">Drop a HEIC file here or <span className="text-lime-600">click to browse</span></span>
                                    <span className="mt-1 block text-sm text-slate-500">Supports .heic and .heif files</span>
                                </label>
                            )}

                            {selectedFile && (
                                <div className="mt-8 text-left">
                                    <p className="text-center mb-4">File Selected: <span className="font-semibold">{selectedFile.name}</span></p>
                                    <button type="submit" className="w-full bg-lime-500 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-lime-600 transition-colors">
                                        Convert to PNG
                                    </button>
                                </div>
                            )}
                        </form>
                    )}

                    {isLoading && <div className="my-8 max-w-2xl mx-auto"><h3 className="text-xl font-semibold text-slate-700 mb-4">Converting... Please wait.</h3><div className="w-full bg-gray-200 rounded-full h-4"><div className="bg-lime-500 h-4 rounded-full animate-pulse"></div></div></div>}
                    
                    {convertedImageUrl && !isLoading && (
                        <div className="my-8 space-y-6">
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                                <a href={convertedImageUrl} download={getDownloadFileName()} className="w-full sm:w-auto bg-lime-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-lime-600 transition-colors">Download PNG</a>
                                <button onClick={handleReset} className="w-full sm:w-auto bg-slate-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-800 transition-colors">Start Over</button>
                            </div>
                        </div>
                    )}

                     {(selectedFile || convertedImageUrl) && (
                        <div className="mt-10 border-t border-gray-200 pt-6">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-bold text-slate-800">Original (HEIC)</h3>
                                        {originalSize > 0 && <span className="text-sm font-medium text-slate-600">{formatFileSize(originalSize)}</span>}
                                    </div>
                                    <div className="h-80 flex items-center justify-center bg-slate-50 rounded-md border">
                                        <p className="text-slate-500 p-4">HEIC preview is not supported in most browsers. Ready to convert.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-bold text-slate-800">Converted (PNG)</h3>
                                        {convertedSize > 0 && <span className="text-sm font-medium text-green-600">{formatFileSize(convertedSize)}</span>}
                                    </div>
                                    <div className="h-80 flex items-center justify-center bg-slate-50 rounded-md border">
                                        {isLoading && <p className="text-slate-500">Processing...</p>}
                                        {convertedImageUrl ? 
                                            <img src={convertedImageUrl} alt="Converted PNG preview" className="max-h-full max-w-full object-contain" /> :
                                            !isLoading && <p className="text-slate-400">Your PNG will appear here</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="my-5 border-t border-gray-200"></div>
                
                <div className="mt-10 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-12">How to Convert HEIC to PNG</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-lime-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">1</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Upload HEIC File</h3><p className="text-slate-600">Select your .heic or .heif image by clicking the upload area.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-lime-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">2</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Convert to PNG</h3><p className="text-slate-600">Click the "Convert to PNG" button to start the process instantly.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-lime-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">3</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Download</h3><p className="text-slate-600">Your new, high-quality PNG file will be ready to download.</p></div>
                    </div>
                </div>

                 <div className="my-5 border-t border-gray-200"></div>
                
                <div className="mt-10 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    <FaqItem question="What is a PNG file?">
                    <p>
                        PNG (Portable Network Graphics) is a popular image format known for
                        its <strong>lossless compression</strong>. This means the image
                        retains all of its original data and quality even after being saved
                        multiple times. Unlike JPEG, which discards some image information
                        to reduce file size, PNG preserves every detail. It also supports
                        transparency, making it the preferred format for graphics, logos,
                        digital art, and images where sharp edges or backgrounds need to be
                        preserved. While PNG files are often larger in size, they are ideal
                        when quality is more important than storage efficiency.
                    </p>
                    </FaqItem>

                    <FaqItem question="What is a HEIC file?">
                    <p>
                        HEIC (High Efficiency Image Container) is a modern image format
                        developed by Apple in 2017. It is based on the HEVC (High
                        Efficiency Video Coding, or H.265) compression standard. The main
                        advantage of HEIC is that it can store <strong>high-quality
                        photos</strong> in <strong>smaller file sizes</strong> compared to
                        older formats like JPEG and PNG. HEIC can also store multiple
                        images in a single file (such as burst photos or Live Photos) along
                        with extra data like depth maps and edits. However, because HEIC is
                        relatively new, it’s not yet universally supported on all devices
                        and platforms, which is why many users convert HEIC images into
                        formats like JPEG or PNG for better compatibility.
                    </p>
                    </FaqItem>

                    <FaqItem question="Why convert HEIC to PNG instead of JPEG?">
                    <p>
                        PNG is a "lossless" format, which means it preserves the maximum
                        amount of image quality. If your original HEIC photo contains fine
                        details, text overlays, or transparency, converting to PNG is the
                        best way to ensure that information is not lost. JPEG is better for
                        smaller file sizes, but PNG is superior for preserving clarity,
                        sharp edges, and transparency features.
                    </p>
                    </FaqItem>

                    <FaqItem question="Will converting HEIC to PNG reduce image quality?">
                    <p>
                        No. PNG is a lossless format, which means your image quality will
                        remain the same after conversion. Unlike JPEG, which discards
                        certain visual data to compress the file, PNG keeps every pixel.
                        The only difference you may notice is the file size—PNG images are
                        usually larger than HEIC files. But in terms of visual quality,
                        nothing is lost.
                    </p>
                    </FaqItem>

                    <FaqItem question="Are PNG files larger than HEIC files?">
                    <p>
                        Yes, typically. HEIC is designed for efficiency, so a single HEIC
                        photo may take up half the storage space of the same photo saved as
                        PNG. PNG prioritizes quality and detail preservation, not file
                        size. That means converting to PNG is ideal if quality and
                        compatibility matter more than storage space.
                    </p>
                    </FaqItem>

                    <FaqItem question="Is my original HEIC file safe after conversion?">
                    <p>
                        Yes, the conversion process does not overwrite or delete your
                        original HEIC file. Instead, it creates a new PNG version. This way
                        you can keep your original photo in HEIC format for storage
                        efficiency while also having a PNG copy for editing, publishing, or
                        sharing across devices.
                    </p>
                    </FaqItem>

                    <FaqItem question="Can PNG images be edited after conversion?">
                    <p>
                        Definitely. PNG is one of the most versatile formats for editing.
                        It’s supported by all major photo editors (Photoshop, GIMP, Canva,
                        etc.), and because it’s lossless, you won’t lose quality when you
                        open, edit, and resave the file. This makes PNG the preferred
                        choice for designers and professionals who need flexibility.
                    </p>
                    </FaqItem>
                </div>
                </div>
            </div>
        </div>
    );
}
