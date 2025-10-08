'use client';

import React from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const baseTools = [
    '/image-compressor',
    '/generate-ai-image',
    '/image-to-pdf',
    '/photo-restorer',
    '/ai-figurine-creator',
    '/ai-hashtag-generator',
    '/ico-converter',
    '/webp-converter'
  ];

  const formatToolName = (path) => {
    return path
      .replace('/', '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <aside className="md:sticky md:top-22 md:self-start">
      <div className="w-full sm:w-80 md:w-85 bg-white rounded-lg p-6 sm:p-10">
        <h3 className="text-lg font-bold mb-5 text-slate-900 text-center">
          Explore Other Tools
        </h3>
        <div className="flex flex-col gap-3">
          {baseTools.map((tool) => (
            <Link
              key={tool}
              href={tool}
              className="block text-center border border-slate-300 rounded-lg py-2 px-4 text-slate-800 font-medium hover:bg-slate-50 transition-colors"
            >
              {formatToolName(tool)}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
