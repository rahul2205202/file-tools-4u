'use client';

import React, { useState, useEffect } from 'react';
import { convertImagesToPdf } from '../../../lib/apiService';
import FaqItem from '../shared/FaqItem';

export default function ImageToPdfConverter() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pdfFileName, setPdfFileName] = useState('filetools-document');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [logMessage, setLogMessage] = useState('');

    useEffect(() => {
        return () => {
            imagePreviews.forEach(file => URL.revokeObjectURL(file.url));
            if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        };
    }, [imagePreviews, pdfUrl]);

    const handleReset = () => {
        setSelectedFiles([]);
        setImagePreviews([]);
        setPdfUrl(null);
        setError(null);
        setUploadProgress(0);
        setLogMessage('');
        setPdfFileName('filetools-document');
        const fileInput = document.getElementById('image-upload-input');
        if (fileInput) fileInput.value = '';
    };
    
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            handleReset();
            const validFiles = files.filter(file => file.type.startsWith('image/'));
            if(validFiles.length !== files.length) {
                setError("Some files were not valid images and have been ignored.");
            }
            setSelectedFiles(validFiles);
            setImagePreviews(validFiles.map(file => ({ name: file.name, url: URL.createObjectURL(file) })));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFiles.length === 0) {
            setError('Please select one or more image files to convert.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setPdfUrl(null);
        setUploadProgress(0);
        setLogMessage('Preparing your document...');

        const handleUploadProgress = (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
            setLogMessage(percentCompleted < 100 ? `Uploading... ${percentCompleted}%` : 'Finalizing PDF...');
        };

        const formData = new FormData();
        selectedFiles.forEach(file => formData.append('files', file));
        formData.append('filename', getDownloadFileName());

        try {
            const pdfBlob = await convertImagesToPdf(formData, handleUploadProgress);
            setLogMessage('Conversion successful!');
            setPdfUrl(URL.createObjectURL(pdfBlob));
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
            setLogMessage('');
        } finally {
            setIsLoading(false);
        }
    };

    const getDownloadFileName = () => {
        const sanitizedName = pdfFileName.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
        return `${sanitizedName || 'download'}.pdf`;
    };

    return (
        <div className="w-full max-w-3xl min-h-screen bg-background font-sans">
            <div className="container mx-auto bg-background">
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <svg className="w-10 h-10 text-red-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4 3C4 1.89543 4.89543 1 6 1H14.5858C15.1162 1 15.625 1.21071 16.002 1.58787L20.4121 5.99797C20.7893 6.375 21 6.88379 21 7.41421V21C21 22.1046 20.1046 23 19 23H6C4.89543 23 4 22.1046 4 21V3ZM6 3H14V8C14 8.55228 14.4477 9 15 9H20V21H6V3Z"/></svg>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">Image to PDF</h1>
                    </div>
                    <p className="text-lg text-slate-500 mb-8">Create professional PDF documents from your images.</p>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4 text-left" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span>{error}</span>
                        </div>
                    )}
                    
                    {!isLoading && !pdfUrl && (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="image-upload-input" className="relative block w-full border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-red-500 hover:bg-red-50 transition-colors">
                                <input id="image-upload-input" type="file" accept="image/png, image/jpeg" multiple onChange={handleFileChange} className="sr-only" />
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <span className="mt-4 block text-lg font-semibold text-slate-700">Drop images here or <span className="text-red-600">click to browse</span></span>
                                <span className="mt-1 block text-sm text-slate-500">Supports PNG, JPG, JPEG</span>
                            </label>

                            {selectedFiles.length > 0 && (
                                <div className="mt-8 text-left space-y-6">
                                    <div>
                                        <label htmlFor="pdf-filename" className="block text-sm font-bold text-slate-700 mb-2">PDF Filename:</label>
                                        <input id="pdf-filename" type="text" value={pdfFileName} onChange={(e) => setPdfFileName(e.target.value)} placeholder="Enter filename" className="w-full p-3 border border-slate-300 bg-white text-slate-800 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition" />
                                    </div>
                                    <button type="submit" className="w-full bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-red-700 transition-colors">
                                        Create PDF
                                    </button>
                                </div>
                            )}
                        </form>
                    )}

                    {isLoading && (
                        <div className="my-8 max-w-2xl mx-auto">
                            <h3 className="text-xl font-semibold text-slate-700 mb-4">{logMessage}</h3>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div className="bg-red-600 h-4 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                        </div>
                    )}
                    
                    {pdfUrl && !isLoading && (
                        <div className="my-8 space-y-4">
                            <h3 className="text-2xl font-bold text-green-600">✓ Your PDF is Ready!</h3>
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                                <a href={pdfUrl} download={getDownloadFileName()} className="w-full sm:w-auto bg-red-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-red-700 transition-colors">
                                    Download PDF
                                </a>
                                <button onClick={handleReset} className="w-full sm:w-auto bg-slate-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-800 transition-colors">
                                    Start Over
                                </button>
                            </div>
                        </div>
                    )}

                    {imagePreviews.length > 0 && (
                        <div className="mt-10 border-t border-gray-200 pt-6">
                            <h3 className="text-xl font-bold text-slate-800 text-left mb-4">Selected Images ({imagePreviews.length})</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 bg-slate-50 p-4 rounded-md">
                                {imagePreviews.map((image) => (
                                    <div key={image.name} className="text-center">
                                        <img src={image.url} alt={image.name} className="w-full h-24 object-cover rounded-md mb-2 border-2 border-white" />
                                        <p className="text-xs text-slate-600 truncate" title={image.name}>{image.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="my-5"></div>
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-12">Create a PDF in 3 Simple Steps</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">1</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Upload Images</h3><p className="text-slate-600">Select your JPG or PNG files by clicking the upload area or dragging and dropping.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">2</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Create Document</h3><p className="text-slate-600">Give your file a custom name if you wish, then click "Create PDF" to begin processing.</p></div>
                        <div className="flex flex-col items-center"><div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mb-5"><span className="font-bold text-2xl">3</span></div><h3 className="text-xl font-semibold text-slate-800 mb-2">Download</h3><p className="text-slate-600">Your professional PDF will be ready instantly. Click to download and you're all set!</p></div>
                    </div>
                </div>
                <div className="my-5"></div>
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">Multi-Image Support</h3>
                                <p className="text-slate-600">Combine multiple JPG, PNG, and other image types into a single, convenient PDF document.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M12 21v-6.375m0 0a3.75 3.75 0 01-7.5 0m7.5 0a3.75 3.75 0 007.5 0M12 21a3.75 3.75 0 01-7.5 0m7.5 0a3.75 3.75 0 007.5 0" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">High-Quality Output</h3>
                                <p className="text-slate-600">Images are processed with care to ensure a crisp, professional result without quality loss.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">Secure & Private</h3>
                                <p className="text-slate-600">All uploaded files are automatically and permanently deleted from our servers after one hour.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">No Software Installation</h3>
                                <p className="text-slate-600">Our converter works entirely in your browser. No downloads or installations are required.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-5"></div>
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
                        How to Convert Images to PDF Online?
                    </h2>
                    <p className="text-slate-600 mb-4">
                        Converting <strong>images to PDF</strong> has never been easier. With File Tools 4U’s
                        free online converter, you can instantly combine multiple <strong>JPG, PNG, or JPEG</strong>
                        files into a single, high-quality PDF — all without installing any software. 
                        This tool works directly in your browser, ensuring your files stay private and secure.
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-slate-600">
                        <li>Click the upload area and select your image files.</li>
                        <li>Optionally rename your file to personalize your PDF.</li>
                        <li>Click <strong>“Create PDF”</strong> to start conversion.</li>
                        <li>Once ready, download your professional PDF instantly!</li>
                    </ol>
                </div>
                <div className="my-5"></div>
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10">
                    <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">
                        Why Use File Tools 4U Image to PDF Converter?
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                        <li><strong>Free Forever:</strong> No hidden costs, sign-ups, or subscriptions.</li>
                        <li><strong>Browser-Based:</strong> Works on Windows, macOS, Linux, Android, and iOS.</li>
                        <li><strong>High Quality:</strong> Maintain sharpness and detail in your images.</li>
                        <li><strong>Privacy Guaranteed:</strong> Your images are never stored permanently.</li>
                        <li><strong>Fast & Lightweight:</strong> Conversion completes in just a few seconds.</li>
                    </ul>
                </div>
                <div className="my-5"></div>
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10">
                    <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">
                        Supported Image Formats
                    </h3>
                    <p className="text-slate-600 mb-4">
                        This converter supports the most popular image types:
                        <strong> JPG, JPEG, and PNG.</strong> Whether you’re scanning documents, merging
                        receipts, or creating a digital photo book, File Tools 4U handles it smoothly.
                    </p>
                </div>
                    
                <div className="my-5"></div>
                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        <FaqItem question="Is this Image to PDF Converter free?">
                        <p>
                            Yes! Our converter is 100% free to use, with no hidden fees, watermarks, or sign-up requirements.
                        </p>
                        </FaqItem>
                        <FaqItem question="Are my images safe?">
                        <p>
                            Absolutely. We prioritize your privacy. Your images are processed securely over an encrypted connection and are automatically and permanently deleted from our servers after one hour.
                        </p>
                        </FaqItem>
                        <FaqItem question="Can I convert multiple images at once?">
                        <p>
                            Yes, you can select and upload multiple JPG or PNG files at the same time. Our tool will automatically merge them into a single, multi-page PDF file for you.
                        </p>
                        </FaqItem>
                        <FaqItem question="Does this work on mobile devices?">
                        <p>
                            Yes, our Image to PDF converter is fully responsive and designed to work smoothly on all modern devices, including smartphones and tablets, directly in your browser.
                        </p>
                        </FaqItem>
                        <FaqItem question="Do I need to install any software?">
                        <p>
                            No installation is required. The entire process runs online in your browser, making it quick, easy, and accessible from anywhere without needing to download any software.
                        </p>
                        </FaqItem>
                    </div>
                </div>
            </div>
        </div>
    );
}