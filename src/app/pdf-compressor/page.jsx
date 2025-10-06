import React from 'react';
import PdfCompressor from '../components/tools/PdfCompressor';

export const metadata = {
    title: 'Free PDF Compressor - Reduce PDF File Size Online | File Tools 4U',
    description: 'Compress large PDF files for free with File Tools 4U. Reduce the size of your PDFs by optimizing embedded images, making them easier to share and store.',
    keywords: 'pdf compressor, compress pdf, reduce pdf size, pdf optimizer, free pdf compression',
    alternates: {
        canonical: 'https://filetools4u.com/pdf-compressor',
    },
};

export default function PdfCompressorPage() {
    return <PdfCompressor />;
}
