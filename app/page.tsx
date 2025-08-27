
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import Image from 'next/image'

export default function Home() {
  const [theme, setTheme] = useState('dark')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeTechFilter, setActiveTechFilter] = useState([])
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [showChatModal, setShowChatModal] = useState(false)
  const [stats, setStats] = useState({ projects: 0, years: 0, clients: 0, certifications: 0, intern: 0, leetcode: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showStartupPopup, setShowStartupPopup] = useState(false)

  useEffect(() => {
    // Check if the user has already seen the startup popup
    const hasSeenPopup = localStorage.getItem('hasSeenPopup')
    if (!hasSeenPopup) {
      setShowStartupPopup(true)
      localStorage.setItem('hasSeenPopup', 'true')
    }
  }, [])

  const [experienceFilter, setExperienceFilter] = useState('All')
  const [recentActivities] = useState([
    { 
      action: 'Pushed to resume-frontend', 
      time: '2 hours ago', 
      type: 'github',
      platform: 'GitHub',
      description: 'Added new AI model integration for better resume analysis'
    },
    { 
      action: 'Shared article', 
      time: '1 day ago', 
      type: 'linkedin',
      platform: 'LinkedIn',
      description: 'Deep Learning in Web Development: A Practical Guide'
    },
    { 
      action: 'Created new repository', 
      time: '3 days ago', 
      type: 'github',
      platform: 'GitHub',
      description: 'AI-powered task management system with React and Python'
    },
    { 
      action: 'Project completed', 
      time: '1 week ago', 
      type: 'project',
      platform: 'Work',
      description: 'Successfully delivered e-commerce platform with 99.9% uptime'
    },
    { 
      action: 'New certification earned', 
      time: '2 weeks ago', 
      type: 'achievement',
      platform: 'Learning',
      description: 'Advanced AI/ML certification from Stanford University completed'
    }
  ])
  
  const { toast } = useToast()

  useEffect(() => {
    document.documentElement.className = theme
    
    // Enhanced smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth'
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
      
      // Update active section based on scroll position with improved logic
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'demo', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }
    
    // Throttle scroll events for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    
    // Animate stats counter with stagger effect
    const timer = setTimeout(() => {
      setStats({ projects: 5, years: 3, clients: 10, certifications: 3, intern: 2, leetcode: 250 })
    }, 1500)

    // Remove the old timer for showing the startup popup

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
      clearTimeout(timer)
    }
  }, [theme, activeSection])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    toast({
      title: `Switched to ${newTheme} mode`,
      description: `You are now using ${newTheme} theme`,
    })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    toast({
      title: "Scrolled to top",
      description: "Welcome back to the top of the page!",
    })
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    
    // Enhanced validation
    if (!contactForm.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name",
        variant: "destructive",
      })
      return
    }
    
    if (!contactForm.email.trim()) {
      toast({
        title: "Email required", 
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contactForm.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }
    
    if (!contactForm.message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter your message",
        variant: "destructive",
      })
      return
    }

    if (contactForm.message.trim().length < 10) {
      toast({
        title: "Message too short",
        description: "Please write a more detailed message (at least 10 characters)",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactForm.name.trim(),
          email: contactForm.email.trim(),
          message: contactForm.message.trim()
        })
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        toast({
          title: "Message sent successfully!",
          description: result.message || "Thank you for reaching out. I'll get back to you within 24 hours!",
        })
        setContactForm({ name: '', email: '', message: '' })
        
        // Show additional confirmation
        setTimeout(() => {
          toast({
            title: "Email notification sent",
            description: "You should receive a confirmation email shortly",
          })
        }, 2000)
        
      } else {
        throw new Error(result.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again or contact me directly at dharaneeshc2006@gmail.com",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return
    
    const userMessage = chatInput
    setChatMessages(prev => [...prev, { type: 'user', content: userMessage }])
    setChatInput('')
    
    // Enhanced AI responses with better natural language processing
    setTimeout(() => {
      const lowerMessage = userMessage.toLowerCase()
      let aiResponse = ""
      
      // Enhanced response logic with more comprehensive coverage
      if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
        aiResponse = "I've developed several innovative projects including: \n• AI Resume Analyzer & Builder with real-time analytics\n• SmartFit AI chatbot for reducing online shopping returns\n• Full-stack portfolio website with integrated AI assistant\n• E-commerce platforms and machine learning models\n\nCheck out my Projects section for detailed case studies and live demos!"
      } 
      else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
        aiResponse = "My technical expertise includes:\n\nFrontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion\nBackend: Node.js, Python, Flask, Express.js, REST APIs\nAI/ML: TensorFlow, PyTorch, NLP, Computer Vision, Data Analysis\nDatabases: MongoDB, PostgreSQL, SQL, Database Design\nTools: Git, Docker, AWS, Vercel, Postman\n\nI'm constantly learning and expanding my skill set!"
      }
      else if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('career')) {
        aiResponse = "I have 3+ years of experience in software development with:\n\n• Internships at TechNest (Full Stack) and DevNest (AI Development)\n• Multiple certifications in MongoDB, Oracle APEX, and Java\n• Experience with both startup environments and enterprise projects\n• Strong background in both technical development and problem-solving\n\nMy experience spans from AI/ML research to production-ready web applications."
      }
      else if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('available') || lowerMessage.includes('opportunity')) {
        aiResponse = "I'm currently available for:\n\n• Full-time software engineering roles\n• Freelance projects and consulting\n• AI/ML development opportunities\n• Full-stack web development projects\n\nYou can reach me via:\n📧 Email: dharaneeshc2006@gmail.com\n📱 Phone: +91 9345450445\n💼 LinkedIn: linkedin.com/in/dharaneesh-c\n\nFeel free to use the contact form below for detailed discussions!"
      }
      else if (lowerMessage.includes('education') || lowerMessage.includes('college') || lowerMessage.includes('degree')) {
        aiResponse = "I'm currently pursuing my studies at Kongu Engineering College, where I'm deepening my knowledge in computer science and artificial intelligence. My academic background provides a strong foundation in both theoretical concepts and practical applications of modern technology."
      }
      else if (lowerMessage.includes('resume') || lowerMessage.includes('cv') || lowerMessage.includes('download')) {
        aiResponse = "You can view and download my resume directly from the website! Look for the 'View Resume' or 'Download Resume' buttons in the hero section. My resume includes detailed information about my education, experience, skills, and projects."
      }
      else if (lowerMessage.includes('github') || lowerMessage.includes('code') || lowerMessage.includes('repository')) {
        aiResponse = "You can explore my code repositories on GitHub: github.com/Dharaneesh05\n\nMy GitHub includes:\n• Complete project source code\n• AI/ML implementations\n• Web development projects\n• Open-source contributions\n• Learning resources and experiments"
      }
      else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        aiResponse = "Hello! 👋 I'm Dharaneesh's AI assistant. I'm here to help you learn more about his skills, projects, and experience. Feel free to ask me anything about his work or how you can collaborate with him!"
      }
      else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        aiResponse = "You're welcome! 😊 I'm glad I could help. If you have any more questions about Dharaneesh's work or if you'd like to discuss potential opportunities, feel free to ask!"
      }
      else {
        aiResponse = "That's an interesting question! While I'm specifically designed to discuss Dharaneesh's professional background, skills, and projects, I'd be happy to help with any related topics. You might want to ask about:\n\n• His technical skills and expertise\n• Previous projects and case studies\n• Professional experience and education\n• How to contact or collaborate with him\n• Viewing his portfolio and GitHub repositories"
      }
      
      setChatMessages(prev => [...prev, { type: 'ai', content: aiResponse }])
    }, 800) // Slightly faster response time
    
    toast({
      title: "Message received",
      description: "I'm processing your question...",
    })
  }

  const skills = [
    { name: 'React/Next.js', level: 95, color: '#61DAFB' },
    { name: 'Python', level: 85, color: '#3776AB' },
    { name: 'AI/Machine Learning', level: 90, color: '#FF6B6B' },
    { name: 'Node.js', level: 85, color: '#339933' },
    { name: 'Java', level: 87, color: '#336791' },
    { name: 'Database Design & Management', level: 80, color: '#4285F4' },
    { name: 'JavaScript/TypeScript', level: 80, color: '#4285F4' },
    { name: 'Flutter', level: 75, color: '#4285F4' }
  ] 

  const projects = [
    {
      id: 1,
      title: 'Resume Analyzer & Builder',
      description: 'A comprehensive dashboard leveraging AI for resume analysis and building, featuring real-time data visualization, predictive analytics, job suggestions based on user profiles, and integrated job search functionality. Utilizes MongoDB for storing user data and analytics, providing actionable insights for career advancement and business intelligence.',
      image: 'placeholder.png',
      tags: ['AI', 'React', 'Python', 'TensorFlow','MongoDB','Dashboard'],
      category: 'AI',
      demo: 'https://resume-frontend3.vercel.app/',
      github: 'https://github.com/Dharaneesh05/AI-powered-resume-analyzer-builder.git'
    },
    {
      id: 2,
      title: 'Personal Portfolio',
      description: 'A full-stack personal portfolio website showcasing projects and skills, with an integrated AI-powered chatbot for interactive user queries. Includes features like dynamic content rendering, theme switching, and seamless navigation, demonstrating expertise in building responsive and engaging web applications.',
      image: 'port.png',
      tags: ['Full Stack', 'React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'Full Stack',
      demo: 'https://port2-ochre.vercel.app/',
      github: 'https://github.com/Dharaneesh05/port2.git'
    },
    {
      id: 3,
      title: 'SmartFit',
      description: 'An AI-powered chatbot designed to reduce online shopping returns due to loose or tight fits in clothes and footwear. Employs natural language processing for user queries, YOLO for object detection, OpenCV for image processing, and MediaPipe for body measurement analysis, providing personalized recommendations to improve fit accuracy and reduce returns by up to 30%.',
      image: 'SmartFit.png',
      tags: ['AI', 'Python', 'NLP', 'Flask', 'Machine Learning','YOLO','OpenCV','MediaPipe'],
      category: 'AI',
      demo: 'https://smartfitdeploy2-1.onrender.com/',
      github: 'https://github.com/Dharaneesh05/smartfitdeploy2.git'
    }
  ]

  const experienceData = [
    {
      id: 1,
      company: 'TechNest',
      role: 'Full Stack Developer Intern',
      duration: 'Jan 2024 - Apr 2024',
      type: 'internship',
      description: 'Developed web applications using React and Node.js, collaborated with senior developers on enterprise projects, and implemented RESTful APIs.',
      certificate: '/resume.pdf',
      skills: ['React', 'Node.js', 'MongoDB', 'API Development']
    },
    {
      id: 2,
      company: 'DevNest',
      role: 'AI Developer Intern',
      duration: 'Aug 2025 - Sep 2025',
      type: 'internship',
      description: 'Worked on machine learning projects, implemented AI models for data analysis and prediction, and contributed to research initiatives.',
      certificate: '/resume.pdf',
      skills: ['Python', 'TensorFlow', 'Machine Learning', 'Data Analysis']
    },
    {
  id: 4,
  company: 'MongoDB',
  role: 'MongoDB Associate Developer',
  duration: '2025',
  type: 'certification',
  description: 'Certification focused on MongoDB fundamentals, including data modeling, querying, and integration with web applications.',
  certificate: '/certificates/mongodb-associate.pdf',
  skills: ['MongoDB', 'Data Modeling', 'Query Optimization']
},
{
  id: 5,
  company: 'Oracle',
  role: 'Apex Cloud Developer',
  duration: '2025',
  type: 'certification',
  description: 'Certification covering Oracle APEX for cloud-based application development, including database management and UI design.',
  certificate: '/certificates/oracle-apex.pdf',
  skills: ['Oracle APEX', 'Cloud Development', 'Database Management']
},
{
  id: 6,
  company: 'Oracle',
  role: 'Java Software Development Engineer',
  duration: '2025',
  type: 'certification',
  description: 'Certification in Java development focusing on object-oriented programming, APIs, and software engineering principles.',
  certificate: '/certificates/java-sde.pdf',
  skills: ['Java', 'OOP', 'API Development']
}
  ]

  const technologies = [
    'React', 'Python', 'Node.js', 'AI', 'Machine Learning', 'MongoDB', 'PostgreSQL', 
    'TensorFlow', 'Flask', 'Express', 'API', 'Dashboard'
  ]

  const categories = ['All', 'AI', 'Full Stack']

  const filteredProjects = projects.filter(project => {
    const categoryMatch = activeFilter === 'All' || project.category === activeFilter
    const techMatch = activeTechFilter.length === 0 || activeTechFilter.some(tech => project.tags.includes(tech))
    return categoryMatch && techMatch
  })

  const filteredExperience = experienceData.filter(item => {
    if (experienceFilter === 'All') return true
    if (experienceFilter === 'Internships') return item.type === 'internship'
    if (experienceFilter === 'Certifications') return item.type === 'certification'
    return true
  })

  const handleTechFilter = (tech) => {
    setActiveTechFilter(prev => {
      const newFilter = prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
      
      toast({
        title: prev.includes(tech) ? "Filter removed" : "Filter applied",
        description: `${tech} ${prev.includes(tech) ? 'removed from' : 'added to'} filters`,
      })
      
      return newFilter
    })
  }

  const clearFilters = () => {
    setActiveFilter('All')
    setActiveTechFilter([])
    toast({
      title: "Filters cleared",
      description: "Showing all projects",
    })
  }

  const handleProjectAction = (action, title) => {
    toast({
      title: `${action} ${title}`,
      description: action === 'Opened' ? "Opening in new tab..." : "Redirecting to GitHub...",
    })
  }

  const AnimatedSection = ({ children, className = "" }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, threshold: 0.1 })
    const controls = useAnimation()

    useEffect(() => {
      if (isInView) {
        controls.start('visible')
      }
    }, [isInView, controls])

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
        }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'AI Demo', href: '#demo' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900'
    }`}>
      <Toaster />

      {/* Startup Popup */}
      <Dialog open={showStartupPopup} onOpenChange={setShowStartupPopup}>
        <DialogContent className="max-w-md gradient-card border border-orange-500/20">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold gradient-text">
              Ready to work together?
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-6 py-4">
            <p className="text-gray-300">
              Let's discuss your next project and bring your ideas to life with cutting-edge technology!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => {
                  setShowStartupPopup(false)
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  toast({
                    title: "Let's connect!",
                    description: "Scrolling to contact section",
                  })
                }}
                className="gradient-primary text-white flex-1 hover-glow"
              >
                Contact Me
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowStartupPopup(false)}
                className="flex-1 border-orange-500/30 text-orange-300 hover:bg-orange-500/10"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Enhanced Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        theme === 'dark' 
          ? 'bg-black/95 backdrop-blur-xl border-b border-gray-800/50 shadow-lg shadow-black/10' 
          : 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-900/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.a
              href="#home"
              className="text-2xl md:text-3xl font-bold font-sans"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('home')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                })
              }}
            >
              <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                Dharaneesh C
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`nav-link transition-all duration-300 px-3 py-2 rounded-lg font-medium ${
                    activeSection === item.href.substring(1) 
                      ? 'text-orange-500 font-semibold bg-orange-500/10 shadow-sm' 
                      : theme === 'dark' 
                        ? 'text-gray-300 hover:text-orange-500 hover:bg-gray-800/50' 
                        : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                  whileHover={{ y: -2, scale: 1.05 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(item.href.substring(1))?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    })
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="btn-primary hidden sm:inline-flex shadow-lg"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    })
                    toast({
                      title: "Let's connect!",
                      description: "Scrolling to contact section",
                    })
                  }}
                >
                  <span className="mr-2"></span>
                  Hire Me
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.1, rotate: 180 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'hover:bg-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/20' 
                      : 'hover:bg-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/20'
                  }`}
                >
                  <span className="text-xl">
                    {theme === 'dark' ? '🔆' : '🌙'}
                  </span>
                </Button>
              </motion.div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2 hover:scale-110 transition-transform"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <motion.span
                  animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl"
                >
                  {mobileMenuOpen ? '✕' : '☰'}
                </motion.span>
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          <motion.div
            className={`md:hidden overflow-hidden ${
              theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'
            } backdrop-blur-xl rounded-2xl mx-4 mb-4 ${mobileMenuOpen ? 'shadow-2xl' : ''}`}
            animate={{ 
              maxHeight: mobileMenuOpen ? 500 : 0,
              opacity: mobileMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="py-4 space-y-2">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`block py-3 px-4 rounded-lg transition-all duration-300 font-medium ${
                    activeSection === item.href.substring(1) 
                      ? 'text-orange-500 font-semibold bg-gradient-to-r from-orange-500/10 to-purple-500/10 border-l-4 border-orange-500' 
                      : theme === 'dark' 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-orange-500' 
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-500'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileMenuOpen(false)
                    setTimeout(() => {
                      document.getElementById(item.href.substring(1))?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      })
                    }, 300)
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                className="pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: mobileMenuOpen ? 1 : 0 }}
                transition={{ delay: navigation.length * 0.1 }}
              >
                <Button 
                  className="btn-primary w-full"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      })
                    }, 300)
                  }}
                >
                  <span className="mr-2">💼</span>
                  Hire Me
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Enhanced Hero Section with Animations */}
      <section id="home" className={`min-h-screen flex items-center justify-center px-4 md:px-8 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-black via-gray-900 to-indigo-900' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
      }`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-10">
          {/* Left Content with Enhanced Animations */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated Welcome Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative mb-4"
            >
              <motion.p
                className="text-purple-500 text-lg md:text-xl mb-2 mt-12 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Hi, I am
              </motion.p>
            </motion.div>
            
            {/* Animated Name */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-sans leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                Dharaneesh C
              </span>
            </motion.h1>

            {/* Animated Subtitle */}
            <motion.h2
              className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">
                Full Stack & AI Developer
              </span>
            </motion.h2>
            
            {/* Animated Description */}
            <motion.p
              className={`text-lg md:text-xl mb-8 max-w-2xl leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Building innovative web solutions and AI-powered applications with modern technologies and creative problem-solving.
            </motion.p>
            
            {/* Enhanced Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="btn-primary"
                  onClick={() => {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                    toast({
                      title: "Viewing Projects",
                      description: "Check out my latest work!",
                    })
                  }}
                >
                  View Projects
                </Button>
              </motion.div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="btn-secondary">
                      View Resume
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>Resume - Dharaneesh C</DialogTitle>
                  </DialogHeader>
                  <iframe
                    src="/resume.pdf"
                    className="w-full h-full rounded-lg"
                    title="Resume"
                  />
                </DialogContent>
              </Dialog>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  className="btn-outline"
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = '/resume.pdf'
                    link.download = 'Dharaneesh_Resume.pdf'
                    link.click()
                    toast({
                      title: "Resume Downloaded",
                      description: "Thank you for your interest!",
                    })
                  }}
                >
                  Download Resume
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Social Links with Icons */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover-glow flex items-center gap-2"
                  onClick={() => {
                    window.open('https://github.com/Dharaneesh05', '_blank')
                    toast({
                      title: "Opening GitHub",
                      description: "Check out my code repositories",
                    })
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover-glow flex items-center gap-2"
                  onClick={() => {
                    window.open('https://www.linkedin.com/in/dharaneesh-c/', '_blank')
                    toast({
                      title: "Opening LinkedIn",
                      description: "Let's connect professionally",
                    })
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Animated Stats Cards */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              {[
                { label: 'Projects', value: stats.projects, color: 'from-blue-500 to-blue-600' },
                { label: 'Certifications', value: stats.certifications, color: 'from-green-500 to-green-600' },
                { label: 'Internships', value: stats.intern, color: 'from-purple-500 to-purple-600' },
                { label: 'Leetcode Problems solved', value: stats.leetcode, color: 'from-orange-500 to-orange-600' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={`card-professional p-4 text-center bg-gradient-to-r ${stat.color} text-white relative overflow-hidden`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="relative z-10">
                    <motion.div 
                      className="text-2xl font-bold mb-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 + index * 0.1 }}
                    >
                      {stat.value}+
                    </motion.div>
                    <p className="text-sm opacity-90">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Profile Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated Background Elements */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 rounded-full opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full opacity-30"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Profile Image Container */}
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gradient-to-r from-orange-500 via-purple-500 to-blue-500 shadow-2xl"
                animate={{ 
                  y: [0, -10, 0],
                  boxShadow: [
                    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    '0 25px 50px -12px rgba(249, 115, 22, 0.4)',
                    '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  ]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/placeholder-user.jpg"
                  alt="Dharaneesh C"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-blue-500/20"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedSection>
        <section id="about" className={`py-16 px-4 md:px-8 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'
        }`}>
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-orange-500 to-purple-500 text-transparent bg-clip-text">
                About Me
              </span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className={`text-lg md:text-xl mb-6 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  I am a passionate Full Stack and AI Developer, skilled in crafting innovative, user-friendly solutions using modern web technologies and AI. With expertise in frontend and backend development, I build scalable applications with impactful features. Currently, I am studying at Kongu Engineering College, enhancing my skills through academic projects and hands-on experience.
                </p>
                <p className={`text-lg md:text-xl mb-8 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                 With a strong foundation in both frontend and backend development, I specialize in building scalable web applications and implementing AI-powered features that drive business value.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ul className="space-y-4">
                  {[
                    'Full Stack Web Development',
                    'AI/ML Model Development',
                    'API Design & Integration',
                    'Database Architecture',
                    'Cloud Deployment'
                  ].map((item, index) => (
                    <motion.li
                      key={item}
                      className={`flex items-center text-lg ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Enhanced Skills Section */}
      <AnimatedSection>
        <section id="skills" className={`py-16 px-4 md:px-8 ${
          theme === 'dark' ? 'bg-black' : 'bg-white'
        }`}>
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                Skills & Expertise
              </span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className={`card-professional p-6 animate-pulse-glow ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-slate-50'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{skill.name}</h3>
                      <p className="text-orange-500 font-medium">{skill.level}%</p>
                    </div>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 2, delay: index * 0.2, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection>
        <section id="projects" className={`py-16 px-4 md:px-8 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'
        }`}>
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
                Featured Projects
              </span>
            </motion.h2>

            <motion.p
              className={`text-center text-lg mb-12 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore my collection of {projects.length} innovative projects spanning AI, Full Stack
            </motion.p>
            
            {/* Filter Section */}
            <motion.div
              className="space-y-6 mb-12"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => {
                      setActiveFilter(category)
                      toast({
                        title: `Filter: ${category}`,
                        description: `Showing ${category === 'All' ? 'all' : category} projects`,
                      })
                    }}
                    className={`filter-button ${activeFilter === category ? 'active' : ''}`}
                    variant={activeFilter === category ? 'default' : 'outline'}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Technology Filters */}
              <div className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-4"
                  onClick={() => {
                    const techSection = document.getElementById('tech-filters')
                    if (techSection) {
                      techSection.style.display = techSection.style.display === 'none' ? 'block' : 'none'
                    }
                  }}
                >
                  Technology Filters
                </Button>
                
                <div id="tech-filters" style={{ display: 'none' }} className="space-y-4">
                  <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                    {technologies.map((tech) => (
                      <Badge
                        key={tech}
                        onClick={() => handleTechFilter(tech)}
                        className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                          activeTechFilter.includes(tech)
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900'
                        }`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  {(activeFilter !== 'All' || activeTechFilter.length > 0) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-red-500 hover:text-red-600"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Projects Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="project-card hover-lift"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="project-image w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className={`mb-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className={`${
                            tagIndex % 3 === 0 ? 'bg-blue-100 text-blue-800' :
                            tagIndex % 3 === 1 ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="btn-primary flex-1"
                        onClick={() => {
                          window.open(project.demo, '_blank')
                          handleProjectAction('Opened', project.title)
                        }}
                      >
                        Live Demo
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          window.open(project.github, '_blank')
                          handleProjectAction('Viewed', project.title)
                        }}
                      >
                        GitHub
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-xl text-gray-500 mb-4">No projects found with current filters</p>
                <Button onClick={clearFilters} className="btn-primary">
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* Enhanced Experience Section with Certificate Viewer */}
      <AnimatedSection>
        <section id="experience" className={`py-16 px-4 md:px-8 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-slate-100'
        }`}>
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text">
                Experience & Certifications
              </span>
            </motion.h2>
            
            {/* Filter Buttons */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    setExperienceFilter('All')
                    toast({ title: "Showing All", description: "Displaying all experience and certifications" })
                  }}
                  className={`btn-secondary ${experienceFilter === 'All' ? 'active' : ''}`}
                  variant={experienceFilter === 'All' ? 'default' : 'outline'}
                >
                  All
                </Button>
                <Button
                  onClick={() => {
                    setExperienceFilter('Internships')
                    toast({ title: "Internships", description: "Showing internship experience" })
                  }}
                  className={experienceFilter === 'Internships' ? 'active' : ''}
                  variant={experienceFilter === 'Internships' ? 'default' : 'outline'}
                >
                  Internships
                </Button>
                <Button
                  onClick={() => {
                    setExperienceFilter('Certifications')
                    toast({ title: "Certifications", description: "Showing certifications" })
                  }}
                  className={experienceFilter === 'Certifications' ? 'active' : ''}
                  variant={experienceFilter === 'Certifications' ? 'default' : 'outline'}
                >
                  Certifications
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {filteredExperience.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`card-professional p-6 hover-lift ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex items-center mb-2 md:mb-0">
                      <div className={`w-4 h-4 rounded-full mr-4 ${
                        item.type === 'internship' ? 'bg-blue-500' : 'bg-orange-500'
                      }`}></div>
                      <div>
                        <h3 className="text-xl font-semibold">{item.company}</h3>
                        <p className="text-lg font-medium text-orange-500">{item.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={
                        item.type === 'internship' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-orange-100 text-orange-800'
                      }>
                        {item.type === 'internship' ? 'Internship' : 'Certificate'}
                      </Badge>
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                      }`}>
                        {item.duration}
                      </span>
                    </div>
                  </div>
                  
                  <p className={`mb-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Enhanced Certificate Viewer */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        className="btn-accent flex items-center gap-2"
                        onClick={() => {
                          toast({
                            title: "Opening Certificate",
                            description: `Viewing ${item.type} certificate for ${item.company}`,
                          })
                        }}
                      >
                        View Certificate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl h-[90vh] p-0">
                      <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="flex items-center gap-2">
                          {item.type === 'internship' ? 'Internship' : 'Certification'} - {item.company}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="flex-1 p-6 pt-0">
                        <iframe
                          src={item.certificate}
                          className="w-full h-full rounded-lg border"
                          title={`Certificate - ${item.company}`}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* AI Demo Section */}
      <AnimatedSection>
        <section id="demo" className={`py-16 px-4 md:px-8 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'
        }`}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                AI Assistant Demo
              </span>
            </motion.h2>
            
            <motion.p
              className={`text-lg mb-8 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Experience my AI assistant that can answer questions about my projects, skills, and experience
            </motion.p>
            
            <Dialog open={showChatModal} onOpenChange={setShowChatModal}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="btn-primary text-lg px-8 py-4"
                  onClick={() => {
                    toast({
                      title: "Launching AI Demo",
                      description: "Get ready to chat with my AI assistant!",
                    })
                  }}
                >
                  Launch AI Assistant
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md h-[80vh] flex flex-col">
                <DialogHeader className={`pb-4 border-b ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <DialogTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-bold">AI</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                        AI Assistant
                      </h3>
                      <p className="text-sm text-gray-500">Ask me anything about Dharaneesh!</p>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <div className="flex-1 flex flex-col">
                  <div className={`flex-1 overflow-y-auto p-4 space-y-4 rounded-lg custom-scrollbar ${
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50/80'
                  }`}>
                    {chatMessages.length === 0 ? (
                      <motion.div 
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div 
                          className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                          animate={{ 
                            scale: [1, 1.05, 1],
                            boxShadow: [
                              '0 10px 30px rgba(59, 130, 246, 0.3)',
                              '0 15px 40px rgba(139, 92, 246, 0.4)',
                              '0 10px 30px rgba(59, 130, 246, 0.3)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="text-white text-2xl font-bold">AI</span>
                        </motion.div>
                        <motion.p 
                          className="text-lg font-semibold mb-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          Hi! I'm Dharaneesh's AI Assistant
                        </motion.p>
                        <motion.p 
                          className={`text-sm mb-4 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          I can help you learn about his projects, skills, and experience
                        </motion.p>
                        <motion.div 
                          className="flex flex-wrap gap-2 justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:scale-105 transition-transform cursor-pointer">Projects</Badge>
                          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:scale-105 transition-transform cursor-pointer">Skills</Badge>
                          <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:scale-105 transition-transform cursor-pointer">Experience</Badge>
                          <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:scale-105 transition-transform cursor-pointer">Contact</Badge>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <>
                        {chatMessages.map((message, index) => (
                          <motion.div
                            key={index}
                            className={`flex ${
                              message.type === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                            initial={{ opacity: 0, x: message.type === 'user' ? 30 : -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                          >
                            <div className={`flex items-start gap-2 max-w-[80%] ${
                              message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                            }`}>
                              {message.type === 'ai' && (
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-xs font-bold">AI</span>
                                </div>
                              )}
                              <div
                                className={`px-4 py-3 rounded-2xl shadow-md backdrop-blur-sm ${
                                  message.type === 'user'
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                    : theme === 'dark'
                                    ? 'bg-gray-700/80 text-white border border-gray-600/50'
                                    : 'bg-white/90 text-gray-800 border border-gray-200/50 shadow-sm'
                                }`}
                              >
                                <p className="text-sm leading-relaxed">{message.content}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        {/* Typing indicator when AI is responding */}
                        {chatMessages.length > 0 && chatMessages[chatMessages.length - 1].type === 'user' && (
                          <motion.div
                            className="flex justify-start"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">AI</span>
                              </div>
                              <div className={`px-4 py-3 rounded-2xl ${
                                theme === 'dark' ? 'bg-gray-700' : 'bg-white border border-gray-200'
                              }`}>
                                <div className="flex gap-1">
                                  <motion.div 
                                    className="w-2 h-2 bg-blue-500 rounded-full"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                                  />
                                  <motion.div 
                                    className="w-2 h-2 bg-purple-500 rounded-full"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                                  />
                                  <motion.div 
                                    className="w-2 h-2 bg-blue-500 rounded-full"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </>
                    )}
                  </div>
                  
                  <div className={`border-t p-4 ${
                    theme === 'dark' ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50/50'
                  }`}>
                    <div className="flex gap-2 mb-3">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type your question here..."
                        className={`form-input flex-1 ${
                          theme === 'dark' 
                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
                        }`}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleChatSubmit()
                          }
                        }}
                        autoFocus
                      />
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          className="btn-primary px-4 py-2 shadow-lg"
                          onClick={handleChatSubmit}
                          disabled={!chatInput.trim()}
                        >
                          <span className="mr-1"></span>
                          Send
                        </Button>
                      </motion.div>
                    </div>
                    
                    {/* Enhanced Quick question buttons */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        { text: 'Tell me about projects', icon: '' },
                        { text: 'What are your skills?', icon: '' },  
                        { text: 'How can I hire you?', icon: '' },
                        { text: 'Show experience', icon: '' }
                      ].map((question, index) => (
                        <motion.div
                          key={question.text}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className={`text-xs hover:scale-105 transition-all duration-200 ${
                              theme === 'dark' 
                                ? 'border-gray-600 hover:border-orange-500 hover:bg-orange-500/10' 
                                : 'border-gray-300 hover:border-orange-500 hover:bg-orange-50'
                            }`}
                            onClick={() => {
                              setChatInput(question.text)
                              setTimeout(() => handleChatSubmit(), 100)
                            }}
                          >
                            <span className="mr-1">{question.icon}</span>
                            {question.text}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </AnimatedSection>

      {/* Enhanced Recent Activity Section */}
      <AnimatedSection>
        <section className={`py-16 px-4 md:px-8 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                Recent Activity
              </span>
            </motion.h2>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  className="activity-item"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`activity-icon ${activity.type}`}>
                    {activity.platform === 'GitHub' ? 'GH' : 
                     activity.platform === 'LinkedIn' ? 'LI' : 
                     activity.platform === 'Work' ? 'W' : 'L'}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="font-semibold text-lg">{activity.action}</h3>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            activity.type === 'github' ? 'border-gray-400 text-gray-400' :
                            activity.type === 'linkedin' ? 'border-blue-400 text-blue-400' :
                            activity.type === 'project' ? 'border-green-400 text-green-400' :
                            'border-orange-400 text-orange-400'
                          }`}
                        >
                          {activity.platform}
                        </Badge>
                        <span className="text-sm text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                    <p className={`mt-2 text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {activity.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Stay Updated",
                    description: "Follow me on GitHub and LinkedIn for the latest updates!",
                  })
                }}
              >
                View All Activity
              </Button>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection>
        <section id="contact" className={`py-16 px-4 md:px-8 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-slate-100'
        }`}>
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-green-500 to-teal-500 text-transparent bg-clip-text">
                Get in Touch
              </span>
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.div
                className={`card-professional p-8 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                }`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold mb-6">Send me a message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="btn-primary w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </motion.div>
              
              {/* Contact Information */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-4"></div>
                      <span className="text-lg">dharaneeshc2006@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded-full mr-4"></div>
                      <span className="text-lg">+91 9345450445</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-purple-500 rounded-full mr-4"></div>
                      <span className="text-lg">Available for Remote Work</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Connect with Me</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      variant="outline"
                      className="hover-glow flex items-center gap-2"
                      onClick={() => {
                        window.open('https://github.com/dharaneesh', '_blank')
                        toast({
                          title: "Opening GitHub",
                          description: "Explore my code repositories",
                        })
                      }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      className="hover-glow flex items-center gap-2"
                      onClick={() => {
                        window.open('https://linkedin.com/in/dharaneesh', '_blank')
                        toast({
                          title: "Opening LinkedIn",
                          description: "Let's connect professionally",
                        })
                      }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </Button>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl text-white">
                  <h4 className="text-xl font-semibold mb-2">Ready to Start Your Project?</h4>
                  <p className="mb-4">Let's discuss how I can help bring your ideas to life with cutting-edge technology and creative solutions.</p>
                  <Button 
                    className="bg-white text-orange-500 hover:bg-gray-100"
                    onClick={() => {
                      document.querySelector('input[placeholder="Your Name"]')?.focus()
                      toast({
                        title: "Let's get started!",
                        description: "Fill out the form to begin our conversation",
                      })
                    }}
                  >
                    Start Conversation
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Enhanced Footer */}
      <footer className={`relative py-20 px-4 md:px-8 overflow-hidden ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
          : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700'
      }`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 animate-pulse" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(249, 115, 22, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
               }} 
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                    Dharaneesh C
                  </span>
                </h3>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full mb-6"></div>
              </motion.div>
              
              <motion.p 
                className="text-gray-300 text-lg leading-relaxed max-w-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Passionate Full Stack & AI Developer crafting innovative digital solutions. 
                Transforming complex challenges into elegant, user-friendly experiences with cutting-edge technology.
              </motion.p>
              
              {/* Enhanced Social Links */}
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:shadow-xl transition-all duration-300 p-4"
                    onClick={() => {
                      window.open('https://github.com/Dharaneesh05', '_blank')
                      toast({
                        title: "Opening GitHub",
                        description: "Check out my code repositories",
                      })
                    }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 p-4"
                    onClick={() => {
                      window.open('hthttps://www.linkedin.com/in/dharaneesh-c/', '_blank')
                      toast({
                        title: "Opening LinkedIn",
                        description: "Let's connect professionally",
                      })
                    }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 p-4"
                    onClick={() => {
                      window.location.href = 'mailto:dharaneeshc2006@gmail.com'
                      toast({
                        title: "Opening Email",
                        description: "Let's get in touch!",
                      })
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-purple-500 text-transparent bg-clip-text">
                  Quick Links
                </h4>
                <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full mb-6"></div>
              </div>
              <ul className="space-y-4">
                {navigation.map((item, index) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-orange-500 transition-all duration-300 text-sm flex items-center group"
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(item.href.substring(1))?.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        })
                      }}
                    >
                      <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-orange-500 transition-colors"></span>
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text">
                  Get In Touch
                </h4>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mb-6"></div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: '', text: 'dharaneeshc2006@gmail.com', type: 'email' },
                  { icon: '', text: 'Open for Opportunities', type: 'work' },
                  { icon: '', text: '24hr Response Time', type: 'response' }
                ].map((item, index) => (
                  <motion.div 
                    key={item.type}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    onClick={() => {
                      if (item.type === 'email') {
                        window.location.href = 'mailto:dharaneeshc2006@gmail.com'
                      }
                    }}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="pt-4"
              >
                <Button 
                  className="btn-primary w-full shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    })
                  }}
                >
                  <span className="mr-2"></span>
                  Start a Project
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Enhanced Bottom Section */}
          <motion.div 
            className="border-t border-gradient-to-r from-transparent via-gray-700 to-transparent pt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="text-center lg:text-left space-y-2">
                <p className="text-gray-400 text-sm">
                  © Dharaneesh C 2025. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs">
                  Created using React, Next.js, Tailwind CSS & Framer Motion
                </p>
              </div>
              
              <div className="flex items-center gap-6 text-xs text-gray-500">
                <motion.span 
                  className="flex items-center gap-2 hover:text-orange-500 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="animate-pulse">🇮🇳</span>
                  Developed by Dharaneesh
                </motion.span>
                <motion.span 
                  className="flex items-center gap-2 hover:text-green-500 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="animate-bounce"></span>
                  Hosted on vercel
                </motion.span>
              </div>
            </div>



            {/* <motion.div 
              className="flex justify-center items-center gap-6 mt-8 pt-8 border-t border-gray-800/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="text-xs text-gray-500 mb-4 text-center">Built with modern technologies</p>
              <div className="flex gap-4">
                {['⚛️', '🔥', '🎨', '⚡'].map((icon, index) => (
                  <motion.span
                    key={index}
                    className="text-2xl opacity-30 hover:opacity-100 transition-opacity cursor-pointer"
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      delay: index * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {icon}
                  </motion.span>
                ))}
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        className={`fixed bottom-8 right-8 z-40 p-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 ${
          showScrollTop ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: showScrollTop ? 0 : 50,
          opacity: showScrollTop ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        ↑
      </motion.button>
    </div>
  )
}
