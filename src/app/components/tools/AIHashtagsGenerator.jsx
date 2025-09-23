'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { generateHashtags } from '../../../lib/apiService';


export default function AIHashtagsGenerator() {
    const [textContent, setTextContent] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [hashtags, setHashtags] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    const handleReset = () => {
        setTextContent('');
        setSelectedFile(null);
        setImagePreview(null);
        setHashtags('');
        setError(null);
        setIsLoading(false);
        setCopySuccess('');
        const fileInput = document.getElementById('hashtag-upload-input');
        if (fileInput) fileInput.value = '';
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setImagePreview(null);
            if(file) setError('Please select a valid image file.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!textContent && !selectedFile) {
            setError('Please enter a description or upload an image to generate hashtags.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setHashtags('');
        setCopySuccess('');

        const formData = new FormData();
        if (textContent) formData.append('textContent', textContent);
        if (selectedFile) formData.append('file', selectedFile);

        try {
            const generatedText = await generateHashtags(formData);
            setHashtags(generatedText);
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopyToClipboard = () => {
        if (!hashtags) return;
        navigator.clipboard.writeText(hashtags);
        setCopySuccess('Copied to clipboard!');
        setTimeout(() => setCopySuccess(''), 2000);
    };

    return (
        <>
            <Head>
                <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXX" /> 
            </Head>

            <main className="w-full min-h-screen bg-white font-sans">
                <div className="container mx-auto px-4 py-10 sm:py-10">

                    {/* Hero Section */}
                    <section className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 sm:p-10 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
                            AI Hashtag Generator
                        </h1>
                        <p className="text-lg text-slate-500 mb-8">
                            Boost your social media reach with trending, AI-generated hashtags. 
                            Works for Instagram, TikTok, YouTube, and more.
                        </p>

                        {/* Adsense slot */}
                        <div className="adsense-slot my-6 text-center">
                            {/* Google AdSense code goes here */}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <label htmlFor="text-input" className="block text-lg font-semibold text-slate-700 mb-2 text-left">
                                Describe your content
                            </label>
                            <textarea
                                id="text-input"
                                className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                                rows="4"
                                placeholder="e.g., A cozy shot of a latte with autumn leaves in the background."
                                value={textContent}
                                onChange={(e) => setTextContent(e.target.value)}
                            />
                            <p className="font-bold text-center">OR</p>
                            <label htmlFor="text-input" className="block text-lg font-semibold text-slate-700 mb-2 text-left">
                                Upload an Image
                            </label>
                            <input id="hashtag-upload-input" type="file" accept="image/*" onChange={handleFileChange} 
                                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
                            />
                            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg shadow-md max-h-64 mx-auto" />}
                            <button type="submit" disabled={isLoading} 
                                className="w-full bg-purple-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-purple-700 transition-colors disabled:bg-slate-400">
                                {isLoading ? 'Generating...' : 'Generate Hashtags'}
                            </button>
                        </form>

                        {/* Results */}
                        {hashtags && !isLoading && (
                            <div className="mt-10 border-t border-gray-200 pt-6 text-left">
                                <h2 className="text-2xl font-bold text-slate-800 mb-4">Generated Hashtags</h2>
                                <textarea readOnly value={hashtags} className="w-full p-4 text-slate-700 bg-slate-50 border rounded-lg h-32 resize-none" />
                                <button onClick={handleCopyToClipboard} className="mt-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-md hover:bg-purple-200">Copy Hashtags</button>
                                {copySuccess && <p className="text-green-600 font-semibold mt-2">{copySuccess}</p>}
                            </div>
                        )}
                    </section>

                    {/* SEO Content Section */}
                    <section className="mt-12 max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Why Use an AI Hashtag Generator?</h2>
                        <p className="text-slate-600 mb-4 text-lg text-center">
                            Hashtags are essential for growing your reach on social media platforms like Instagram, TikTok, Twitter, and YouTube. 
                            With our AI-powered hashtag generator, you can get context-aware, trending, and highly relevant hashtags in seconds.
                        </p>
                        <div className="adsense-slot my-6 text-center">{/* Adsense */}</div>
                    </section>

                    {/* FAQ for SEO */}
                    <section className="mt-12 max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">

                            <details className="border p-4 rounded-lg">
                                <summary className="font-semibold cursor-pointer">How to generate hashtags with this tool?</summary>
                                <p className="text-slate-600 mt-2">
                                    Using our AI hashtag generator is simple. First, describe your content in the text box (for example: 
                                    “A beach sunset with friends”). Alternatively, you can upload an image related to your post. Once you’ve 
                                    added the input, click on the <strong>“Generate Hashtags”</strong> button. Within a few seconds, our AI will 
                                    analyze your text or image and provide a list of trending and context-relevant hashtags. You can review 
                                    the generated hashtags, copy them directly with a single click, and paste them into your social media post. 
                                    This process helps save time and ensures you are always using hashtags that maximize reach and engagement. 
                                    Whether you are posting on Instagram, TikTok, Twitter, or YouTube, our tool adapts hashtags to fit your 
                                    content style and platform. 
                                </p>
                            </details>

                            <details className="border p-4 rounded-lg">
                                <summary className="font-semibold cursor-pointer">How to choose the best hashtags for Instagram?</summary>
                                <p className="text-slate-600 mt-2">
                                    Choosing the right hashtags is key to growing your Instagram presence. Start by focusing on relevance: 
                                    make sure the hashtags describe your post, niche, or industry. For example, if you’re sharing a coffee 
                                    photo, use hashtags like <em>#coffeelover</em> or <em>#latteart</em> instead of random trending ones. 
                                    Next, mix popular hashtags (millions of posts) with niche hashtags (tens of thousands of posts) to 
                                    balance visibility and discoverability. Our AI hashtag generator does this automatically by analyzing 
                                    your content and suggesting a mix of high-volume and niche hashtags. Finally, avoid overusing the same 
                                    hashtags in every post, as Instagram’s algorithm may limit your reach. Instead, rotate between sets of 
                                    hashtags that are still relevant to your content. This ensures consistent growth and engagement. 
                                </p>
                            </details>

                            <details className="border p-4 rounded-lg">
                                <summary className="font-semibold cursor-pointer">How to use hashtags on TikTok to go viral?</summary>
                                <p className="text-slate-600 mt-2">
                                    On TikTok, hashtags play a huge role in how the algorithm recommends videos. To maximize your chances 
                                    of going viral, you should use a blend of trending challenge hashtags, niche-specific hashtags, and 
                                    evergreen ones. For example, if you’re making a dance video, combining a trending challenge hashtag with 
                                    broader ones like <em>#dance</em> or <em>#TikTokDance</em> helps TikTok understand your content. Our AI 
                                    hashtag generator identifies trending TikTok hashtags in real time and matches them with the content 
                                    you describe or upload. The key is consistency: use hashtags that truly describe your video, post content 
                                    regularly, and engage with viewers in comments. TikTok rewards genuine, engaging content paired with the 
                                    right hashtags, making this tool a must-have for creators looking to grow. 
                                </p>
                            </details>

                            <details className="border p-4 rounded-lg">
                                <summary className="font-semibold cursor-pointer">How to boost YouTube views with hashtags?</summary>
                                <p className="text-slate-600 mt-2">
                                    YouTube allows hashtags in video titles and descriptions, and when used correctly, they improve 
                                    discoverability. To boost views, choose hashtags that describe your video topic and keywords people 
                                    are likely to search for. For example, if you post a cooking tutorial, hashtags like <em>#EasyRecipes</em>, 
                                    <em>#HomeCooking</em>, or <em>#DinnerIdeas</em> will help your video rank. Our AI hashtag generator 
                                    suggests YouTube-optimized hashtags that are both searchable and trending. Place 3–5 hashtags in your 
                                    video title and up to 15 in the description for best results. YouTube automatically links hashtags 
                                    above the video title, which makes your content easier to find. Combined with good thumbnails and 
                                    engaging titles, hashtags can significantly improve your video’s visibility and watch time. 
                                </p>
                            </details>

                            <details className="border p-4 rounded-lg">
                                <summary className="font-semibold cursor-pointer">How to increase Twitter reach with hashtags?</summary>
                                <p className="text-slate-600 mt-2">
                                    On Twitter (X), hashtags are crucial for joining conversations and trending topics. To maximize reach, 
                                    research trending hashtags in your niche and combine them with evergreen ones. For instance, during a 
                                    live event or sports match, using hashtags like <em>#WorldCup2025</em> can put your tweet in front of 
                                    millions of users. At the same time, including niche hashtags like <em>#FootballFans</em> ensures your 
                                    tweet reaches the right audience. Our AI generator analyzes real-time trends and provides relevant hashtags 
                                    that increase engagement. For best results, use 1–3 hashtags per tweet—too many can reduce readability. 
                                    Pair hashtags with engaging visuals, polls, or short videos to boost interaction. Twitter’s algorithm 
                                    favors tweets that get quick engagement, and hashtags are one of the fastest ways to achieve this. 
                                </p>
                            </details>

                        </div>
                    </section>


                </div>
            </main>
        </>
    );
}
