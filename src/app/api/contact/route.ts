import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { name, email, description } = await req.json();

        // Log to console for testing
        console.log("User Request:", { name, email, description });

        // NOTE: Integrate Resend or SendGrid here
        
        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
