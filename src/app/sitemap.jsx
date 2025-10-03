// This file should be placed in your /app directory.

export default function sitemap() {
  const baseUrl = 'https://filetools4u.com';

  // List all your tool and static pages
  const routes = [
    '/image-compressor',
    '/pdf-compressor',
    '/generate-ai-image',
    '/image-to-pdf',
    '/jpeg-to-png',
    '/jpeg-to-webp',
    '/png-to-jpeg',
    '/png-to-webp',
    '/photo-restorer',
    '/ai-figurine-creator',
    '/ai-hashtag-generator',
    '/webp-to-png',
    '/webp-to-jpeg',
    '/heic-to-jpeg',
    '/heic-to-png',
    '/webp-converter',
    '/contact-us',
    '/privacy-policy',
    '/terms-of-service',
  ];

  const routeUrls = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily', // How often the content is likely to change
    priority: 0.9, // Priority relative to other pages on your site
  }));

  return [
    // Add the homepage separately for the highest priority
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...routeUrls,
  ];
}
