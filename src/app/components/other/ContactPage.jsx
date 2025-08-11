'use client';

import React, { useState } from 'react';
import { sendContactMessage } from '../../../lib/apiService'; // Adjust the import path as needed

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setError(null);

        // Basic validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setError('Please fill out all fields.');
            setStatus('error');
            return;
        }

        try {
            // Call the dedicated apiService method
            await sendContactMessage(formData);
            
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form on success
        } catch (err) {
            setError(err.message);
            setStatus('error');
        }
    };

    return (
        <div className="w-full min-h-screen bg-white font-sans">
            <div className="container mx-auto px-4 py-10 sm:py-16">
                <div className="w-full max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="flex justify-center items-center gap-3 mb-2">
                            <svg className="w-10 h-10 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                            <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">Contact Us</h1>
                        </div>
                        <p className="text-lg text-slate-500 mt-2">
                            Have a question or feedback? We'd love to hear from you.
                        </p>
                    </div>

                    {/* Contact Form Section */}
                    <div className="bg-white rounded-lg p-6 sm:p-10 border border-slate-200">
                        {status === 'success' ? (
                            <div className="text-center p-8 bg-green-50 border border-green-200 rounded-lg">
                                <h3 className="text-2xl font-bold text-green-700">✓ Thank You!</h3>
                                <p className="text-slate-600 mt-2">Your message has been sent successfully. We'll get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                        <input type="text" id="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-slate-300 bg-white text-slate-800 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition" required />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                        <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-slate-300 bg-white text-slate-800 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition" required />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                                    <input type="text" id="subject" value={formData.subject} onChange={handleChange} className="w-full p-3 border border-slate-300 bg-white text-slate-800 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition" required />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                                    <textarea id="message" rows="6" value={formData.message} onChange={handleChange} className="w-full p-3 border border-slate-300 bg-white text-slate-800 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition resize-none" required></textarea>
                                </div>
                                
                                {status === 'error' && (
                                    <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <button type="submit" disabled={status === 'sending'} className="w-full bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-red-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center">
                                        {status === 'sending' ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
