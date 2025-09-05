'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // To manage dropdowns
    const pathname = usePathname();

    // Icons for each tool link
    const toolIcons = {
        compressor: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" /></svg>,
        generator: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15l-4 6h12l-4-6 2.293-2.293a1 1 0 011.414 0L19 12M5 12l2.293 2.293a1 1 0 001.414 0L11 12l-4-6H3l2 6z" /></svg>,
        webp: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691V5.25a2.25 2.25 0 00-2.25-2.25L10.5 3z" /></svg>,
        pngToJpeg: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>,
        jpegToPng: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m0 0V9.75a2.25 2.25 0 00-2.25-2.25h-13.5A2.25 2.25 0 003 9.75v6.75m16.5 0l-2.25-2.25m0 0l-2.25 2.25m2.25-2.25l2.25 2.25M12 18.75l-2.25-2.25m0 0l-2.25 2.25m2.25-2.25l2.25 2.25" /></svg>,
        imgToPdf: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
        restorer: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>,
    };

    // Group navigation links into categories with icons
    const navGroups = [
        {
            title: 'Image Tools',
            icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" /></svg>,
            links: [
                { href: '/image-compressor', text: 'Image Compressor', icon: toolIcons.compressor },
                { href: '/webp-converter', text: 'WebP Converter', icon: toolIcons.webp },
                { href: '/png-to-jpeg', text: 'PNG to JPEG', icon: toolIcons.pngToJpeg },
                { href: '/jpeg-to-png', text: 'JPEG to PNG', icon: toolIcons.jpegToPng },
            ],
        },
        {
            title: 'PDF Tools',
            icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
            links: [
                { href: '/image-to-pdf', text: 'Image to PDF', icon: toolIcons.imgToPdf },
                { href: '/pdf-compressor', text: 'PDF Compressor', icon: toolIcons.compressor },
            ],
        },
        {
            title: 'AI Tools',
            icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.25 21.75l-.648-1.178a3.375 3.375 0 00-2.456-2.456L12 17.25l1.178-.648a3.375 3.375 0 002.456-2.456L16.25 13.5l.648 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.648a3.375 3.375 0 00-2.456 2.456z" /></svg>,
            links: [
                { href: '/generate-ai-image', text: 'AI Image Generator', icon: toolIcons.generator },
                { href: '/photo-restorer', text: 'Photo Restorer', icon: toolIcons.restorer },
            ],
        },
    ];

    // Helper for mobile links
    const MobileNavLink = ({ href, children, icon }) => {
        const isActive = pathname === href;
        return (
            <Link 
                href={href} 
                onClick={() => setIsMenuOpen(false)} 
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive 
                    ? 'bg-red-50 text-red-700' 
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
                {icon}
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
                                <button className="font-medium text-slate-600 hover:text-red-600 transition-colors duration-200 flex items-center gap-2 px-3 py-2">
                                    {group.icon}
                                    {group.title}
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                </button>
                                {openDropdown === group.title && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-20 transition-all duration-300 ease-in-out transform opacity-100 scale-100">
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-200 transform rotate-45"></div>
                                        {group.links.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={`flex items-center gap-3 w-full px-4 py-2 text-sm ${
                                                    pathname === link.href 
                                                    ? 'font-semibold text-red-600' 
                                                    : 'text-slate-700'
                                                } hover:bg-slate-100`}
                                            >
                                                <span className={pathname === link.href ? 'text-red-600' : 'text-slate-500'}>{link.icon}</span>
                                                {link.text}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
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
                                <h3 className="px-3 text-xs font-semibold uppercase text-slate-500 tracking-wider flex items-center gap-2">
                                    {group.icon}
                                    {group.title}
                                </h3>
                                <div className="mt-1 space-y-1">
                                    {group.links.map((link) => (
                                       <MobileNavLink key={link.href} href={link.href} icon={link.icon}>
                                           {link.text}
                                       </MobileNavLink>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
