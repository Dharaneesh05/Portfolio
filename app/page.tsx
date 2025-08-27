
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
  const [stats, setStats] = useState({ projects: 0, years: 0, clients: 0, certifications: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [recentActivities] = useState([
    { 
      action: 'Launched AI-Powered Portfolio Website', 
      time: '2 hours ago', 
      type: 'project',
      icon: '🚀',
      description: 'Deployed new portfolio with advanced AI features and responsive design'
    },
    { 
      action: 'Completed Machine Learning Certification', 
      time: '1 day ago', 
      type: 'achievement',
      icon: '🏆',
      description: 'Advanced AI/ML certification from Stanford University completed with distinction'
    },
    { 
      action: 'Client Project Delivered', 
      time: '3 days ago', 
      type: 'client',
      icon: '✅',
      description: 'Successfully delivered e-commerce platform with 99.9% uptime'
    },
    { 
      action: 'Open Source Contribution', 
      time: '1 week ago', 
      type: 'github',
      icon: '💻',
      description: 'Contributed to React ecosystem with new animation library'
    },
    { 
      action: 'Speaking at Tech Conference', 
      time: '2 weeks ago', 
      type: 'event',
      icon: '🎤',
      description: 'Presented "Future of AI in Web Development" at TechCon 2024'
    }
  ])
  
  const { toast } = useToast()

  useEffect(() => {
    document.documentElement.className = theme
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'demo', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    // Animate stats counter with stagger effect
    const timer = setTimeout(() => {
      setStats({ projects: 15, years: 3, clients: 12, certifications: 8 })
    }, 1500)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [theme])

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
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to send a message",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      })
      
      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon!",
        })
        setContactForm({ name: '', email: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly at dharaneeshc2006@gmail.com",
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
    
    // AI responses based on common questions
    setTimeout(() => {
      let aiResponse = "Thanks for your question! "
      
      if (userMessage.toLowerCase().includes('project')) {
        aiResponse += "I have worked on 15+ projects including AI-powered applications, full-stack web apps, and machine learning models. Check out my Projects section for detailed information!"
      } else if (userMessage.toLowerCase().includes('skill')) {
        aiResponse += "I specialize in React/Next.js, Python, AI/ML, Node.js, and database technologies. I'm also experienced in cloud deployment and modern web development practices."
      } else if (userMessage.toLowerCase().includes('contact') || userMessage.toLowerCase().includes('hire')) {
        aiResponse += "I'm available for freelance projects and full-time opportunities. You can reach me through the contact form below or email me directly at dharaneeshc2006@gmail.com"
      } else if (userMessage.toLowerCase().includes('experience')) {
        aiResponse += "I have 3+ years of experience in full-stack development and AI/ML. I've completed internships at tech companies and worked on various client projects."
      } else {
        aiResponse += "That's an interesting question! Feel free to explore my portfolio to learn more about my work, or contact me directly for specific inquiries."
      }
      
      setChatMessages(prev => [...prev, { type: 'ai', content: aiResponse }])
    }, 1000)
    
    toast({
      title: "Message sent to AI",
      description: "AI is processing your question...",
    })
  }

  const skills = [
    { name: 'React/Next.js', level: 95, color: '#61DAFB' },
    { name: 'Python', level: 90, color: '#3776AB' },
    { name: 'AI/Machine Learning', level: 88, color: '#FF6B6B' },
    { name: 'Node.js', level: 85, color: '#339933' },
    { name: 'Database Design', level: 87, color: '#336791' },
    { name: 'Cloud Platforms', level: 82, color: '#4285F4' }
  ]

  const projects = [
    {
      id: 1,
      title: 'AI-Powered Analytics Dashboard',
      description: 'A comprehensive dashboard with AI-driven insights, real-time data visualization, and predictive analytics for business intelligence.',
      image: '/placeholder.jpg',
      tags: ['AI', 'React', 'Python', 'TensorFlow', 'Dashboard'],
      category: 'AI',
      demo: 'https://example.com/analytics-demo',
      github: 'https://github.com/dharaneesh/ai-analytics'
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
      image: '/placeholder.jpg',
      tags: ['Full Stack', 'React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'Full Stack',
      demo: 'https://example.com/ecommerce-demo',
      github: 'https://github.com/dharaneesh/ecommerce'
    },
    {
      id: 3,
      title: 'Smart Chatbot System',
      description: 'AI-powered chatbot with natural language processing and machine learning capabilities.',
      image: '/placeholder.jpg',
      tags: ['AI', 'Python', 'NLP', 'Flask', 'Machine Learning'],
      category: 'AI',
      demo: 'https://example.com/chatbot-demo',
      github: 'https://github.com/dharaneesh/smart-chatbot'
    },
    {
      id: 4,
      title: 'Task Management System',
      description: 'Collaborative task management with real-time updates, team collaboration, and project tracking.',
      image: '/placeholder.jpg',
      tags: ['Full Stack', 'React', 'Socket.io', 'Express', 'PostgreSQL'],
      category: 'Full Stack',
      demo: 'https://example.com/taskmanager-demo',
      github: 'https://github.com/dharaneesh/task-manager'
    },
    {
      id: 5,
      title: 'Weather Prediction App',
      description: 'AI-powered weather prediction with interactive maps, forecasting, and climate analysis.',
      image: '/placeholder.jpg',
      tags: ['AI', 'React', 'API', 'Machine Learning', 'Weather'],
      category: 'AI',
      demo: 'https://example.com/weather-demo',
      github: 'https://github.com/dharaneesh/weather-ai'
    },
    {
      id: 6,
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management, content scheduling, and engagement tracking.',
      image: '/placeholder.jpg',
      tags: ['Full Stack', 'React', 'Analytics', 'API', 'Dashboard'],
      category: 'Full Stack',
      demo: 'https://example.com/social-demo',
      github: 'https://github.com/dharaneesh/social-dashboard'
    },
    {
      id: 7,
      title: 'Image Recognition System',
      description: 'Deep learning model for image classification and object detection with web interface.',
      image: '/placeholder.jpg',
      tags: ['AI', 'Python', 'TensorFlow', 'Computer Vision', 'Deep Learning'],
      category: 'AI',
      demo: 'https://example.com/image-recognition-demo',
      github: 'https://github.com/dharaneesh/image-recognition'
    },
    {
      id: 8,
      title: 'Real Estate Platform',
      description: 'Full-stack real estate platform with property listings, search filters, and virtual tours.',
      image: '/placeholder.jpg',
      tags: ['Full Stack', 'React', 'Node.js', 'MongoDB', 'Maps API'],
      category: 'Full Stack',
      demo: 'https://example.com/realestate-demo',
      github: 'https://github.com/dharaneesh/real-estate'
    },
    {
      id: 9,
      title: 'Stock Price Predictor',
      description: 'Machine learning model for stock price prediction with interactive charts and analysis.',
      image: '/placeholder.jpg',
      tags: ['AI', 'Python', 'Machine Learning', 'Financial', 'Data Science'],
      category: 'AI',
      demo: 'https://example.com/stock-demo',
      github: 'https://github.com/dharaneesh/stock-predictor'
    },
    {
      id: 10,
      title: 'Learning Management System',
      description: 'Educational platform with course management, video streaming, and progress tracking.',
      image: '/placeholder.jpg',
      tags: ['Full Stack', 'React', 'Node.js', 'Video Streaming', 'Education'],
      category: 'Full Stack',
      demo: 'https://example.com/lms-demo',
      github: 'https://github.com/dharaneesh/lms'
    },
    {
      id: 11,
      title: 'Healthcare Management System',
      description: 'Digital healthcare platform with appointment scheduling, patient records, and telemedicine.',
      image: '/placeholder.jpg',
      tags: ['Full Stack', 'React', 'Node.js', 'Healthcare', 'Database'],
      category: 'Full Stack',
      demo: 'https://example.com/healthcare-demo',
      github: 'https://github.com/dharaneesh/healthcare'
    },
    {
      id: 12,
      title: 'Smart Home IoT System',
      description: 'IoT-based smart home automation with mobile app and AI-powered energy optimization.',
      image: '/placeholder.jpg',
      tags: ['IoT', 'React Native', 'Python', 'AI', 'Automation'],
      category: 'IoT',
      demo: 'https://example.com/smarthome-demo',
      github: 'https://github.com/dharaneesh/smart-home'
    },
    {
      id: 13,
      title: 'Blockchain Voting System',
      description: 'Decentralized voting platform using blockchain technology for secure and transparent elections.',
      image: '/placeholder.jpg',
      tags: ['Blockchain', 'React', 'Web3', 'Smart Contracts', 'Security'],
      category: 'Blockchain',
      demo: 'https://example.com/voting-demo',
      github: 'https://github.com/dharaneesh/blockchain-voting'
    },
    {
      id: 14,
      title: 'Music Streaming Platform',
      description: 'Full-featured music streaming app with playlists, recommendations, and social features.',
      image: '/placeholder.jpg',
      tags: ['Full Stack', 'React', 'Node.js', 'Audio Streaming', 'Social'],
      category: 'Full Stack',
      demo: 'https://example.com/music-demo',
      github: 'https://github.com/dharaneesh/music-platform'
    },
    {
      id: 15,
      title: 'Virtual Reality Training',
      description: 'VR-based training platform for professional development with immersive learning experiences.',
      image: '/placeholder.jpg',
      tags: ['VR', 'Unity', 'C#', 'Education', 'Immersive'],
      category: 'VR',
      demo: 'https://example.com/vr-demo',
      github: 'https://github.com/dharaneesh/vr-training'
    }
  ]

  const experienceData = [
    {
      id: 1,
      company: 'Tech Innovators Inc.',
      role: 'Full Stack Developer Intern',
      duration: 'Jun 2023 - Aug 2023',
      type: 'internship',
      description: 'Developed web applications using React and Node.js, collaborated with senior developers on enterprise projects, and implemented RESTful APIs.',
      certificate: '/resume.pdf',
      skills: ['React', 'Node.js', 'MongoDB', 'API Development']
    },
    {
      id: 2,
      company: 'AI Solutions Ltd.',
      role: 'AI Developer Intern',
      duration: 'Jan 2023 - Mar 2023',
      type: 'internship',
      description: 'Worked on machine learning projects, implemented AI models for data analysis and prediction, and contributed to research initiatives.',
      certificate: '/resume.pdf',
      skills: ['Python', 'TensorFlow', 'Machine Learning', 'Data Analysis']
    },
    {
      id: 3,
      company: 'FreeCodeCamp',
      role: 'Full Stack Web Development',
      duration: '2023',
      type: 'certification',
      description: 'Comprehensive certification covering HTML, CSS, JavaScript, React, Node.js, and database technologies.',
      certificate: '/resume.pdf',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js']
    },
    {
      id: 4,
      company: 'Stanford University',
      role: 'Machine Learning Specialization',
      duration: '2023',
      type: 'certification',
      description: 'Advanced machine learning concepts including supervised and unsupervised learning, neural networks, and deep learning.',
      certificate: '/resume.pdf',
      skills: ['Machine Learning', 'Python', 'Neural Networks', 'Deep Learning']
    },
    {
      id: 5,
      company: 'Meta',
      role: 'React Developer Certification',
      duration: '2022',
      type: 'certification',
      description: 'Professional certification in React development covering hooks, state management, and advanced React patterns.',
      certificate: '/resume.pdf',
      skills: ['React', 'JavaScript', 'State Management', 'Hooks']
    },
    {
      id: 6,
      company: 'Google Cloud',
      role: 'Cloud Architect Certification',
      duration: '2023',
      type: 'certification',
      description: 'Professional certification in Google Cloud Platform covering architecture, deployment, and cloud security.',
      certificate: '/resume.pdf',
      skills: ['Google Cloud', 'Cloud Architecture', 'DevOps', 'Security']
    }
  ]

  const technologies = [
    'React', 'Python', 'Node.js', 'AI', 'Machine Learning', 'MongoDB', 'PostgreSQL', 
    'TensorFlow', 'Flask', 'Express', 'Socket.io', 'API', 'Dashboard', 'Blockchain', 
    'IoT', 'VR', 'Unity', 'C#', 'Web3', 'Smart Contracts'
  ]

  const categories = ['All', 'AI', 'Full Stack', 'IoT', 'Blockchain', 'VR']

  const filteredProjects = projects.filter(project => {
    const categoryMatch = activeFilter === 'All' || project.category === activeFilter
    const techMatch = activeTechFilter.length === 0 || activeTechFilter.some(tech => project.tags.includes(tech))
    return categoryMatch && techMatch
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
      
      {/* Enhanced Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' 
          : 'bg-white/90 backdrop-blur-md border-b border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.a
              href="#home"
              className="text-2xl md:text-3xl font-bold font-sans"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                Dharaneesh C
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`nav-link transition-colors duration-300 ${
                    activeSection === item.href.substring(1) 
                      ? 'text-orange-500 font-semibold' 
                      : 'hover:text-orange-500'
                  }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-3">
              <Button 
                className="btn-primary hidden sm:inline-flex"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  toast({
                    title: "Let's connect!",
                    description: "Scrolling to contact section",
                  })
                }}
              >
                Hire Me
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2 rounded-full hover:scale-105 transition-transform duration-300"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            className={`md:hidden overflow-hidden ${mobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}
            animate={{ maxHeight: mobileMenuOpen ? 500 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="py-4 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block py-2 px-4 rounded-lg transition-colors duration-200 ${
                    activeSection === item.href.substring(1) 
                      ? 'text-orange-500 font-semibold bg-orange-500/10' 
                      : theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                className="text-purple-500 text-lg md:text-xl mb-2 font-medium"
                animate={{ 
                  scale: [1, 1.05, 1],
                  color: ['#a855f7', '#3b82f6', '#a855f7']
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Hi, I am
              </motion.p>
              
              {/* Floating particles animation */}
              <motion.div 
                className="absolute -top-4 -left-4 w-2 h-2 bg-orange-500 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -top-2 right-8 w-1 h-1 bg-blue-500 rounded-full"
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </motion.div>
            
            {/* Animated Name with Typewriter Effect */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-sans leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <motion.span 
                className="bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-transparent bg-clip-text"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Dharaneesh C
              </motion.span>
            </motion.h1>

            {/* Animated Subtitle */}
            <motion.h2
              className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.span
                animate={{ 
                  backgroundImage: [
                    'linear-gradient(45deg, #f97316, #3b82f6)',
                    'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                    'linear-gradient(45deg, #8b5cf6, #f97316)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text"
              >
                Full Stack & AI Developer
              </motion.span>
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
            
            {/* Enhanced Action Buttons with Icons */}
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
                  <span className="mr-2">🚀</span>
                  View Projects
                </Button>
              </motion.div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="btn-secondary">
                      <span className="mr-2">📄</span>
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
                  <span className="mr-2">⬇️</span>
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
                    window.open('https://github.com/dharaneesh', '_blank')
                    toast({
                      title: "Opening GitHub",
                      description: "Check out my code repositories",
                    })
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-gray-800 dark:text-white">GitHub</span>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
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
                  <span className="text-blue-600">LinkedIn</span>
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
                { label: 'Projects', value: stats.projects, color: 'from-blue-500 to-blue-600', icon: '🚀' },
                { label: 'Years Experience', value: stats.years, color: 'from-green-500 to-green-600', icon: '⭐' },
                { label: 'Happy Clients', value: stats.clients, color: 'from-purple-500 to-purple-600', icon: '😊' },
                { label: 'Certifications', value: stats.certifications, color: 'from-orange-500 to-orange-600', icon: '🏆' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={`card-professional p-4 text-center bg-gradient-to-r ${stat.color} text-white relative overflow-hidden`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Background Animation */}
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    animate={{
                      x: ['-100%', '100%'],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="text-2xl mb-2">{stat.icon}</div>
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

              {/* Floating Elements */}
              <motion.div
                className="absolute top-4 right-4 w-4 h-4 bg-orange-500 rounded-full"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="absolute bottom-8 left-8 w-6 h-6 bg-blue-500 rounded-full"
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
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
                  I'm a passionate Full Stack and AI Developer with expertise in modern web technologies and artificial intelligence. I love creating innovative solutions that bridge the gap between complex technical challenges and user-friendly experiences.
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
              Explore my collection of {projects.length} innovative projects spanning AI, Full Stack, IoT, Blockchain, and VR
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
                    document.querySelectorAll('.experience-item').forEach(el => el.style.display = 'block')
                    toast({ title: "Showing All", description: "Displaying all experience and certifications" })
                  }}
                  className="btn-secondary"
                >
                  All
                </Button>
                <Button
                  onClick={() => {
                    document.querySelectorAll('.experience-item').forEach(el => {
                      el.style.display = el.dataset.type === 'internship' ? 'block' : 'none'
                    })
                    toast({ title: "Internships", description: "Showing internship experience" })
                  }}
                  variant="outline"
                >
                  Internships
                </Button>
                <Button
                  onClick={() => {
                    document.querySelectorAll('.experience-item').forEach(el => {
                      el.style.display = el.dataset.type === 'certification' ? 'block' : 'none'
                    })
                    toast({ title: "Certifications", description: "Showing certifications" })
                  }}
                  variant="outline"
                >
                  Certifications
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {experienceData.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`experience-item card-professional p-6 hover-lift ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                  }`}
                  data-type={item.type}
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
                        <span>📄</span>
                        View Certificate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl h-[90vh] p-0">
                      <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="flex items-center gap-2">
                          <span>{item.type === 'internship' ? '💼' : '🎓'}</span>
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
                <DialogHeader>
                  <DialogTitle className="flex items-center text-blue-500">
                    AI Assistant - Ask me anything!
                  </DialogTitle>
                </DialogHeader>
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    {chatMessages.length === 0 ? (
                      <div className="text-center text-gray-500">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">AI</span>
                        </div>
                        <p className="text-lg font-medium mb-2">Hi! I'm Dharaneesh's AI Assistant</p>
                        <p className="text-sm">Ask me about:</p>
                        <div className="flex flex-wrap gap-2 mt-2 justify-center">
                          <Badge className="bg-blue-100 text-blue-800">Projects</Badge>
                          <Badge className="bg-green-100 text-green-800">Skills</Badge>
                          <Badge className="bg-purple-100 text-purple-800">Experience</Badge>
                          <Badge className="bg-orange-100 text-orange-800">Contact</Badge>
                        </div>
                      </div>
                    ) : (
                      chatMessages.map((message, index) => (
                        <motion.div
                          key={index}
                          className={`flex ${
                            message.type === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                          initial={{ opacity: 0, x: message.type === 'user' ? 30 : -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div
                            className={`max-w-xs px-4 py-3 rounded-lg shadow-md ${
                              message.type === 'user'
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                : theme === 'dark'
                                ? 'bg-gray-700 text-white border border-gray-600'
                                : 'bg-white text-gray-800 border border-gray-200'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                  
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask about my projects, skills, experience..."
                        className="form-input flex-1"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleChatSubmit()
                          }
                        }}
                      />
                      <Button
                        className="btn-primary px-4"
                        onClick={handleChatSubmit}
                        disabled={!chatInput.trim()}
                      >
                        Send
                      </Button>
                    </div>
                    
                    {/* Quick question buttons */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {['Tell me about your projects', 'What are your skills?', 'How can I hire you?'].map((question) => (
                        <Button
                          key={question}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            setChatInput(question)
                            setTimeout(handleChatSubmit, 100)
                          }}
                        >
                          {question}
                        </Button>
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
                  className={`card-professional p-6 hover-lift ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-slate-50'
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-2xl p-2 rounded-full ${
                      activity.type === 'project' ? 'bg-blue-100 dark:bg-blue-900' :
                      activity.type === 'achievement' ? 'bg-orange-100 dark:bg-orange-900' :
                      activity.type === 'client' ? 'bg-green-100 dark:bg-green-900' :
                      activity.type === 'github' ? 'bg-purple-100 dark:bg-purple-900' :
                      'bg-pink-100 dark:bg-pink-900'
                    }`}>
                      {activity.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="font-semibold text-lg">{activity.action}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
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
                      <span className="text-lg">+91 XXXXX XXXXX</span>
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
                      <span className="text-gray-800 dark:text-white">GitHub</span>
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
                      <span className="text-blue-600">LinkedIn</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="hover-glow flex items-center gap-2"
                      onClick={() => {
                        const email = 'dharaneeshc2006@gmail.com'
                        window.location.href = `mailto:${email}`
                        toast({
                          title: "Opening Email",
                          description: "Your default email client will open",
                        })
                      }}
                    >
                      <span>📧</span>
                      <span className="text-green-600">Email</span>
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
      <footer className={`py-16 px-4 md:px-8 ${
        theme === 'dark' 
          ? 'bg-gradient-to-r from-gray-900 via-black to-gray-800' 
          : 'bg-gradient-to-r from-gray-800 to-gray-900'
      } text-white`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.h3 
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                  Dharaneesh C
                </span>
              </motion.h3>
              <motion.p 
                className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Full Stack & AI Developer passionate about creating innovative solutions that make a difference. 
                Transforming ideas into powerful digital experiences.
              </motion.p>
              
              {/* Social Links */}
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-orange-500 transition-colors p-2"
                  onClick={() => window.open('https://github.com/dharaneesh', '_blank')}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-blue-500 transition-colors p-2"
                  onClick={() => window.open('https://linkedin.com/in/dharaneesh', '_blank')}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-green-500 transition-colors p-2"
                  onClick={() => window.location.href = 'mailto:dharaneeshc2006@gmail.com'}
                >
                  <span className="text-lg">📧</span>
                </Button>
              </motion.div>
            </div>
            
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-orange-500">Quick Links</h4>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-blue-500">Contact</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <span className="text-gray-400">dharaneeshc2006@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🌍</span>
                  <span className="text-gray-400">Available Worldwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💼</span>
                  <span className="text-gray-400">Open to Opportunities</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⚡</span>
                  <span className="text-gray-400">Quick Response</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Bottom Section */}
          <motion.div 
            className="border-t border-gray-700 pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-400 mb-2">
                  © 2025 Dharaneesh C. All rights reserved. Built with React & Next.js
                </p>
                <p className="text-gray-500 text-sm">
                  Crafted with React, Next.js, Tailwind CSS & Framer Motion
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Made with</span>
                <span className="text-red-500 animate-pulse">❤️</span>
                <span>in India</span>
              </div>
            </div>
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
        <span className="text-xl">↑</span>
      </motion.button>
    </div>
  )
}
