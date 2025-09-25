'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const pathname = usePathname();

    // Simplified navigation structure without icons
    const navGroups = [
        {
            title: 'Image Tools',
            links: [
                { href: '/image-compressor', text: 'Image Compressor' },
                { href: '/jpeg-to-png', text: 'JPEG to PNG' },
                { href: '/jpeg-to-webp', text: 'JPEG to WebP' },
                { href: '/webp-to-png', text: 'WebP to PNG' },
                { href: '/webp-to-jpeg', text: 'WebP to JPEG' },
                { href: '/png-to-jpeg', text: 'PNG to JPEG' },
                { href: '/png-to-webp', text: 'PNG to WebP' },
            ],
        },
        {
            title: 'PDF Tools',
            links: [
                { href: '/pdf-compressor', text: 'PDF Compressor' },
                { href: '/image-to-pdf', text: 'Image to PDF' },
            ],
        },
        {
            title: 'AI Tools',
            links: [
                { href: '/generate-ai-image', text: 'AI Image Generator' },
                { href: '/photo-restorer', text: 'AI Photo Restorer' },
            ],
        },
    ];

    // Helper for mobile links (icon prop removed)
    const MobileNavLink = ({ href, children }) => {
        const isActive = pathname === href;
        return (
            <Link 
                href={href} 
                onClick={() => setIsMenuOpen(false)} 
                className={`block px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
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
                    
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-slate-800 hover:text-red-600 transition-colors">
                            File Tools 4U
                        </Link>
                    </div>

                    <nav className="hidden md:flex md:space-x-4">
                        {navGroups.map((group) => (
                            <div 
                                key={group.title}
                                className="relative"
                                onMouseEnter={() => setOpenDropdown(group.title)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <button className="font-medium text-slate-600 hover:text-red-600 transition-colors duration-200 flex items-center gap-1 px-3 py-2">
                                    {group.title}
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                </button>
                                {openDropdown === group.title && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-20">
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-200 transform rotate-45"></div>
                                        {group.links.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={`block w-full text-left px-4 py-2 text-sm ${
                                                    pathname === link.href 
                                                    ? 'font-semibold text-red-600' 
                                                    : 'text-slate-700'
                                                } hover:bg-slate-100`}
                                            >
                                                {link.text}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                         <Link href="/blog" className={`font-medium transition-colors duration-200 px-3 py-2 ${pathname === '/blog' ? 'text-red-600' : 'text-slate-600 hover:text-red-600'}`}>
                            Blog
                        </Link>
                    </nav>

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

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navGroups.map((group) => (
                            <div key={group.title} className="pt-2">
                                <h3 className="px-3 text-xs font-semibold uppercase text-slate-500 tracking-wider">
                                    {group.title}
                                </h3>
                                <div className="mt-1 space-y-1">
                                    {group.links.map((link) => (
                                       <MobileNavLink key={link.href} href={link.href}>
                                           {link.text}
                                       </MobileNavLink>
                                    ))}
                                </div>
                            </div>
                        ))}
                         <div className="pt-2">
                                <h3 className="px-3 text-xs font-semibold uppercase text-slate-500 tracking-wider">
                                    Resources
                                </h3>
                                <div className="mt-1 space-y-1">
                                   <MobileNavLink href="/blog">Blog</MobileNavLink>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </header>
    );
}

