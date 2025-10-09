'use client';

import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaLink, FaTwitter } from "react-icons/fa";
import "../blog/blog.css";

export default function BlogShare({ url, title }) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="blog-theme flex flex-col items-center">
      <h3>
        Sharing is caring <span className="text-red-500">❤️</span>
      </h3>
      <div className="flex justify-center flex-wrap gap-4">
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          <FaLink />
          <span className="hidden sm:inline">Copy Link</span>
        </button>
        <WhatsappShareButton url={url} title={title}>
          <div className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
            <FaWhatsapp />
            <span className="hidden sm:inline">WhatsApp</span>
          </div>
        </WhatsappShareButton>
        <FacebookShareButton url={url} quote={title}>
          <div className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            <FaFacebookF />
            <span className="hidden sm:inline">Facebook</span>
          </div>
        </FacebookShareButton>
        <LinkedinShareButton url={url} title={title}>
          <div className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            <FaLinkedinIn />
            <span className="hidden sm:inline">LinkedIn</span>
          </div>
        </LinkedinShareButton>
        <TwitterShareButton url={url} title={title}>
          <div className="flex items-center gap-1 px-3 py-1 bg-sky-400 text-white rounded hover:bg-sky-500 transition">
            <FaTwitter />
            <span className="hidden sm:inline">Twitter</span>
          </div>
        </TwitterShareButton>
      </div>
    </div>
  );
}
