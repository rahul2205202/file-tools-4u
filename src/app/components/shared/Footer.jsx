import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-800 text-slate-400 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between py-6">
                    
                    {/* Copyright Notice */}
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <p className="text-sm">
                            &copy; {new Date().getFullYear()} File Tools 4U. All Rights Reserved.
                        </p>
                    </div>

                    {/* Footer Links */}
                    <div className="flex space-x-6">
                        <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-red-500 transition-colors duration-200">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-of-service" className="text-sm text-slate-400 hover:text-red-500 transition-colors duration-200">
                            Terms of Service
                        </Link>
                        <Link href="/contact" className="text-sm text-slate-400 hover:text-red-500 transition-colors duration-200">
                            Contact
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}
