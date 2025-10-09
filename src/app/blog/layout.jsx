// app/blog/layout.jsx
import React from "react";
import '../blog/blog.css';

export const metadata = {
  title: "Our Blog - FileTools4U",
  description: "Latest updates and tutorials from FileTools4U",
};

export default function BlogLayout({ children }) {
  return (
    <div className="blog-theme selection:bg-red-200 selection:text-red-900 min-h-screen rounded-lg bg-white">
      <div className="container mx-auto flex flex-col md:flex-row px-5 py-5 gap-8">
        <section className="flex-1">{children}</section>
      </div>
    </div>
  );
}
