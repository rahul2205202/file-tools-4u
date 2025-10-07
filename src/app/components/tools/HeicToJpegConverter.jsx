'use client';

import React, { useState, useEffect } from 'react';
// Note: You will need to add the `convertHeicToJpeg` function to your apiService.js file
import { convertHeicToJpeg } from '../../../lib/apiService'; 
import FaqItem from '../shared/FaqItem';

export default function HeicToJpegConverter() {
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
        const fileInput = document.getElementById('heic-upload-input');
        if (fileInput) fileInput.value = '';
    };

    // --- CORRECTED LOGIC ---
    // The validation now checks the file extension, which is more reliable for HEIC/HEIF.
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
            // Note: Browsers cannot preview HEIC files directly, so we show a placeholder.
            // The file is still selected and ready for conversion.
            setOriginalImagePreview(null); 
            setOriginalSize(file.size);
        } else {
            handleReset();
        }
    };
    // --- END OF CORRECTION ---

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
            const convertedBlob = await convertHeicToJpeg(formData);
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
        <div className="w-full max-w-3xl min-h-screen bg-background font-sans">
            <div className="container mx-auto px-4 py-10 sm:py-10">
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <svg className="w-10 h-10 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25" /></svg>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">HEIC to JPEG Converter</h1>
                    </div>
                    <p className="text-lg text-slate-500 mb-8">Convert your iPhone HEIC photos to the universally compatible JPEG format.</p>

                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4 text-left" role="alert"><strong className="font-bold">Error: </strong><span>{error}</span></div>}
                    
                    {!isLoading && !convertedImageUrl && (
                        <form onSubmit={handleSubmit}>
                            {!selectedFile && (
                                <label htmlFor="heic-upload-input" className="relative block w-full border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 transition-colors">
                                    <input id="heic-upload-input" type="file" accept=".heic,.heif" onChange={handleFileChange} className="sr-only" />
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <span className="mt-4 block text-lg font-semibold text-slate-700">Drop a HEIC file here or <span className="text-cyan-600">click to browse</span></span>
                                    <span className="mt-1 block text-sm text-slate-500">Supports .heic and .heif files</span>
                                </label>
                            )}

                            {selectedFile && (
                                <div className="mt-8 text-left">
                                    <p className="text-center mb-4">File Selected: <span className="font-semibold">{selectedFile.name}</span></p>
                                    <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-cyan-600 transition-colors">
                                        Convert to JPEG
                                    </button>
                                </div>
                            )}
                        </form>
                    )}

                    {isLoading && <div className="my-8 max-w-2xl mx-auto"><h3 className="text-xl font-semibold text-slate-700 mb-4">Converting... Please wait.</h3><div className="w-full bg-gray-200 rounded-full h-4"><div className="bg-cyan-500 h-4 rounded-full animate-pulse"></div></div></div>}
                    
                    {convertedImageUrl && !isLoading && (
                        <div className="my-8 space-y-6">
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                                <a href={convertedImageUrl} download={getDownloadFileName()} className="w-full sm:w-auto bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-cyan-600 transition-colors">Download JPEG</a>
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
                                        <p className="text-slate-500 p-4">HEIC preview is not supported in this browser. Ready to convert.</p>
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
                    <h2 className="text-3xl font-bold text-slate-800 mb-12">How to Convert HEIC to JPEG</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-cyan-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">1</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Upload HEIC File</h3><p className="text-slate-600">Select your .heic or .heif image by clicking the upload area.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-cyan-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">2</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Convert to JPEG</h3><p className="text-slate-600">Click the "Convert to JPEG" button to start the process instantly.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-cyan-500 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">3</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Download</h3><p className="text-slate-600">Your new, universally compatible JPEG file will be ready to download.</p></div>
                    </div>
                </div>

                <div className="my-5 border-t border-gray-200"></div>
                
                <div className="mt-10 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Why Convert from HEIC to JPEG?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25-2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-7.5a2.25 2.25 0 012.25-2.25h.75" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">Maximum Compatibility</h3>
                                <p className="text-slate-600">HEIC is a modern format, but JPEG is universally supported by all devices, software, and websites, ensuring you can share your photos anywhere.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">Standard for Photos</h3>
                                <p className="text-slate-600">JPEG remains the industry standard for digital photographs and is the preferred format for many printing services and photo applications.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-5 border-t border-gray-200"></div>

                <div className="mt-10 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    <FaqItem question="What is a HEIC file?">
                    <p>
                        HEIC (High Efficiency Image Container) is an advanced image format
                        introduced by Apple in 2017 alongside iOS 11. It is based on the
                        High Efficiency Video Coding (HEVC or H.265) standard, which allows
                        images to be compressed more efficiently than traditional formats.
                        This means you can store high-resolution photos with less storage
                        space usage. A single HEIC file can even store multiple images,
                        such as bursts or live photos, along with metadata like edits,
                        depth maps, and transparency. This makes it much more flexible
                        than older formats like JPEG.
                    </p>
                    </FaqItem>

                    <FaqItem question="What is a JPEG file?">
                    <p>
                        JPEG (Joint Photographic Experts Group) is the most widely adopted
                        image format worldwide. It has been in use since the early 1990s
                        and remains the default choice for digital photography and web
                        publishing. JPEG images use lossy compression, which reduces file
                        size by discarding some image data, often without a noticeable loss
                        in quality. Because of its universal support across devices,
                        software, and web browsers, JPEG is considered the most reliable
                        option for sharing and distributing images. Almost every platform
                        can open JPEG files instantly without requiring special codecs or
                        additional apps.
                    </p>
                    </FaqItem>

                    <FaqItem question="Why do I need to convert HEIC to JPEG?">
                    <p>
                        Although HEIC is technically superior in terms of compression and
                        quality, its adoption outside the Apple ecosystem has been slow.
                        Many Windows PCs, older Android phones, online applications, and
                        even some social media platforms cannot read HEIC images directly.
                        This creates issues when sharing your photos with others or
                        uploading them online. By converting HEIC to JPEG, you eliminate
                        compatibility barriers. JPEG images are universally supported,
                        ensuring your photos can be opened, edited, and shared easily on
                        almost any platform. In short, converting to JPEG gives you peace
                        of mind that your images will work everywhere.
                    </p>
                    </FaqItem>

                    <FaqItem question="Will I lose quality when converting?">
                    <p>
                        Both HEIC and JPEG are compressed formats, meaning they sacrifice
                        some image information to save space. However, during the
                        conversion process, our tool maintains a high-quality output
                        (usually around 90% quality setting). At this level, the difference
                        between your original HEIC and the converted JPEG is nearly
                        impossible to detect without magnifying the image and analyzing it
                        pixel by pixel. For day-to-day use such as printing, online
                        sharing, or storage, the quality loss is negligible. We focus on
                        preserving fine details, color accuracy, and sharpness so your
                        photos look as close to the original as possible.
                    </p>
                    </FaqItem>

                    <FaqItem question="Is converting HEIC to JPEG safe for my photos?">
                    <p>
                        Yes, the conversion process is completely safe. The tool only
                        creates a new JPEG version of your image; your original HEIC file
                        remains untouched and unaltered. This means you will always have
                        your original file if you want to keep it for future use. Our tool
                        also does not add watermarks or reduce resolution unless you
                        specifically choose to compress the file further. In fact, many
                        users prefer to store both versions—HEIC for personal use to save
                        space, and JPEG for sharing across different platforms.
                    </p>
                    </FaqItem>

                    <FaqItem question="Will the converted JPEGs be larger in size than HEIC?">
                    <p>
                        In most cases, yes. HEIC files are typically 40–50% smaller than
                        JPEGs of the same quality because of their advanced compression
                        algorithm. For example, a 3 MB HEIC photo might become 5 MB after
                        conversion to JPEG. This is the trade-off for compatibility. While
                        JPEGs are slightly larger, they guarantee that your files can be
                        opened on almost any device without special software.
                    </p>
                    </FaqItem>

                    <FaqItem question="Can I convert JPEG back to HEIC?">
                    <p>
                        Technically, yes—you can re-encode a JPEG as a HEIC file. However,
                        it won’t reduce the file size much or restore any of the original
                        quality lost during JPEG compression. HEIC’s real advantage comes
                        from being the original capture format on Apple devices, where it
                        efficiently stores high-resolution data. Converting from JPEG back
                        to HEIC usually offers little benefit unless you specifically need
                        all your images in HEIC format for consistency or storage.
                    </p>
                    </FaqItem>
                </div>
                </div>
            </div>
        </div>
    );
}
