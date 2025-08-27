
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'All fields are required' 
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please enter a valid email address' 
        },
        { status: 400 }
      )
    }
    
    // Log the contact form submission
    console.log('Contact form submission received:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    })

    // In a real implementation, you would integrate with an email service here
    // Examples:
    // - Nodemailer with SMTP
    // - SendGrid API
    // - Resend API
    // - EmailJS
    
    // For now, we'll simulate sending the email
    const emailData = {
      to: 'dharaneeshc2006@gmail.com',
      from: email,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; overflow: hidden;">
          <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; color: white;">
            <h2 style="color: #fff; margin: 0 0 20px 0; font-size: 28px; font-weight: bold;">
              🎉 New Contact Form Submission
            </h2>
            <div style="background: rgba(255,255,255,0.9); color: #333; padding: 25px; border-radius: 8px; margin: 20px 0;">
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <span style="background: linear-gradient(45deg, #f97316, #ec4899); color: white; padding: 8px 12px; border-radius: 20px; font-size: 14px; margin-right: 15px;">👤</span>
                <div>
                  <strong style="color: #374151; font-size: 16px;">Name:</strong>
                  <p style="margin: 5px 0; font-size: 18px; color: #1f2937;">${name}</p>
                </div>
              </div>
              
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <span style="background: linear-gradient(45deg, #3b82f6, #8b5cf6); color: white; padding: 8px 12px; border-radius: 20px; font-size: 14px; margin-right: 15px;">📧</span>
                <div>
                  <strong style="color: #374151; font-size: 16px;">Email:</strong>
                  <p style="margin: 5px 0; font-size: 18px; color: #1f2937;">
                    <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                  </p>
                </div>
              </div>
              
              <div style="margin-top: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <span style="background: linear-gradient(45deg, #10b981, #06b6d4); color: white; padding: 8px 12px; border-radius: 20px; font-size: 14px; margin-right: 15px;">💬</span>
                  <strong style="color: #374151; font-size: 16px;">Message:</strong>
                </div>
                <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f97316; margin-left: 45px;">
                  <p style="margin: 0; line-height: 1.6; color: #374151; font-size: 16px;">${message.replace(/\n/g, '<br>')}</p>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}" style="background: linear-gradient(45deg, #f97316, #ec4899); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);">
                Reply to ${name}
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2); text-align: center;">
              <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0;">
                📅 Received on ${new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 10px 0 0 0;">
                Sent from Portfolio Contact Form • dharaneeshc2006@gmail.com
              </p>
            </div>
          </div>
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

    // Simulate successful email sending
    const success = Math.random() > 0.1; // 90% success rate for demo

    if (success) {
      return NextResponse.json(
        { 
          success: true, 
          message: '🎉 Message sent successfully! I will get back to you within 24 hours.',
          data: {
            name,
            email,
            timestamp: new Date().toISOString()
          }
        },
        { status: 200 }
      )
    } else {
      throw new Error('Email service temporarily unavailable')
    }
    
  } catch (error) {
    console.error('Contact form error:', {
      error: error.message,
      timestamp: new Date().toISOString(),
      stack: error.stack
    })
    
    return NextResponse.json(
      { 
        success: false, 
        message: '❌ Failed to send message. Please try again or contact me directly at dharaneeshc2006@gmail.com',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { 
      message: 'Contact API is working! Use POST method to send messages.',
      endpoints: {
        POST: '/api/contact - Send a contact message',
      }
    },
    { status: 200 }
  )
}
