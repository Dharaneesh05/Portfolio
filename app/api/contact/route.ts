import { NextRequest, NextResponse } from 'next/server'

// You can use services like EmailJS, SendGrid, or Resend for production
// For now, this simulates email sending
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
    console.log('📧 New Contact Form Submission:')
    console.log('==========================================')
    console.log(`👤 Name: ${name}`)
    console.log(`📧 Email: ${email}`)
    console.log(`💬 Message: ${message}`)
    console.log(`⏰ Time: ${new Date().toISOString()}`)
    console.log('==========================================')

    // Here you would integrate with an email service:
    /*
    Example with Resend:

    import { Resend } from 'resend'
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'contact@yoursite.com',
      to: 'dharaneeshc2006@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    })
    */

    // Example with EmailJS (client-side integration):
    /*
    You can also use EmailJS from the frontend:
    1. Install: npm install @emailjs/browser
    2. Import: import emailjs from '@emailjs/browser'
    3. Send: emailjs.send('service_id', 'template_id', templateParams, 'public_key')
    */

    // For demonstration, simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In production, you should also save to a database
    // Example with a simple JSON file or database:
    /*
    const fs = require('fs')
    const contactData = {
      id: Date.now(),
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    }

    // Save to file (for development only)
    const contacts = JSON.parse(fs.readFileSync('contacts.json', 'utf8') || '[]')
    contacts.push(contactData)
    fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 2))
    */

    return NextResponse.json({
      success: true,
      message: `Thank you ${name}! Your message has been sent successfully. I'll get back to you at ${email} within 24 hours.`
    })
  } catch (error) {
    console.error('❌ Contact form error:', error)
    return NextResponse.json({
      success: false,
      message: 'There was an error sending your message. Please try again or contact me directly at dharaneeshc2006@gmail.com'
    }, { status: 500 })
  }
}