
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Here you would integrate with an email service like:
    // - Nodemailer with Gmail SMTP
    // - SendGrid
    // - Resend
    // - EmailJS
    
    // For now, we'll simulate sending an email
    // In a real implementation, you would configure your email service
    
    console.log('Contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    })

    // Simulate email sending
    const emailData = {
      to: 'dharaneeshc2006@gmail.com',
      from: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #f97316;">
              ${message}
            </div>
          </div>
          <p style="color: #666; font-size: 14px;">
            This message was sent from your portfolio contact form on ${new Date().toLocaleString()}
          </p>
        </div>
      `
    }

    // Here you would actually send the email using your preferred service
    // Example with Nodemailer (you'd need to install and configure it):
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
    
    await transporter.sendMail(emailData);
    */

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully! I will get back to you soon.' 
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send message. Please try again or contact me directly.' 
      },
      { status: 500 }
    )
  }
}
