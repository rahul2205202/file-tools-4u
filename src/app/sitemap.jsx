export default function sitemap() {
  const baseUrl = 'https://filetools4u.com';

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
    '/ico-converter',
    '/contact-us',
    '/privacy-policy',
    '/terms-of-service',
  ];

  const routeUrls = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...routeUrls,
  ];
}
