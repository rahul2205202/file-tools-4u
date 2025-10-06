import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend("kre_56Jp48xn_QKbTwKUfSUEHfWSoQ5T3AJLy");

export async function POST(request) {
    try {
        const { name, email, subject, message } = await request.json();

        const { data, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: ['rahulbodkhe2205@gmail.com'],
            subject: `New Message from ${name}: ${subject}`,
            reply_to: email,
            html: `
                <p>You have received a new message from your website's contact form.</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Email sent successfully!', data });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
