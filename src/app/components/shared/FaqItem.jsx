'use client';

import React, { useState } from 'react';

export default function FaqItem({ question, children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200 py-4">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left gap-4"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg font-semibold text-slate-800">
                    {question}
                </h3>
                <svg 
                    className={`w-6 h-6 text-slate-500 transform transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && (
                <div className="mt-4 text-slate-600 pr-8">
                    {children}
                </div>
            )}
        </div>
    );
}

