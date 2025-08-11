'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Navigation links for the header, consistent with the homepage tools
    const navLinks = [
        { href: '/image-compressor', text: 'Compressor' },
        { href: '/generate-ai-image', text: 'AI Generator' },
        { href: '/image-to-pdf', text: 'Image to PDF' },
        { href: '/png-to-jpeg', text: 'PNG to JPEG' },
        // Assuming you have a page for this tool as well
        { href: '/jpeg-to-png', text: 'JPEG to PNG' },
    ];

    // Helper component for individual navigation links to avoid repeating classes
    const NavLink = ({ href, children }) => {
        const isActive = pathname === href;
        return (
            <Link
                href={href}
                className={`font-medium transition-colors duration-200 border-b-2 ${
                    isActive 
                    ? 'text-red-600 border-red-600' 
                    : 'text-slate-600 border-transparent hover:text-red-600'
                }`}
            >
                {children}
            </Link>
        );
    };
    
    // Helper for mobile links
    const MobileNavLink = ({ href, children }) => {
         const isActive = pathname === href;
        return (
            <Link 
                href={href} 
                onClick={() => setIsMenuOpen(false)} 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive 
                    ? 'bg-red-50 text-red-700' 
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
                {children}
            </Link>
        );
    };

    return (
        <header className="bg-white/80 backdrop-blur-sm shadow-sm w-full sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Site Logo/Name */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-slate-800 hover:text-red-600 transition-colors">
                            File Tools 4U
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:space-x-8">
                        {navLinks.map((link) => (
                            <NavLink key={link.href} href={link.href}>
                                {link.text}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                           <MobileNavLink key={link.href} href={link.href}>
                               {link.text}
                           </MobileNavLink>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
