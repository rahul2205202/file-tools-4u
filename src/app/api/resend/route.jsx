import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key from environment variables
    const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        // Parse the request body to get the form data
        const { name, email, subject, message } = await request.json();

        // Use Resend to send the email
        const { data, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>', // This is a required field for the free plan
            to: ['rahulbodkhe2205@gmail.com'], // <<< REPLACE WITH YOUR EMAIL ADDRESS
            subject: `New Message from ${name}: ${subject}`,
            reply_to: email, // Set the sender's email as the reply-to address
            html: `
                <p>You have received a new message from your website's contact form.</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        // If there was an error sending the email, return an error response
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Return a success response
        return NextResponse.json({ message: 'Email sent successfully!', data });

    } catch (error) {
        // Handle any other errors
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
