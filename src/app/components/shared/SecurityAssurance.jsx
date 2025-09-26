'use client';

import React from 'react';
import Link from 'next/link';
// I'll use icons from lucide-react as in the example.
// Make sure you have it installed: npm install lucide-react
import { ShieldCheck, Server, Trash2 } from 'lucide-react';

export default function SecurityAssurance() {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        {/* Left Content - More concise */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Your Data, Our Priority
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-6">
            At <span className="font-semibold text-slate-800">File Tools 4U</span>, we
          prioritize the protection of your data at every step. From encrypted
          file transfers to hardened infrastructure, our platform is designed
          with enterprise-grade safeguards to keep your information private,
          secure, and always available.
          </p>
          <Link
            href="/privacy-policy"
            className="inline-block text-red-600 font-medium hover:text-red-700 transition-colors text-sm"
          >
            Read our Privacy Policy →
          </Link>
        </div>

        {/* Right Features - Smaller icons and more concise text */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-slate-800 font-semibold text-base">Secure Processing</h3>
              <p className="text-slate-500 text-sm">
                All files are protected with industry-standard TLS encryption during transfer.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
             <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Server className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-slate-800 font-semibold text-base">Private Infrastructure</h3>
              <p className="text-slate-500 text-sm">
                Your files are processed on secure cloud infrastructure and are never shared.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
             <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-slate-800 font-semibold text-base">
                Automatic File Deletion
              </h3>
              <p className="text-slate-500 text-sm">
                We respect your privacy. All uploaded files are automatically deleted from our servers after one hour.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

