import React from 'react';
import Link from 'next/link';
// Import icons from lucide-react for a consistent look
import { Merge, Minimize2, Hash, Sparkles, PenIcon } from 'lucide-react';

// A reusable card component for the links
const SidebarLink = ({ href, text, icon, colorClass }) => (
    <Link href={href} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-100 transition-colors">
        <div className={`flex items-center justify-center size-10 rounded-lg ${colorClass.bg}`}>
            {React.cloneElement(icon, { className: `w-5 h-5 ${colorClass.text}` })}
        </div>
        <span className="font-medium text-sm text-slate-800">{text}</span>
    </Link>
);

// The main Sidebar component
export default function Sidebar() {
    // Define your suggested tools here to make them easy to update
    const suggestedTools = [
        {
            href: '/generate-ai-image',
            text: 'AI Image Generator',
            icon: <PenIcon />,
            color: 'blue'
        },
        {
            href: '/ai-hashtag-generator',
            text: 'AI Hashtag Generator',
            icon: <Hash />,
            color: 'purple' // AI tools are grouped by color
        },
        {
            href: '/photo-restorer',
            text: 'AI Photo Restorer',
            icon: <Sparkles />,
            color: 'yellow'
        },
        {
            href: '/image-compressor',
            text: 'Image Compressor',
            icon: <Minimize2 />,
            color: 'purple'
        },
    ];

    const colorClasses = {
        blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
        purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
        yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    };

    return (
        <aside className="flex flex-col gap-5">
            <div className="mx-auto w-full bg-white rounded-lg p-6 sm:p-10">
                <h3 className="text-lg font-bold mb-4 text-slate-900">
                    You might also like...
                </h3>
                <div className="flex flex-col gap-2">
                    {suggestedTools.map((tool) => (
                        <SidebarLink 
                            key={tool.href}
                            href={tool.href}
                            text={tool.text}
                            icon={tool.icon}
                            colorClass={colorClasses[tool.color]}
                        />
                    ))}
                </div>
            </div>
            
            {/* <div className="mx-auto w-full bg-white rounded-lg p-6 sm:p-10">
                <div className="w-full h-48 bg-slate-200 rounded-lg flex items-center justify-center">
                    <p className="text-slate-500 text-sm">Advertisement</p>
                </div>
            </div> */}
        </aside>
    );
}
