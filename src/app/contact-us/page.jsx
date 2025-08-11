import React from 'react';
import ContactPage from '../components/other/ContactPage'; // Adjust the import path based on your file structure

// SEO metadata for the Contact Us page
export const metadata = {
    title: 'Contact Us | File Tools 4U',
    description: "Get in touch with File Tools 4U. Send us your questions, feedback, or inquiries through our contact form. We'd love to hear from you.",
    keywords: 'contact, support, feedback, file tools 4u, contact us',
    alternates: {
        canonical: 'https://filetools4u.com/contact', // Replace with your actual domain
    },
};

// The page component that renders the contact form
export default function ContactUsPage() {
    return <ContactPage />;
}
