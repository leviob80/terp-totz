import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    // Graceful no-op in dev so the UI still shows success
    return NextResponse.json({ success: true, dev: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    // Add to Resend audience if configured
    if (process.env.RESEND_AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: false,
      })
    }

    // Send welcome email
    await resend.emails.send({
      from: 'Terp Totz <noreply@terptotz.com>',
      to: email,
      subject: "You're on the drop list.",
      text: "You're in. We'll hit you when the next drop goes live. — Terp Totz",
      html: `
        <div style="font-family:monospace;max-width:560px;padding:32px;background:#0A0A0A;color:#F5EFE6;">
          <p style="color:#E85D04;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;margin-bottom:16px;">
            Drop List Confirmed
          </p>
          <h1 style="font-size:32px;font-weight:900;text-transform:uppercase;letter-spacing:0.02em;margin-bottom:16px;line-height:1.1;">
            You're in.
          </h1>
          <p style="color:rgba(245,239,230,0.6);line-height:1.6;margin-bottom:24px;">
            We'll hit you when the next Terp Totz drop goes live — new characters, restocks,
            and exclusives. No spam. Unsubscribe anytime.
          </p>
          <p style="color:rgba(245,239,230,0.4);font-size:11px;letter-spacing:0.15em;">
            — THE TERP TOTZ CREW
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter signup error:', err)
    return NextResponse.json({ error: 'Signup failed. Please try again.' }, { status: 500 })
  }
}
