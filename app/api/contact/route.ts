import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Here you would typically integrate with an email service like:
    // - Resend
    // - SendGrid
    // - Nodemailer
    // - EmailJS

    // For now, we'll simulate sending an email
    const emailData = {
      to: "dharaneeshc2006@gmail.com",
      from: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316;">New Contact Form Submission</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #f97316;">
            <h3>Message:</h3>
            <p style="line-height: 1.6;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #666;">This message was sent from your portfolio website contact form.</p>
          </div>
        </div>
      `,
    }

    // Log the email data (in production, you'd send the actual email)
    console.log("Email would be sent:", emailData)

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ success: false, message: "Failed to send message" }, { status: 500 })
  }
}
