import React from "react";
import IcoConverter from "../components/tools/IcoConverter";

export const metadata = {
  title: "Free ICO Converter Online | Convert PNG, JPG to ICO Favicon | File Tools 4U",
  description:
    "Convert PNG, JPG, or JPEG images to ICO format online for free. Create favicons easily with our ICO Generator tool — fast, secure, and watermark-free.",
  keywords:
    "ico converter, ico generator online, icon converter png, icon converter online, favicon generator, png to ico converter, jpg to ico, create favicon online, free icon converter, ico size 512x512",
  alternates: {
    canonical: "https://filetools4u.com/ico-converter",
  },
  openGraph: {
    title: "Free ICO Converter | Convert PNG, JPG to ICO Favicon Online",
    description:
      "Create a favicon instantly! Convert PNG or JPG to ICO format online — free, fast, and easy with File Tools 4U.",
    url: "https://filetools4u.com/ico-converter",
    siteName: "File Tools 4U",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free ICO Converter Online | PNG to ICO | File Tools 4U",
    description:
      "Instantly convert PNG or JPG images to ICO format. Create favicons online for free — quick and secure image-to-icon tool by File Tools 4U.",
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

export default function IcoConverterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free ICO Converter Online | Convert PNG, JPG to ICO",
    url: "https://filetools4u.com/ico-converter",
    description:
      "Convert images like PNG and JPG to ICO format online. Create favicons instantly with File Tools 4U — free and privacy-friendly.",
    publisher: {
      "@type": "Organization",
      name: "File Tools 4U",
      url: "https://filetools4u.com",
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "ICO Converter",
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
      <IcoConverter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
