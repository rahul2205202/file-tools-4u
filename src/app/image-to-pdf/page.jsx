import React from "react";
import ImageToPdfConverter from "../components/tools/ImageToPdfConverter";

export const metadata = {
  title: "Free Image to PDF Converter | Convert JPG, PNG to PDF Online | File Tools 4U",
  description:
    "Convert images to PDF for free! Easily merge multiple JPG, PNG, or JPEG files into one high-quality PDF document. Fast, secure, and no watermark — powered by File Tools 4U.",
  keywords:
    "image to pdf, jpg to pdf, png to pdf, jpeg to pdf, convert images to pdf, combine images, merge images, online pdf converter, free pdf tool, photo to pdf converter",
  alternates: {
    canonical: "https://filetools4u.com/image-to-pdf",
  },
  openGraph: {
    title: "Free Image to PDF Converter | Convert JPG, PNG to PDF Online | File Tools 4U",
    description:
      "Merge multiple images (JPG, PNG, JPEG) into a single PDF instantly. 100% free, online, and privacy-focused — File Tools 4U makes PDF conversion easy.",
    url: "https://filetools4u.com/image-to-pdf",
    siteName: "File Tools 4U",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert Images to PDF Free | File Tools 4U",
    description:
      "Quickly turn your JPG, PNG, or JPEG images into one PDF file. Fast, free, and secure image-to-PDF converter by File Tools 4U.",
    creator: "@filetools4u",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function ImageToPdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free Image to PDF Converter",
    url: "https://filetools4u.com/image-to-pdf",
    description:
      "Convert JPG, PNG, or JPEG images into a single PDF file instantly for free with File Tools 4U.",
    publisher: {
      "@type": "Organization",
      name: "File Tools 4U",
      url: "https://filetools4u.com",
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Image to PDF Converter",
      operatingSystem: "Any",
      applicationCategory: "UtilityApplication",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  };

  return (
    <>
      <ImageToPdfConverter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
