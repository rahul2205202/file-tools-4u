// app/blog/BlogMeta.tsx
'use client';

import React from "react";
import { Calendar, User } from "lucide-react";

const BLOG_AUTHOR = "Rahul Bodkhe";

export default function BlogMeta({ date }) {
  return (
    <div className="flex items-center gap-4 text-sm mb-4">
        <div className="flex items-center gap-1">
        <User className="w-4 h-4" />
        <span>{BLOG_AUTHOR}</span>
      </div>
      <div className="flex items-center gap-1">
        <Calendar className="w-4 h-4" />
        <span>{date}</span>
      </div>
    </div>
  );
}
