'use client';

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { convertImagesToPdf } from '@/lib/apiService'; // Using the path alias

export default function ImageToPdfConverter() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // New state for the custom PDF filename
    const [pdfFileName, setPdfFileName] = useState('filetools4u-document');

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

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('files', file);
        });

        try {
            const pdfBlob = await convertImagesToPdf(formData);
            setPdfUrl(URL.createObjectURL(pdfBlob));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to create a sanitized filename for the download link
    const getDownloadFileName = () => {
        const sanitizedName = pdfFileName.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
        return `${sanitizedName || 'download'}.pdf`;
    };
    
    return (
        <div className="w-full max-w-6xl">
            <Helmet>
                <title>Convert Images to PDF Free | Combine JPG, PNG to PDF | File Tools 4U</title>
                <meta name="description" content="Combine multiple JPG, PNG, and other images into a single, high-quality PDF document for free with File Tools 4U. Each image is placed on a separate page." />
                <meta name="keywords" content="image to pdf, jpg to pdf, png to pdf, combine images to pdf, image to pdf converter" />
                <link rel="canonical" href="https://filetools4u.com/convert-image-to-pdf" />
            </Helmet>

            <div className="bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-bold text-black text-center mb-2">Image to PDF Converter</h2>
                <p className="text-center text-gray-500 mb-8">Upload multiple images to combine them into a single PDF.</p>

                <form onSubmit={handleSubmit} className="mb-8">
                    {/* UPDATED: Grid now has 3 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        <div className="col-span-1">
                            <label htmlFor="pdf-file-upload" className="block text-sm font-bold text-black mb-2">1. Upload Images</label>
                            <input id="pdf-file-upload" type="file" accept="image/png, image/jpeg, image/gif, image/bmp" multiple onChange={handleFileChange} className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-black hover:file:bg-gray-300" />
                        </div>
                        
                        {/* NEW: Filename input field */}
                        <div className="col-span-1">
                            <label htmlFor="pdf-filename" className="block text-sm font-bold text-black mb-2">2. Name Your PDF</label>
                            <input 
                                id="pdf-filename" 
                                type="text" 
                                value={pdfFileName}
                                onChange={(e) => setPdfFileName(e.target.value)}
                                placeholder="Enter filename"
                                className="w-full p-2 border border-black bg-white text-black rounded-md focus:ring-2 focus:ring-black focus:border-black"
                            />
                        </div>

                        <div className="col-span-1">
                             <button type="submit" disabled={isLoading || selectedFiles.length === 0} className="w-full bg-black text-white font-bold py-2.5 px-4 rounded-md transition-colors duration-300 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {isLoading ? 'Creating PDF...' : '3. Convert to PDF'}
                            </button>
                        </div>
                    </div>
                </form>
                
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4" role="alert"><strong className="font-bold">Error: </strong><span className="block sm:inline">{error}</span></div>}

                {imagePreviews.length > 0 && (
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-black">Image Previews ({imagePreviews.length} files)</h3>
                            {/* UPDATED: Download link uses the new filename function */}
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
                {/* ... Guide and Features Section ... */}
            </div>
        </div>
    );
}
