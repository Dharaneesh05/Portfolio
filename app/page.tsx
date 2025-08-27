
"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Menu,
  X,
  Phone,
  MapPin,
  Send,
  ArrowUp,
  Twitter,
  Eye,
  Calendar,
  MessageSquare,
  Brain,
  Code,
  Sparkles,
  BookOpen,
  Zap,
  Sun,
  Moon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { StatsWidget } from "@/components/stats-widget"
import { CTAPopup } from "@/components/cta-popup"
import { SocialFeed } from "@/components/social-feed"
import { ProjectFilter } from "@/components/project-filter"
import Image from "next/image"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [projectFilter, setProjectFilter] = useState("All")
  const [technologyFilters, setTechnologyFilters] = useState<string[]>([])
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatResponse, setChatResponse] = useState("")
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 500)

      // Update active section based on scroll position
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "certifications",
        "demo",
        "contact",
      ]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    const elements = document.querySelectorAll(".fade-in")
    elements.forEach((el) => observer.observe(el))

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const downloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Dharaneesh_C_Resume.pdf"
    link.click()

    toast({
      title: "Resume Downloaded!",
      description: "Thank you for your interest. The resume has been downloaded.",
    })
  }

  const viewResume = () => {
    setShowResumeModal(true)
    toast({
      title: "Resume Opened!",
      description: "Resume opened for viewing.",
    })
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    }

    try {
      // EmailJS integration would go here
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setFormSubmitted(true)
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChatSubmit = async () => {
    if (!chatMessage.trim()) return

    setChatResponse("Thinking...")

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Hello! I'm Dharaneesh's AI assistant. I can help you learn more about his projects and skills!",
        "That's a great question! Dharaneesh specializes in Full Stack Development and AI/ML solutions.",
        "I'd be happy to help! You can explore his projects or contact him directly for collaboration.",
        "Dharaneesh has experience with React, Python, Deep Learning, and modern web technologies.",
      ]
      setChatResponse(responses[Math.floor(Math.random() * responses.length)])
    }, 1500)
  }

  const skills = [
    { name: "React/Next.js", level: 95, color: "from-blue-400 to-blue-500" },
    { name: "TypeScript", level: 90, color: "from-cyan-400 to-cyan-500" },
    { name: "Node.js", level: 85, color: "from-emerald-400 to-emerald-500" },
    { name: "Python", level: 90, color: "from-indigo-400 to-indigo-500" },
    { name: "MongoDB", level: 85, color: "from-green-400 to-green-500" },
    { name: "Deep Learning", level: 80, color: "from-purple-400 to-purple-500" },
  ]

  const projects = [
    {
      title: "Resume Analyzer",
      category: "AI",
      image: "AI resume analysis dashboard with charts",
      description:
        "AI-powered resume analysis tool using Deep Learning and NLP for intelligent resume scoring and feedback",
      technologies: ["Python", "Deep Learning", "MongoDB", "React", "TensorFlow", "NLP"],
      liveDemo: "#",
      github: "https://github.com/Dharaneesh05/resume-frontend.git",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "E-Commerce Platform",
      category: "Full Stack",
      image: "modern ecommerce platform with shopping cart",
      description: "Complete e-commerce solution with payment integration, inventory management, and admin dashboard",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express", "JWT"],
      liveDemo: "#",
      github: "#",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "AI Chat Application",
      category: "Full Stack",
      image: "AI chatbot interface with modern design",
      description: "Real-time chat application with AI integration, message encryption, and file sharing capabilities",
      technologies: ["React", "Node.js", "OpenAI", "Socket.io", "Redis", "PostgreSQL"],
      liveDemo: "#",
      github: "#",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Task Management App",
      category: "Frontend",
      image: "sleek task management dashboard",
      description: "Productivity app with drag-and-drop functionality, team collaboration, and progress tracking",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"],
      liveDemo: "#",
      github: "#",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Weather Analytics Dashboard",
      category: "Full Stack",
      image: "weather analytics dashboard with charts",
      description: "Real-time weather data visualization with predictive analytics and location-based forecasting",
      technologies: ["React", "Python", "FastAPI", "PostgreSQL", "Chart.js", "Docker"],
      liveDemo: "#",
      github: "#",
      gradient: "from-cyan-500 to-cyan-600",
    },
    {
      title: "Machine Learning Model Trainer",
      category: "AI",
      image: "ML model training interface",
      description:
        "Web-based platform for training and deploying machine learning models with automated hyperparameter tuning",
      technologies: ["Python", "Scikit-learn", "Flask", "TensorFlow", "Pandas", "NumPy"],
      liveDemo: "#",
      github: "#",
      gradient: "from-pink-500 to-pink-600",
    },
  ]

  const certifications = [
    {
      title: "MongoDB Associate Developer",
      issuer: "MongoDB University",
      date: "2025",
      color: "from-green-400 to-green-500",
    },
    {
      title: "Oracle APEX Cloud Developer",
      issuer: "Oracle",
      date: "2025",
      color: "from-orange-400 to-orange-500",
    },
  ]

  // Enhanced filtering logic
  const categories = ["All", "Full Stack", "AI", "Frontend"]
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>()
    projects.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech))
    })
    return Array.from(techSet).sort()
  }, [])

  const filteredProjects = useMemo(() => {
    let filtered = projects

    // Filter by category
    if (projectFilter !== "All") {
      filtered = filtered.filter((project) => project.category === projectFilter)
    }

    // Filter by technologies
    if (technologyFilters.length > 0) {
      filtered = filtered.filter((project) => technologyFilters.every((tech) => project.technologies.includes(tech)))
    }

    return filtered
  }, [projectFilter, technologyFilters])

  const handleCategoryFilter = (category: string) => {
    setProjectFilter(category)
  }

  const handleTechnologyFilter = (technology: string) => {
    setTechnologyFilters((prev) =>
      prev.includes(technology) ? prev.filter((t) => t !== technology) : [...prev, technology],
    )
  }

  const handleClearFilters = () => {
    setProjectFilter("All")
    setTechnologyFilters([])
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] relative">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Resume - Dharaneesh C</h2>
              <Button
                onClick={() => setShowResumeModal(false)}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-4 h-[calc(100%-80px)]">
              <iframe
                src="/resume.pdf"
                className="w-full h-full border-0 rounded"
                title="Dharaneesh C Resume"
              />
            </div>
          </div>
        </div>
      )}

      {/* CTA Popup */}
      <CTAPopup onContactClick={() => scrollToSection("contact")} />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 shadow-lg animate-bounce-in"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Navigation - Fixed at top with black background and orange accents */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-black/95 backdrop-blur-md shadow-lg border-b border-orange-500/20" : "bg-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Left - Logo */}
            <div className="text-2xl md:text-3xl font-bold animate-slide-in-left">
              <button 
                onClick={() => scrollToSection("home")}
                className="text-orange-500 hover:text-orange-400 transition-colors duration-300"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Dharaneesh C
              </button>
            </div>

            {/* Center - Navigation Links */}
            <div className="hidden md:flex space-x-8 animate-slide-in-down">
              {["Home", "About", "Skills", "Projects", "Certifications", "Demo", "Contact"].map(
                (item, index) => {
                  const sectionId = item.toLowerCase()
                  return (
                    <button
                      key={item}
                      onClick={() => scrollToSection(sectionId)}
                      className={`relative transition-all duration-500 hover:text-orange-500 font-medium hover:scale-105 stagger-${index + 1} animate-fade-in-down opacity-0 nav-link ${
                        activeSection === sectionId ? "text-orange-500 active" : "text-white"
                      }`}
                    >
                      {item}
                    </button>
                  )
                },
              )}
            </div>

            {/* Right - Hire Me button, Dark Mode Toggle, and Social Icons */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 btn-orange"
              >
                Hire Me
              </Button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="hidden md:flex text-white hover:text-orange-500 transition-all duration-300 hover:scale-105 text-xl md:text-2xl"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>

              {/* Social Icons */}
              <div className="hidden md:flex items-center space-x-2">
                <a
                  href="https://linkedin.com/in/dharaneesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-500 transition-all duration-300 hover:scale-105"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/Dharaneesh05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-all duration-300 hover:scale-105"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white transition-transform duration-300 hover:scale-110"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Slide-in from right with fade */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-black/95 backdrop-blur-md px-4 py-4 space-y-4 border-t border-orange-500/20">
            {["Home", "About", "Skills", "Projects", "Certifications", "Demo", "Contact"].map((item, index) => {
              const sectionId = item.toLowerCase()
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(sectionId)}
                  className="block w-full text-left text-white hover:text-orange-500 transition-all duration-300 py-2 font-medium animate-slide-in-left nav-link"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                </button>
              )
            })}
            {/* Mobile Social Icons */}
            <div className="flex items-center space-x-4 pt-4 border-t border-orange-500/20">
              <button
                onClick={toggleDarkMode}
                className="text-white hover:text-orange-500 transition-all duration-300 hover:scale-105"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              <a
                href="https://linkedin.com/in/dharaneesh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-500 transition-all duration-300 hover:scale-105"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/Dharaneesh05"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-all duration-300 hover:scale-105"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full-screen height with black background and subtle gradient */}
      <section
        id="home"
        className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-20 bg-gradient-to-br from-black to-gray-800 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="flex-1 space-y-8 fade-in">
              <div className="space-y-6">
                <div
                  className="flex items-center space-x-2 text-sm md:text-base text-purple-500 animate-fade-in-up opacity-0"
                  style={{ animationDelay: "0.2s" }}
                >
                  <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
                  <span>Hi, I am Dharaneesh C</span>
                </div>
                <h1
                  className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in-up opacity-0 uppercase"
                  style={{ animationDelay: "0.4s", fontFamily: 'Poppins, sans-serif' }}
                >
                  <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer inline-block">
                    Full Stack & AI Developer
                  </span>
                </h1>
                <p
                  className="text-base md:text-lg text-white leading-relaxed max-w-lg animate-fade-in-up opacity-0"
                  style={{ animationDelay: "0.6s" }}
                >
                  Building innovative web solutions and AI-powered applications with modern technologies and creative
                  problem-solving.
                </p>
              </div>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0"
                style={{ animationDelay: "0.8s" }}
              >
                <Button
                  onClick={() => scrollToSection("projects")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 btn-orange"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  View Projects
                </Button>
                <Button
                  onClick={downloadResume}
                  className="border-2 border-orange-500 text-orange-500 hover:bg-orange-100 hover:text-orange-600 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </Button>
                <Button
                  onClick={viewResume}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 btn-orange"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  View Resume
                </Button>
              </div>

              {/* Social Links in Hero */}
              <div className="flex items-center space-x-6 pt-4 animate-fade-in-up opacity-0" style={{ animationDelay: "1s" }}>
                <a
                  href="https://linkedin.com/in/dharaneesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-500 transition-all duration-300 hover:scale-105 group"
                >
                  <Linkedin className="w-6 h-6 group-hover:animate-pulse" />
                  <span className="text-white group-hover:text-blue-500">View LinkedIn</span>
                </a>
                <a
                  href="https://github.com/Dharaneesh05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-all duration-300 hover:scale-105 group"
                >
                  <Github className="w-6 h-6 group-hover:animate-pulse" />
                  <span className="group-hover:text-gray-300">View GitHub</span>
                </a>
              </div>

              {/* Stats Widget at Bottom */}
              <div className="pt-8 animate-fade-in-up opacity-0" style={{ animationDelay: "1.2s" }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">10+</div>
                    <div className="text-sm text-gray-400">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">2+</div>
                    <div className="text-sm text-gray-400">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">5+</div>
                    <div className="text-sm text-gray-400">Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">3+</div>
                    <div className="text-sm text-gray-400">Certifications</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Profile Image */}
            <div
              className="flex-1 flex justify-center lg:justify-end fade-in animate-fade-in-right opacity-0 mt-8 md:mt-0"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="relative group">
                <div className="w-64 h-64 md:w-80 md:h-80 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-1">
                    <Image
                      src="/placeholder.svg?height=400&width=400&text=Dharaneesh+C"
                      alt="Dharaneesh C - Full Stack & AI Developer"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover rounded-full profile-image border-4 border-orange-500 hover:rotate-3 transition-transform duration-500"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 md:px-8" style={{ backgroundColor: '#4B5563' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4 underline">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full animate-expand"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-6 fade-in">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Passionate Developer & AI Enthusiast</h3>
              <p className="text-white leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
                I'm Dharaneesh, a Full Stack Developer and AI/Data Science student at Kongu Engineering College,
                specializing in web development and AI solutions using React, Python, and Deep Learning. I'm passionate
                about creating innovative solutions that bridge the gap between technology and user experience.
              </p>
              <p className="text-white leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
                When not coding, I explore machine learning models and contribute to open-source projects. I believe in
                continuous learning and staying updated with the latest technologies to deliver cutting-edge solutions.
              </p>

              <ul className="space-y-4 text-white">
                <li className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-orange-500" />
                  <span>Full Stack Web Development</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Brain className="w-5 h-5 text-orange-500" />
                  <span>Artificial Intelligence & Machine Learning</span>
                </li>
                <li className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  <span>Continuous Learning & Innovation</span>
                </li>
              </ul>
            </div>

            <div className="flex-1 relative fade-in">
              <Card className="hover:shadow-2xl transition-all duration-500 hover:scale-105 fade-in border-border group card-hover hover-glow gradient-card">
                <CardContent className="p-0">
                  <Image
                    src="/placeholder.svg?height=500&width=400&text=About+Dharaneesh"
                    alt="Dharaneesh C working on projects"
                    width={400}
                    height={500}
                    className="w-full h-96 object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">Skills</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full animate-expand"></div>
            <p className="text-white mt-4 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-500 hover:scale-105 fade-in border-border group card-hover hover-glow gradient-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <h3 className="text-white font-semibold group-hover:text-orange-500 transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000 ease-out animate-skill-bar shadow-sm`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <div
                    className={`bg-gradient-to-r ${skill.color} bg-clip-text text-transparent text-sm mt-2 font-semibold`}
                  >
                    {skill.level}%
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">My Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full animate-expand"></div>
            <p className="text-white mt-4 max-w-2xl mx-auto">
              Recent projects that showcase my skills and expertise
            </p>
          </div>

          {/* Project Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 fade-in">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  projectFilter === category 
                    ? "bg-orange-500 text-white" 
                    : "bg-gray-700 text-white hover:bg-orange-500"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <Card
                  key={`${project.title}-${index}`}
                  className="hover:shadow-2xl transition-all duration-500 hover:scale-105 fade-in border-border group card-hover hover-glow gradient-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=250&width=400&text=${project.image}`}
                      alt={project.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <Badge
                        className={`bg-gradient-to-r ${project.gradient} text-white border-none shadow-lg`}
                      >
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 group-hover:text-white transition-colors">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs bg-gray-600 text-gray-200 hover:bg-gray-500"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 group"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                        Live Demo
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 bg-transparent text-white group">
                        <Github className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                        GitHub
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                <p className="text-gray-300 mb-4">Try adjusting your filters to see more projects.</p>
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-16 px-4 md:px-8" style={{ backgroundColor: '#4B5563' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">Certifications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full animate-expand"></div>
            <p className="text-white mt-4 max-w-2xl mx-auto">Professional certifications and achievements</p>
          </div>

          <div className="flex flex-col gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-500 hover:scale-105 fade-in border-border group card-hover hover-glow gradient-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${cert.color} rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-gray-300 mb-2 group-hover:text-white transition-colors">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center text-gray-300 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {cert.date}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive AI Demo Section */}
      <section id="demo" className="py-16 px-4 md:px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">Interactive AI Demo</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full animate-expand"></div>
            <p className="text-white mt-4 max-w-2xl mx-auto">
              Try out my AI assistant! Ask questions about my projects, skills, or anything else.
            </p>
          </div>

          <Card className="hover:shadow-2xl transition-all duration-500 hover:scale-105 fade-in border-border group card-hover hover-glow gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Brain className="w-6 h-6 mr-2 text-orange-500" />
                AI Assistant Demo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask me anything about Dharaneesh's work..."
                  className="flex-1 border-gray-600 bg-gray-800 text-white focus:border-orange-500"
                  onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
                />
                <Button
                  onClick={handleChatSubmit}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 group"
                >
                  <MessageSquare className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  Ask AI
                </Button>
              </div>

              {chatResponse && (
                <Card className="bg-gray-800 border-gray-700 animate-fade-in-up">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-white">{chatResponse}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 md:px-8" style={{ backgroundColor: '#4B5563' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full animate-expand"></div>
            <p className="text-white mt-4 max-w-2xl mx-auto">
              Ready to start your next project? Let's discuss how I can help bring your ideas to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-8 fade-in">
              <div>
                <h3 className="text-2xl font-bold text-orange-500 mb-6">Let's create something amazing together</h3>
                <p className="text-white leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                  want to say hi, I'll try my best to get back to you!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Email</div>
                    <div className="text-white font-semibold group-hover:text-orange-500 transition-colors">
                      dharaneeshc2006@gmail.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Phone</div>
                    <div className="text-white font-semibold group-hover:text-orange-500 transition-colors">
                      +91 (555) 123-4567
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Location</div>
                    <div className="text-white font-semibold group-hover:text-orange-500 transition-colors">
                      Coimbatore, India
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com/in/dharaneesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-white shadow-lg group"
                >
                  <Linkedin className="w-5 h-5 text-white group-hover:animate-pulse" />
                </a>
                <a
                  href="https://github.com/Dharaneesh05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-white shadow-lg group"
                >
                  <Github className="w-5 h-5 text-white group-hover:animate-pulse" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-400 hover:bg-blue-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-white shadow-lg group"
                >
                  <Twitter className="w-5 h-5 text-white group-hover:animate-pulse" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="hover:shadow-2xl transition-all duration-500 hover:scale-105 fade-in border-border group card-hover hover-glow gradient-card">
                <CardContent className="p-8">
                  {formSubmitted ? (
                    <div className="text-center py-12 animate-fade-in-up">
                      <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                      <p className="text-gray-300">Thank you for reaching out. I'll get back to you soon.</p>
                      <Button
                        onClick={() => setFormSubmitted(false)}
                        variant="outline"
                        className="mt-4 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white text-sm font-semibold mb-2">Name</label>
                          <Input
                            name="name"
                            required
                            className="border-gray-600 bg-gray-800 text-white focus:border-orange-500 focus:ring-orange-500 transition-all duration-300"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-white text-sm font-semibold mb-2">Email</label>
                          <Input
                            name="email"
                            type="email"
                            required
                            className="border-gray-600 bg-gray-800 text-white focus:border-orange-500 focus:ring-orange-500 transition-all duration-300"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-white text-sm font-semibold mb-2">Message</label>
                        <Textarea
                          name="message"
                          required
                          className="border-gray-600 bg-gray-800 text-white focus:border-orange-500 focus:ring-orange-500 min-h-[120px] transition-all duration-300"
                          placeholder="Tell me about your project..."
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Sending...
                          </div>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-black border-t border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Brand */}
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">
                <span className="text-orange-500">Dharaneesh C</span>
              </h3>
              <p className="text-gray-400 mb-2">Full Stack & AI Developer</p>
            </div>

            {/* Navigation */}
            <div className="flex space-x-6 mb-4 md:mb-0">
              {["Home", "About", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Back to Top */}
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="border-gray-600 hover:bg-orange-500 hover:border-orange-500 group bg-transparent text-white"
            >
              <ArrowUp className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              Back to Top
            </Button>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-500">© 2025 Dharaneesh C. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
