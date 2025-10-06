import React from 'react';

export const metadata = {
    title: 'Terms and Conditions | File Tools 4U',
    description: 'Please read the Terms and Conditions for using the File Tools 4U website and its free online file conversion, compression, and creation tools.',
    alternates: {
        canonical: 'https://filetools4u.com/terms-of-service',
    },
};

export default function TermsOfServicePage() {
    return (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8 md:p-12">
            <h1 className="text-4xl font-bold text-black text-center mb-4">Terms and Conditions</h1>
            <p className="text-center text-gray-500 mb-10">Last updated: August 25, 2025</p>

            <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                    Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the File Tools 4U website (the "Service") operated by us.
                </p>
                <p>
                    Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service. By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                </p>

                <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Description of Service</h2>
                <p>
                    File Tools 4U provides a suite of free online tools for file manipulation, including but not limited to, image and PDF compression, file format conversion, and AI-powered image generation (collectively, the "Tools"). All files you upload are processed on our servers and are automatically deleted after a short period as described in our Privacy Policy.
                </p>

                <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. User Conduct and Responsibilities</h2>
                <p>
                    You agree not to use the Service to:
                </p>
                <ul>
                    <li>
                        Upload, process, or create any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.
                    </li>
                    <li>
                        Upload or process any files that infringe upon any patent, trademark, trade secret, copyright, or other proprietary rights of any party.
                    </li>
                    <li>
                        Transmit any material that contains software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware.
                    </li>
                    <li>
                        Attempt to interfere with or disrupt the Service or servers or networks connected to the Service.
                    </li>
                </ul>
                <p>
                    You are solely responsible for the content of the files you upload and process using our Service.
                </p>

                <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. Intellectual Property</h2>
                <p>
                    We claim no ownership rights over the files you upload to the Service. You retain any and all of your rights to any content you submit. The Service itself, including all original features, content, and functionality, is and will remain the exclusive property of File Tools 4U and its licensors.
                </p>

                <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Disclaimer of Warranties</h2>
                <p>
                    The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance. We do not warrant that the Service will function uninterrupted, secure, or available at any particular time or location.
                </p>

                <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Limitation of Liability</h2>
                <p>
                    In no event shall File Tools 4U, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>

                <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Changes to Terms</h2>
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms and Conditions on this page. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                </p>

                <h2 className="text-2xl font-bold text-black mt-8 mb-4">7. Governing Law</h2>
                <p>
                    These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>
            </div>
        </div>
    );
}
