import React from 'react';

// SEO metadata for the Privacy Policy page
export const metadata = {
    title: 'Privacy Policy | File Tools 4U',
    description: 'Read the Privacy Policy for File Tools 4U to understand how we handle your data and protect your privacy when you use our free online file conversion and compression tools.',
    alternates: {
        canonical: 'https://filetools4u.com/privacy-policy',
    },
};

export default function PrivacyPolicyPage() {
    return (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8 md:p-12">
            <h1 className="text-4xl font-bold text-black text-center mb-4">Privacy Policy</h1>
            <p className="text-center text-gray-500 mb-10">Last updated: August 25, 2025</p>

            <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                    Welcome to File Tools 4U ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our website and its services (collectively, the "Service").
                </p>

                <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Information We Do Not Collect</h2>
                <p>
                    We do not require user registration, and we do not collect any personal identifying information such as your name, email address, or physical address.
                </p>

                <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. File Handling and Security</h2>
                <p>
                    Your privacy and the security of your files are our highest priority.
                </p>
                <ul>
                    <li>
                        <strong>Temporary Processing:</strong> When you upload a file (e.g., an image or a PDF) for conversion, compression, or any other process, it is sent to our secure servers solely for the purpose of performing the requested action.
                    </li>
                    <li>
                        <strong>Automatic Deletion:</strong> All uploaded files are automatically and permanently deleted from our servers within a short period (typically one hour) after the processing is complete. We do not store, access, or share your files with any third parties.
                    </li>
                    <li>
                        <strong>Secure Connections:</strong> All file transfers are encrypted using SSL/TLS to ensure your data is protected in transit.
                    </li>
                </ul>

                <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. Usage Data and Analytics</h2>
                <p>
                    We may collect anonymous, non-personal information about your use of the Service to help us improve its functionality. This data is aggregated and may include:
                </p>
                <ul>
                    <li>The type of tool used (e.g., "PDF Compressor").</li>
                    <li>The number of files processed.</li>
                    <li>General error logs for troubleshooting purposes.</li>
                </ul>
                <p>
                    This data is completely anonymous and cannot be linked back to any individual user or specific file.
                </p>

                <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Cookies</h2>
                <p>
                    Our Service does not use cookies to track personal information. We may use essential cookies for basic site functionality, but these do not store any identifying data.
                </p>

                <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Third-Party Services</h2>
                <p>
                    Our AI Image Generator tool uses an external API (Google's Gemini). Prompts sent to this service are subject to the privacy policy of the respective provider. We do not send any personal information along with these requests.
                </p>

                <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Changes to This Privacy Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>

                <h2 className="text-2xl font-bold text-black mt-8 mb-4">7. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please feel free to contact us through our contact page.
                </p>
            </div>
        </div>
    );
}
