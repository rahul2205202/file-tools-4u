'use client';

import React, { useState, useEffect, useRef } from 'react';
import { convertImagesToPdf } from '@/lib/apiService'; // Using the path alias

export default function ImageToPdfConverter() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pdfFileName, setPdfFileName] = useState('filetools4u-document');

    // New state for progress simulation
    const [progress, setProgress] = useState(0);
    const [logMessage, setLogMessage] = useState('');
    const intervalRef = useRef(null);

    // Clean up intervals and object URLs
    useEffect(() => {
        return () => {'use client';

import React, { useState, useEffect } from 'react';
import { convertImagesToPdf } from '@/lib/apiService';

export default function ImageToPdfConverter() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pdfFileName, setPdfFileName] = useState('filetools4u-document');

    // State for real-time progress
    const [uploadProgress, setUploadProgress] = useState(0);
    const [networkSpeed, setNetworkSpeed] = useState(0);
    const [logMessage, setLogMessage] = useState('');
    const [startTime, setStartTime] = useState(0);

    useEffect(() => {
        return () => {
            imagePreviews.forEach(file => URL.revokeObjectURL(file.url));
            if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        };
    }, [imagePreviews, pdfUrl]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            const validFiles = files.filter(file => file.type.startsWith('image/'));
            setSelectedFiles(validFiles);
            
            const previewUrls = validFiles.map(file => ({
                name: file.name,
                url: URL.createObjectURL(file)
            }));
            setImagePreviews(previewUrls);

            setPdfUrl(null);
            setError(null);
            setUploadProgress(0);
            setLogMessage('');
        }
    };

    const handleUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);

        const elapsedTime = (new Date().getTime() - startTime) / 1000; // in seconds
        if (elapsedTime > 0) {
            const speed = progressEvent.loaded / elapsedTime; // bytes per second
            setNetworkSpeed(speed);
        }

        if (percentCompleted < 100) {
            setLogMessage(`Uploading... ${percentCompleted}%`);
        } else {
            setLogMessage('Upload complete. Processing on server...');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFiles.length === 0) {
            setError('Please select one or more image files.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setPdfUrl(null);
        setUploadProgress(0);
        setNetworkSpeed(0);
        setStartTime(new Date().getTime());
        setLogMessage('Preparing upload...');

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('files', file);
        });
        const finalFilename = getDownloadFileName();
        formData.append('filename', finalFilename);

        try {
            const pdfBlob = await convertImagesToPdf(formData, handleUploadProgress);
            setLogMessage('Conversion complete!');
            setPdfUrl(URL.createObjectURL(pdfBlob));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getDownloadFileName = () => {
        const sanitizedName = pdfFileName.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
        return `${sanitizedName || 'download'}.pdf`;
    };

    const formatSpeed = (bytesPerSecond) => {
        if (bytesPerSecond < 1024) return `${bytesPerSecond.toFixed(0)} B/s`;
        if (bytesPerSecond < 1024 * 1024) return `${(bytesPerSecond / 1024).toFixed(1)} KB/s`;
        return `${(bytesPerSecond / (1024 * 1024)).toFixed(2)} MB/s`;
    };
    
    return (
        <div className="w-full max-w-6xl">
            <div className="bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-bold text-black text-center mb-2">Image to PDF Converter</h2>
                <p className="text-center text-gray-500 mb-8">Upload multiple images to combine them into a single PDF.</p>

                {!isLoading && !pdfUrl && (
                    <form onSubmit={handleSubmit} className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                            <div className="col-span-1">
                                <label htmlFor="pdf-file-upload" className="block text-sm font-bold text-black mb-2">1. Upload Images</label>
                                <input id="pdf-file-upload" type="file" accept="image/png, image/jpeg" multiple onChange={handleFileChange} className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-black hover:file:bg-gray-300" />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="pdf-filename" className="block text-sm font-bold text-black mb-2">2. Name Your PDF</label>
                                <input id="pdf-filename" type="text" value={pdfFileName} onChange={(e) => setPdfFileName(e.target.value)} placeholder="Enter filename" className="w-full p-2 border border-black bg-white text-black rounded-md focus:ring-2 focus:ring-black focus:border-black" />
                            </div>
                            <div className="col-span-1">
                                 <button type="submit" disabled={selectedFiles.length === 0} className="w-full bg-black text-white font-bold py-2.5 px-4 rounded-md transition-colors duration-300 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    3. Convert to PDF
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4" role="alert"><strong className="font-bold">Error: </strong><span className="block sm:inline">{error}</span></div>}

                {isLoading && (
                    <div className="my-8">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-black">{logMessage}</h3>
                            {networkSpeed > 0 && <span className="text-sm font-medium text-gray-600">{formatSpeed(networkSpeed)}</span>}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-green-600 h-4 rounded-full transition-width duration-150" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                    </div>
                )}

                {imagePreviews.length > 0 && (
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-black">Image Previews ({imagePreviews.length} files)</h3>
                            {pdfUrl && !isLoading && <a href={pdfUrl} download={getDownloadFileName()} className="bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 hover:bg-green-700">Download PDF</a>}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 bg-gray-50 p-4 rounded-md">
                           {imagePreviews.map((image, index) => (
                               <div key={index} className="text-center">
                                   <img src={image.url} alt={image.name} className="w-full h-24 object-cover rounded-md mb-2 border" />
                                   <p className="text-xs text-gray-600 truncate" title={image.name}>{image.name}</p>
                               </div>
                           ))}
                        </div>
                    </div>
                )}
            </div>
            
            <div className="mt-12 bg-white rounded-lg shadow-xl p-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-black mb-10">How to Convert Images to PDF</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4"><span className="text-white font-bold text-2xl">1</span></div><h3 className="text-xl font-semibold text-black mb-2">Upload Images</h3><p className="text-gray-600 px-4">Select one or more images you want to combine into a PDF document.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4"><span className="text-white font-bold text-2xl">2</span></div><h3 className="text-xl font-semibold text-black mb-2">Create PDF</h3><p className="text-gray-600 px-4">Click the "Convert to PDF" button. Our tool will merge your images into a single file.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4"><span className="text-white font-bold text-2xl">3</span></div><h3 className="text-xl font-semibold text-black mb-2">Download</h3><p className="text-gray-600 px-4">Download your new PDF file. All uploaded images are deleted from our servers for your privacy.</p></div>
                    </div>
                </div>
                <div className="my-12 border-t border-gray-200"></div>
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-black mb-10">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto text-left">
                        <div className="flex items-start space-x-4"><div className="flex-shrink-0 w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg></div><div><h4 className="text-lg font-semibold text-black mb-1">Multi-Image Support</h4><p className="text-gray-600">Combine multiple images (JPG, PNG) into one convenient PDF document.</p></div></div>
                        <div className="flex items-start space-x-4"><div className="flex-shrink-0 w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg></div><div><h4 className="text-lg font-semibold text-black mb-1">Page per Image</h4><p className="text-gray-600">Each image you upload is automatically placed on its own separate page for a clean, organized document.</p></div></div>
                        <div className="flex items-start space-x-4"><div className="flex-shrink-0 w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div><div><h4 className="text-lg font-semibold text-black mb-1">High-Quality Output</h4><p className="text-gray-600">Images are processed to ensure a crisp and professional result in your final PDF.</p></div></div>
                        <div className="flex items-start space-x-4"><div className="flex-shrink-0 w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l5.5-5.5a1 1 0 011.414 0l5.5 5.5A12.02 12.02 0 0012 21.944a11.955 11.955 0 018.618-3.04m-3.04-7.016a1 1 0 011.414 0l2.12 2.12a1 1 0 010 1.414l-2.12 2.12a1 1 0 01-1.414 0l-2.12-2.12a1 1 0 010-1.414l2.12-2.12z"></path></svg></div><div><h4 className="text-lg font-semibold text-black mb-1">Secure & Private</h4><p className="text-gray-600">All conversions are done on our secure servers, and your files are never stored or shared.</p></div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

            if (intervalRef.current) clearInterval(intervalRef.current);
            imagePreviews.forEach(file => URL.revokeObjectURL(file.url));
            if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        };
    }, [imagePreviews, pdfUrl]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            const validFiles = files.filter(file => file.type.startsWith('image/'));
            setSelectedFiles(validFiles);
            
            const previewUrls = validFiles.map(file => ({
                name: file.name,
                url: URL.createObjectURL(file)
            }));
            setImagePreviews(previewUrls);

            setPdfUrl(null);
            setError(null);
            setProgress(0);
            setLogMessage('');
        }
    };

    const startProgressSimulation = (fileCount) => {
        setProgress(0);
        setLogMessage('Starting conversion...');
        
        const totalDuration = fileCount * 500 + 1000; // 0.5s per image + 1s overhead
        const increment = 100 / (totalDuration / 100); // Progress increment every 100ms

        const logSteps = [
            { percent: 10, message: 'Uploading files...' },
            { percent: 25, message: 'Initializing PDF document...' },
            ...Array.from({ length: fileCount }, (_, i) => ({
                percent: 30 + (60 / fileCount) * (i + 1),
                message: `Processing image ${i + 1} of ${fileCount}...`
            })),
            { percent: 95, message: 'Finalizing PDF...' }
        ];

        intervalRef.current = setInterval(() => {
            setProgress(prev => {
                const newProgress = Math.min(prev + increment, 99);
                const currentStep = logSteps.slice().reverse().find(step => newProgress >= step.percent);
                if (currentStep) {
                    setLogMessage(currentStep.message);
                }
                return newProgress;
            });
        }, 100);
    };

    const stopProgressSimulation = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFiles.length === 0) {
            setError('Please select one or more image files.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setPdfUrl(null);
        startProgressSimulation(selectedFiles.length);

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('files', file);
        });
        const finalFilename = getDownloadFileName();
        formData.append('filename', finalFilename);

        try {
            const pdfBlob = await convertImagesToPdf(formData);
            stopProgressSimulation();
            setProgress(100);
            setLogMessage('Conversion complete!');
            setPdfUrl(URL.createObjectURL(pdfBlob));
        } catch (err) {
            stopProgressSimulation();
            setError(err.message);
            setProgress(0);
        } finally {
            setIsLoading(false);
        }
    };

    const getDownloadFileName = () => {
        const sanitizedName = pdfFileName.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
        return `${sanitizedName || 'download'}.pdf`;
    };
    
    return (
        <div className="w-full max-w-6xl">
            <div className="bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-bold text-black text-center mb-2">Image to PDF Converter</h2>
                <p className="text-center text-gray-500 mb-8">Upload multiple images to combine them into a single PDF.</p>

                {/* Show form if not loading, otherwise show progress */}
                {!isLoading && !pdfUrl && (
                    <form onSubmit={handleSubmit} className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                            <div className="col-span-1">
                                <label htmlFor="pdf-file-upload" className="block text-sm font-bold text-black mb-2">1. Upload Images</label>
                                <input id="pdf-file-upload" type="file" accept="image/png, image/jpeg" multiple onChange={handleFileChange} className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-black hover:file:bg-gray-300" />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="pdf-filename" className="block text-sm font-bold text-black mb-2">2. Name Your PDF</label>
                                <input id="pdf-filename" type="text" value={pdfFileName} onChange={(e) => setPdfFileName(e.target.value)} placeholder="Enter filename" className="w-full p-2 border border-black bg-white text-black rounded-md focus:ring-2 focus:ring-black focus:border-black" />
                            </div>
                            <div className="col-span-1">
                                 <button type="submit" disabled={selectedFiles.length === 0} className="w-full bg-black text-white font-bold py-2.5 px-4 rounded-md transition-colors duration-300 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    3. Convert to PDF
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4" role="alert"><strong className="font-bold">Error: </strong><span className="block sm:inline">{error}</span></div>}

                {/* Progress Bar UI */}
                {isLoading && (
                    <div className="my-8">
                        <h3 className="text-lg font-semibold text-center text-black mb-2">{logMessage}</h3>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-green-600 h-4 rounded-full transition-all duration-150" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                )}

                {/* Previews and Download Section */}
                {imagePreviews.length > 0 && (
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-black">Image Previews ({imagePreviews.length} files)</h3>
                            {pdfUrl && !isLoading && <a href={pdfUrl} download={getDownloadFileName()} className="bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 hover:bg-green-700">Download PDF</a>}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 bg-gray-50 p-4 rounded-md">
                           {imagePreviews.map((image, index) => (
                               <div key={index} className="text-center">
                                   <img src={image.url} alt={image.name} className="w-full h-24 object-cover rounded-md mb-2 border" />
                                   <p className="text-xs text-gray-600 truncate" title={image.name}>{image.name}</p>
                               </div>
                           ))}
                        </div>
                    </div>
                )}
            </div>
            
            {/* ... Guide and Features Section ... */}
        </div>
    );
}
