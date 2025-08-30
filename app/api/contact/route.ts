import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({
        success: false,
        message: 'All fields are required.'
      }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: 'Please enter a valid email address.'
      }, { status: 400 })
    }

    // Log the contact form submission
    console.log('New Contact Form Submission:')
    console.log('==========================================')
    console.log(`Name: ${name}`)
    console.log(`Email: ${email}`)
    console.log(`Message: ${message}`)
    console.log(`Time: ${new Date().toISOString()}`)
    console.log('==========================================')

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set')
      return NextResponse.json({
        success: false,
        message: 'Email service is not configured. Please contact me directly at dharaneeshc2006@gmail.com'
      }, { status: 500 })
    }

    // Integrate with Resend email service
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Use a verified domain email address for 'from' field
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    
    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: 'dharaneeshc2006@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      `,
      replyTo: email
    })
     
    // Log successful submission
    console.log('Contact form submission processed successfully')
    console.log('Email response:', emailResponse)

    return NextResponse.json({
      success: true,
      message: `Thank you ${name}! Your message has been sent successfully. I'll get back to you at ${email} within 24 hours.`
    })
  } catch (error) {
    console.error('Contact form error:', error)
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack)
    }
    return NextResponse.json({
      success: false,
      message: 'There was an error sending your message. Please try again or contact me directly at dharaneeshc2006@gmail.com'
    }, { status: 500 })
  }
}
