import React from 'react';
export const metadata = {
    title: 'About File Tools 4U | Our Mission & Story',
    description: 'Learn about the mission behind File Tools 4U, your go-to destination for free, high-quality, and easy-to-use online file utilities.',
    alternates: {
        canonical: 'https://filetools4u.com/about',
    },
};

const BeliefCard = ({ icon, title, children }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
        <div className="flex-shrink-0 w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600">{children}</p>
    </div>
);


export default function AboutPage() {
    return (
        <div className="w-full min-h-screen bg-white font-sans">
            <div className="container mx-auto px-4 py-10 sm:py-16">
                <div className="w-full max-w-5xl mx-auto">
                    
                    <section className="text-center mb-16">
                        <h1 className="text-4xl sm:text-4xl md:text-6xl font-extrabold text-slate-800 mb-4">
                            Making Digital Tools Simple.
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-500 max-w-3xl mx-auto">
                            File Tools 4U was founded on the belief that everyone deserves access to powerful, private, and easy-to-use utilities without the complexity or cost.
                        </p>
                    </section>

                    <section className="mb-16">
                         <div className="prose prose-lg max-w-none text-slate-700 mx-auto text-center">
                            <h2 className="text-3xl font-bold text-slate-800">Our Story</h2>
                            <p className="text-lg">
                                In a world filled with complex software and expensive subscriptions, we saw a need for a simpler solution. File Tools 4U was born from the idea that everyone should have access to high-quality file utilities without the hassle. Whether you're a student trying to compress a PDF for an assignment, a photographer optimizing images for your portfolio, or a creative professional bringing an idea to life with AI, our tools are designed for you.
                            </p>
                        </div>
                    </section>

                    <div className="my-12 border-t border-gray-200"></div>

                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">What We Believe In</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <BeliefCard 
                                icon={<svg className="w-8 h-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.471-2.471a.563.563 0 01.8 0l2.5 2.5a.563.563 0 010 .8l-2.47 2.471m-5.877-5.877l-2.47-2.471a.563.563 0 00-.8 0l-2.5 2.5a.563.563 0 000 .8l2.47 2.471" /></svg>}
                                title="Simplicity"
                            >
                                Our tools are designed to be intuitive and easy to use. No confusing interfaces, no unnecessary steps.
                            </BeliefCard>
                            <BeliefCard 
                                icon={<svg className="w-8 h-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>}
                                title="Privacy"
                            >
                                We have a deep respect for your data. Your files are processed securely and are never stored on our servers.
                            </BeliefCard>
                            <BeliefCard 
                                icon={<svg className="w-8 h-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>}
                                title="Accessibility"
                            >
                                All our tools are free and work on any device, directly in your browser. No software to install, no sign-ups.
                            </BeliefCard>
                        </div>
                    </section>

                     <div className="my-12 border-t border-gray-200"></div>

                    <section>
                         <div className="prose prose-lg max-w-none text-slate-700 mx-auto text-center">
                            <h2 className="text-3xl font-bold text-slate-800">Looking Ahead</h2>
                            <p className="text-lg">
                                We are constantly working to improve our existing tools and add new, innovative features to the site. Our goal is to become your trusted, go-to destination for all your everyday file management needs. Thank you for being a part of our journey!
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

