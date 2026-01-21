import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  if (!process.env.EMAIL_ADDRESS || !process.env.RESEND_API_KEY) {
    return NextResponse.json({ message: "Missing email address or API key" }, { status: 500 });
  }

  try {
    const { name, email, description } = await req.json();

    if (!name || !email || !description) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Hyperdrive Media <hello@hyperdrivemedia.co>', 
      to: [process.env.EMAIL_ADDRESS],
      replyTo: email,
      subject: `New Message from ${name}`,
      text: `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n\n${description}`,
    });

    if (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }
    
    return NextResponse.json({ message: "Email Successfully Sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
