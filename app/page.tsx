
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

export default function Home() {
  const [theme, setTheme] = useState('dark')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [showChatModal, setShowChatModal] = useState(false)
  const [stats, setStats] = useState({ projects: 0, years: 0, clients: 0, certifications: 0 })

  useEffect(() => {
    document.documentElement.className = theme
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    
    window.addEventListener('scroll', handleScroll)
    
    // Animate stats counter
    const timer = setTimeout(() => {
      setStats({ projects: 15, years: 3, clients: 10, certifications: 8 })
    }, 1000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      })
      
      if (response.ok) {
        alert('Message sent successfully!')
        setContactForm({ name: '', email: '', message: '' })
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      alert('Error sending message. Please try again.')
    }
  }

  const skills = [
    { name: 'React/Next.js', level: 95, color: '#61DAFB' },
    { name: 'Python', level: 90, color: '#3776AB' },
    { name: 'Node.js', level: 85, color: '#339933' },
    { name: 'Database', level: 88, color: '#336791' }
  ]

  const projects = [
    {
      id: 1,
      title: 'AI-Powered Analytics Dashboard',
      description: 'A comprehensive dashboard with AI-driven insights and real-time data visualization.',
      image: '/placeholder.jpg',
      tags: ['AI', 'React', 'Python'],
      category: 'AI',
      demo: 'https://example.com/demo',
      github: 'https://github.com/dharaneesh'
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and inventory management.',
      image: '/placeholder.jpg',
      tags: ['Full Stack', 'React', 'Node.js'],
      category: 'Full Stack',
      demo: 'https://example.com/demo',
      github: 'https://github.com/dharaneesh'
    },
    {
      id: 3,
      title: 'Machine Learning Model Trainer',
      description: 'Platform for training and deploying ML models with intuitive UI.',
      image: '/placeholder.jpg',
      tags: ['AI', 'Python', 'TensorFlow'],
      category: 'AI',
      demo: 'https://example.com/demo',
      github: 'https://github.com/dharaneesh'
    },
    {
      id: 4,
      title: 'Task Management System',
      description: 'Collaborative task management with real-time updates and team collaboration.',
      image: '/placeholder.jpg',
      tags: ['Full Stack', 'React', 'Socket.io'],
      category: 'Full Stack',
      demo: 'https://example.com/demo',
      github: 'https://github.com/dharaneesh'
    },
    {
      id: 5,
      title: 'Weather Prediction App',
      description: 'AI-powered weather prediction with interactive maps and forecasting.',
      image: '/placeholder.jpg',
      tags: ['AI', 'React', 'API'],
      category: 'AI',
      demo: 'https://example.com/demo',
      github: 'https://github.com/dharaneesh'
    },
    {
      id: 6,
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management and content scheduling.',
      image: '/placeholder.jpg',
      tags: ['Full Stack', 'React', 'Analytics'],
      category: 'Full Stack',
      demo: 'https://example.com/demo',
      github: 'https://github.com/dharaneesh'
    }
  ]

  const internships = [
    {
      id: 1,
      company: 'Tech Innovators Inc.',
      role: 'Full Stack Developer Intern',
      duration: 'Jun 2023 - Aug 2023',
      description: 'Developed web applications using React and Node.js, collaborated with senior developers on enterprise projects.',
      certificate: '/certificates/internship1.pdf'
    },
    {
      id: 2,
      company: 'AI Solutions Ltd.',
      role: 'AI Developer Intern',
      duration: 'Jan 2023 - Mar 2023',
      description: 'Worked on machine learning projects, implemented AI models for data analysis and prediction.',
      certificate: '/certificates/internship2.pdf'
    }
  ]

  const certifications = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      issuer: 'FreeCodeCamp',
      date: '2023',
      certificate: '/certificates/fullstack.pdf'
    },
    {
      id: 2,
      title: 'Machine Learning Specialization',
      issuer: 'Stanford University',
      date: '2023',
      certificate: '/certificates/ml.pdf'
    },
    {
      id: 3,
      title: 'React Developer Certification',
      issuer: 'Meta',
      date: '2022',
      certificate: '/certificates/react.pdf'
    }
  ]

  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Next.js 14',
      excerpt: 'Learn the latest features and improvements in Next.js 14 for modern web development.',
      date: '2024-01-15',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'AI in Web Development: The Future is Now',
      excerpt: 'Exploring how artificial intelligence is transforming the web development landscape.',
      date: '2024-01-10',
      readTime: '8 min read'
    },
    {
      id: 3,
      title: 'Building Scalable APIs with Node.js',
      excerpt: 'Best practices for creating robust and scalable backend APIs using Node.js.',
      date: '2024-01-05',
      readTime: '6 min read'
    }
  ]

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

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
    { name: 'Internships', href: '#internships' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Blog', href: '#blog' },
    { name: 'Demo', href: '#demo' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-black text-white' 
        : 'bg-slate-50 text-gray-900'
    }`}>
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        theme === 'dark' ? 'bg-black/95' : 'bg-white/95'
      } backdrop-blur-sm border-b ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.a
              href="#home"
              className="text-2xl md:text-3xl font-bold text-orange-500 font-sans"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Dharaneesh C
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="nav-link hover:text-orange-500 transition-colors duration-300"
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
            <div className="flex items-center space-x-4">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                onClick={() => window.open('#contact', '_self')}
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
                  className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className={`min-h-screen flex items-center justify-center px-4 md:px-8 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-black to-gray-900' 
          : 'bg-gradient-to-br from-slate-50 to-blue-50'
      }`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="text-purple-500 text-sm md:text-base mb-4 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I am Dharaneesh C
            </motion.p>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 font-sans leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-orange-500 to-orange-400 text-transparent bg-clip-text">
                Full Stack & AI Developer
              </span>
            </motion.h1>
            
            <motion.p
              className={`text-base md:text-lg mb-8 max-w-2xl leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Building innovative web solutions and AI-powered applications with modern technologies and creative problem-solving.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4 justify-center md:justify-start mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                className="btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </Button>
              <Button 
                variant="outline" 
                className="btn-outline"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                Download Resume
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="btn-secondary">View Resume</Button>
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
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-orange-500">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Dharaneesh C"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Projects', value: stats.projects, color: 'text-blue-500' },
              { label: 'Years', value: stats.years, color: 'text-green-500' },
              { label: 'Clients', value: stats.clients, color: 'text-purple-500' },
              { label: 'Certifications', value: stats.certifications, color: 'text-orange-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`card-professional p-4 text-center ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="stat-counter text-2xl font-bold mb-1">{stat.value}+</div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <AnimatedSection>
        <section id="about" className={`py-16 px-4 md:px-8 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'
        }`}>
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About Me
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className={`text-base md:text-lg mb-6 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  I'm a passionate Full Stack and AI Developer with expertise in modern web technologies and artificial intelligence. I love creating innovative solutions that bridge the gap between complex technical challenges and user-friendly experiences.
                </p>
                <p className={`text-base md:text-lg mb-8 leading-relaxed ${
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
                      className={`flex items-center text-base ${
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

      {/* Skills Section */}
      <AnimatedSection>
        <section id="skills" className={`py-16 px-4 md:px-8 ${
          theme === 'dark' ? 'bg-black' : 'bg-white'
        }`}>
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Skills
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className={`card-professional p-6 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-slate-50'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
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
                      transition={{ duration: 1.5, delay: index * 0.2 }}
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
              className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Projects
            </motion.h2>
            
            {/* Filter Buttons */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {['All', 'AI', 'Full Stack'].map((filter) => (
                <Button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`filter-button ${
                    activeFilter === filter ? 'active' : ''
                  }`}
                  variant={activeFilter === filter ? 'default' : 'outline'}
                >
                  {filter}
                </Button>
              ))}
            </motion.div>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="project-card hover-lift"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="project-image w-full h-48 object-cover transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className={`mb-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="btn-primary"
                        onClick={() => window.open(project.demo, '_blank')}
                      >
                        Live Demo
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        GitHub
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Internships Section */}
      <AnimatedSection>
        <section id="internships" className={`py-16 px-4 md:px-8 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-slate-100'
        }`}>
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Internships
            </motion.h2>
            
            <div className="space-y-6">
              {internships.map((internship, index) => (
                <motion.div
                  key={internship.id}
                  className={`card-professional p-6 hover-lift ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex items-center mb-2 md:mb-0">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                      <div>
                        <h3 className="text-xl font-semibold">{internship.company}</h3>
                        <p className="text-orange-500 font-medium">{internship.role}</p>
                      </div>
                    </div>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                    }`}>
                      {internship.duration}
                    </span>
                  </div>
                  <p className={`mb-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {internship.description}
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="btn-secondary">
                        View Certificate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>Internship Certificate - {internship.company}</DialogTitle>
                      </DialogHeader>
                      <iframe
                        src={internship.certificate}
                        className="w-full h-full rounded-lg"
                        title={`Certificate - ${internship.company}`}
                      />
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Certifications Section */}
      <AnimatedSection>
        <section id="certifications" className={`py-16 px-4 md:px-8 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'
        }`}>
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Certifications
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  className="certificate-card hover-lift cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-xl font-bold">C</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
                    <p className={`text-sm mb-2 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {cert.issuer}
                    </p>
                    <span className="text-orange-500 font-medium">{cert.date}</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full btn-primary">
                        View Certificate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>{cert.title} - {cert.issuer}</DialogTitle>
                      </DialogHeader>
                      <iframe
                        src={cert.certificate}
                        className="w-full h-full rounded-lg"
                        title={`Certificate - ${cert.title}`}
                      />
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Blog Section */}
      <AnimatedSection>
        <section id="blog" className={`py-16 px-4 md:px-8 ${
          theme === 'dark' ? 'bg-black' : 'bg-white'
        }`}>
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Blog Posts
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className={`card-professional p-6 hover-lift ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-slate-50'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {post.date} • {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className={`mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {post.excerpt}
                  </p>
                  <Button size="sm" className="btn-primary">
                    Read More
                  </Button>
                </motion.article>
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
              className="text-3xl md:text-4xl font-bold text-orange-500 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Interactive AI Demo
            </motion.h2>
            
            <motion.p
              className={`text-lg mb-8 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Experience the power of AI through this interactive chatbot demo
            </motion.p>
            
            <Dialog open={showChatModal} onOpenChange={setShowChatModal}>
              <DialogTrigger asChild>
                <Button size="lg" className="btn-primary text-lg px-8 py-4">
                  Launch AI Demo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md h-[80vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    AI Assistant Demo
                  </DialogTitle>
                </DialogHeader>
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.length === 0 ? (
                      <div className="text-center text-gray-500">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white font-bold">AI</span>
                        </div>
                        <p>Hi! I'm an AI assistant. Ask me anything!</p>
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
                            className={`max-w-xs px-4 py-2 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-orange-500 text-white'
                                : theme === 'dark'
                                ? 'bg-gray-700 text-white'
                                : 'bg-gray-200 text-black'
                            }`}
                          >
                            {message.content}
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
                        placeholder="Type your message..."
                        className="form-input"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            if (chatInput.trim()) {
                              setChatMessages([
                                ...chatMessages,
                                { type: 'user', content: chatInput },
                                { type: 'ai', content: 'Thanks for your message! This is a demo response.' }
                              ])
                              setChatInput('')
                            }
                          }
                        }}
                      />
                      <Button
                        className="btn-primary"
                        onClick={() => {
                          if (chatInput.trim()) {
                            setChatMessages([
                              ...chatMessages,
                              { type: 'user', content: chatInput },
                              { type: 'ai', content: 'Thanks for your message! This is a demo response.' }
                            ])
                            setChatInput('')
                          }
                        }}
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection>
        <section id="contact" className={`py-16 px-4 md:px-8 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-slate-100'
        }`}>
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.div
                className="contact-form"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
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
                  <Button type="submit" className="btn-primary w-full">
                    Send Message
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
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-4"></div>
                      <span>dharaneeshc2006@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-4"></div>
                      <span>+91 XXXXX XXXXX</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover-glow"
                      onClick={() => window.open('https://github.com/dharaneesh', '_blank')}
                    >
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover-glow"
                      onClick={() => window.open('https://linkedin.com/in/dharaneesh', '_blank')}
                    >
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <footer className={`footer-gradient py-8 px-4 md:px-8 ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-900'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-gray-400 mb-4 md:mb-0"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              © 2025 Dharaneesh C. All rights reserved.
            </motion.p>
            
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex gap-4">
                {navigation.slice(0, 4).map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        className={`fixed bottom-8 right-8 z-40 p-3 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-all duration-300 ${
          showScrollTop ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={scrollToTop}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
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
