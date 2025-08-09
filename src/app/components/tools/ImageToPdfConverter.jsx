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
        return () => {
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
