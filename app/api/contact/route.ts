
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Create a transporter (for demo purposes, using console log)
    // In production, you would use a real email service
    console.log('Email received:')
    console.log('From:', name, '(' + email + ')')
    console.log('Message:', message)
    console.log('---')

    // Simulate email sending
    const emailContent = {
      to: 'dharaneeshc2006@gmail.com',
      from: email,
      subject: `New message from ${name} - Portfolio Contact`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    }

    // Log the email content (in production, you would actually send the email)
    console.log('Email Content:', emailContent)

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
