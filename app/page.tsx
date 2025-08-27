
"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import {
  Mail,
  Download,
  ExternalLink,
  Menu,
  X,
  Phone,
  MapPin,
  Send,
  ArrowUp,
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
  Filter,
  ChevronDown,
  Award,
  Briefcase,
  GraduationCap,
  Star,
  Users,
  Laptop,
  Target,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
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
  const [showFilters, setShowFilters] = useState(false)
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

    // Enhanced Intersection Observer for animations
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

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

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
      // Send email to dharaneeshc2006@gmail.com
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setFormSubmitted(true)
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        })
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error("Failed to send message")
      }
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
    { name: "React/Next.js", level: 95, color: "from-blue-400 to-blue-500", icon: Code },
    { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-700", icon: Code },
    { name: "Node.js", level: 85, color: "from-green-400 to-green-500", icon: Zap },
    { name: "Python", level: 90, color: "from-yellow-400 to-yellow-500", icon: Brain },
    { name: "MongoDB", level: 85, color: "from-green-600 to-green-700", icon: Laptop },
    { name: "Deep Learning", level: 80, color: "from-purple-400 to-purple-500", icon: Brain },
    { name: "Machine Learning", level: 85, color: "from-pink-400 to-pink-500", icon: Target },
    { name: "Flask/FastAPI", level: 80, color: "from-red-400 to-red-500", icon: Zap },
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
      featured: true,
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
      featured: true,
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
      featured: false,
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
      featured: false,
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
      featured: true,
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
      featured: false,
    },
  ]

  const certifications = [
    {
      title: "MongoDB Associate Developer",
      issuer: "MongoDB University",
      date: "2025",
      color: "from-green-400 to-green-500",
      type: "certification",
      icon: Award,
    },
    {
      title: "Oracle APEX Cloud Developer",
      issuer: "Oracle",
      date: "2025",
      color: "from-orange-400 to-orange-500",
      type: "certification",
      icon: Award,
    },
    {
      title: "Full Stack Developer Intern",
      issuer: "Tech Solutions Inc.",
      date: "2024",
      color: "from-blue-400 to-blue-500",
      type: "internship",
      icon: Briefcase,
    },
    {
      title: "AI/ML Research Intern",
      issuer: "Data Science Labs",
      date: "2024",
      color: "from-purple-400 to-purple-500",
      type: "internship",
      icon: Briefcase,
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in-up">
          <div className="bg-background rounded-xl w-full max-w-4xl h-[90vh] relative animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold">Resume - Dharaneesh C</h2>
              <Button
                onClick={() => setShowResumeModal(false)}
                variant="ghost"
                size="sm"
                className="hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6 h-[calc(100%-80px)]">
              <iframe
                src="/resume.pdf"
                className="w-full h-full border-0 rounded-lg"
                title="Dharaneesh C Resume"
              />
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 shadow-lg animate-bounce-in hover-glow"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border" : "bg-background"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="text-2xl md:text-3xl font-bold animate-slide-in-left">
              <button 
                onClick={() => scrollToSection("home")}
                className="text-orange-500 hover:text-orange-600 transition-colors duration-300"
              >
                Dharaneesh C
              </button>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8 animate-slide-in-top">
              {["Home", "About", "Skills", "Projects", "Certifications", "Demo", "Contact"].map(
                (item, index) => {
                  const sectionId = item.toLowerCase()
                  return (
                    <button
                      key={item}
                      onClick={() => scrollToSection(sectionId)}
                      className={`nav-link transition-all duration-300 font-medium hover:scale-105 stagger-${index + 1} animate-fade-in-down opacity-0 ${
                        activeSection === sectionId ? "active" : ""
                      }`}
                    >
                      {item}
                    </button>
                  )
                },
              )}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => scrollToSection("contact")}
                className="btn-primary hidden md:flex"
              >
                Hire Me
              </Button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="hidden md:flex w-10 h-10 rounded-full bg-muted hover:bg-muted/80 items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-background/95 backdrop-blur-md px-4 py-4 space-y-4 border-t border-border">
            {["Home", "About", "Skills", "Projects", "Certifications", "Demo", "Contact"].map((item, index) => {
              const sectionId = item.toLowerCase()
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(sectionId)}
                  className="block w-full text-left py-2 font-medium hover:text-orange-500 transition-all duration-300 animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                </button>
              )
            })}
            <div className="flex items-center space-x-4 pt-4 border-t border-border">
              <Button
                onClick={() => scrollToSection("contact")}
                className="btn-primary"
              >
                Hire Me
              </Button>
              <button
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 fade-in">
              <div className="space-y-6">
                <div
                  className="flex items-center space-x-2 text-sm md:text-base text-purple-500 animate-fade-in-up opacity-0"
                  style={{ animationDelay: "0.2s" }}
                >
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span>Hi, I am Dharaneesh C</span>
                </div>
                <h1
                  className="text-hero bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer uppercase animate-fade-in-up opacity-0"
                  style={{ animationDelay: "0.4s" }}
                >
                  Full Stack & AI Developer
                </h1>
                <p
                  className="text-body text-muted-foreground leading-relaxed max-w-lg animate-fade-in-up opacity-0"
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
                  className="btn-primary"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  View Projects
                </Button>
                <Button
                  onClick={downloadResume}
                  className="btn-outline"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </Button>
                <Button
                  onClick={viewResume}
                  className="btn-secondary"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  View Resume
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 animate-fade-in-up opacity-0" style={{ animationDelay: "1s" }}>
                {[
                  { number: "10+", label: "Projects" },
                  { number: "2+", label: "Years" },
                  { number: "5+", label: "Clients" },
                  { number: "4+", label: "Certifications" }
                ].map((stat, index) => (
                  <div key={index} className="text-center animate-count-up" style={{ animationDelay: `${1.2 + index * 0.1}s` }}>
                    <div className="stat-counter text-2xl md:text-3xl font-bold">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Profile Image */}
            <div
              className="flex justify-center lg:justify-end fade-in animate-fade-in-right opacity-0"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="relative group">
                <div className="w-80 h-80 md:w-96 md:h-96 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-1 animate-morphing">
                    <Image
                      src="/placeholder.svg?height=400&width=400&text=Dharaneesh+C"
                      alt="Dharaneesh C - Full Stack & AI Developer"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover rounded-full hover:rotate-3 transition-transform duration-500 hover-scale"
                      priority
                    />
                  </div>
                  <div className="absolute -z-10 inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-full blur-3xl animate-pulse-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full animate-expand"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in animate-fade-in-left">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Passionate Developer & AI Enthusiast</h3>
              <p className="text-body leading-relaxed">
                I'm Dharaneesh, a Full Stack Developer and AI/Data Science student at Kongu Engineering College,
                specializing in web development and AI solutions using React, Python, and Deep Learning. I'm passionate
                about creating innovative solutions that bridge the gap between technology and user experience.
              </p>
              <p className="text-body leading-relaxed">
                When not coding, I explore machine learning models and contribute to open-source projects. I believe in
                continuous learning and staying updated with the latest technologies to deliver cutting-edge solutions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {[
                  { icon: Code, text: "Full Stack Development" },
                  { icon: Brain, text: "AI & Machine Learning" },
                  { icon: BookOpen, text: "Continuous Learning" },
                  { icon: Users, text: "Team Collaboration" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <item.icon className="w-5 h-5 text-orange-500 animate-pulse" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-in animate-fade-in-right">
              <Card className="card-professional hover-lift">
                <CardContent className="p-0">
                  <Image
                    src="/placeholder.svg?height=500&width=400&text=About+Dharaneesh"
                    alt="Dharaneesh C working on projects"
                    width={400}
                    height={500}
                    className="w-full h-96 object-cover rounded-xl"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">Skills & Expertise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full animate-expand"></div>
            <p className="text-body text-muted-foreground mt-4 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Card
                key={index}
                className="card-professional hover-lift fade-in animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <skill.icon className="w-6 h-6 text-orange-500 mr-3 animate-pulse" />
                    <h3 className="font-semibold text-lg">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="skill-bar mb-3">
                    <div
                      className={`skill-progress bg-gradient-to-r ${skill.color} animate-skill-progress`}
                      style={{ 
                        width: `${skill.level}%`,
                        animationDelay: `${index * 0.2}s`
                      }}
                    ></div>
                  </div>
                  <div className={`bg-gradient-to-r ${skill.color} bg-clip-text text-transparent text-sm font-semibold`}>
                    {skill.level}% Proficiency
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full animate-expand"></div>
            <p className="text-body text-muted-foreground mt-4 max-w-2xl mx-auto">
              Recent projects that showcase my skills and expertise
            </p>
          </div>

          {/* Enhanced Project Filters */}
          <div className="mb-12 space-y-6 fade-in">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`filter-button ${projectFilter === category ? 'active' : ''}`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Technology Filter Toggle */}
            <div className="text-center">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
              >
                <Filter className="w-4 h-4 mr-2" />
                {showFilters ? "Hide" : "Show"} Technology Filters
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>

            {/* Technology Filters */}
            {showFilters && (
              <Card className="card-professional max-w-4xl mx-auto animate-fade-in-up">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Filter by Technology:</h4>
                      {technologyFilters.length > 0 && (
                        <Button
                          onClick={handleClearFilters}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Clear All
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allTechnologies.map((tech) => (
                        <Badge
                          key={tech}
                          onClick={() => handleTechnologyFilter(tech)}
                          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                            technologyFilters.includes(tech)
                              ? "bg-orange-500 text-white shadow-lg"
                              : "bg-muted text-muted-foreground hover:bg-orange-100 hover:text-orange-600"
                          }`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Filters */}
            {(projectFilter !== "All" || technologyFilters.length > 0) && (
              <Card className="card-professional max-w-2xl mx-auto animate-fade-in-up">
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium text-muted-foreground">Active Filters:</span>
                    {projectFilter !== "All" && (
                      <Badge className="bg-orange-500 text-white">
                        Category: {projectFilter}
                      </Badge>
                    )}
                    {technologyFilters.map((tech) => (
                      <Badge key={tech} className="bg-blue-500 text-white">
                        {tech}
                        <X
                          className="w-3 h-3 ml-1 cursor-pointer hover:bg-white/20 rounded-full"
                          onClick={() => handleTechnologyFilter(tech)}
                        />
                      </Badge>
                    ))}
                    <Button
                      onClick={handleClearFilters}
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                    >
                      Clear All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <Card
                  key={`${project.title}-${index}`}
                  className={`project-card hover-lift fade-in animate-fade-in-up opacity-0 ${
                    project.featured ? 'ring-2 ring-orange-500/20' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    {project.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-orange-500 text-white shadow-lg">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    <Image
                      src={`/placeholder.svg?height=250&width=400&text=${project.image}`}
                      alt={project.title}
                      width={400}
                      height={250}
                      className="project-image w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <Badge className={`bg-gradient-to-r ${project.gradient} text-white border-none shadow-lg`}>
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 hover:text-orange-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs hover:bg-orange-100 hover:text-orange-600 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="btn-primary flex-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Code className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12 animate-fade-in-up">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters to see more projects.</p>
                <Button
                  onClick={handleClearFilters}
                  className="btn-outline"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">Certifications & Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full animate-expand"></div>
            <p className="text-body text-muted-foreground mt-4 max-w-2xl mx-auto">Professional certifications, achievements, and internship experiences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="certificate-card fade-in animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${cert.color} rounded-xl flex items-center justify-center text-2xl shadow-lg hover-scale`}
                    >
                      <cert.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold hover:text-orange-500 transition-colors">
                          {cert.title}
                        </h3>
                        <Badge 
                          className={`${cert.type === 'certification' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'} hover:scale-105 transition-transform`}
                        >
                          {cert.type === 'certification' ? 'Certification' : 'Internship'}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2 font-medium">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center text-muted-foreground text-sm">
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
      <section id="demo" className="py-20 px-4 md:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">Interactive AI Demo</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full animate-expand"></div>
            <p className="text-body text-muted-foreground mt-4 max-w-2xl mx-auto">
              Try out my AI assistant! Ask questions about my projects, skills, or anything else.
            </p>
          </div>

          <Card className="card-professional hover-lift fade-in animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-6 h-6 mr-2 text-orange-500 animate-pulse" />
                AI Assistant Demo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask me anything about Dharaneesh's work..."
                  className="form-input flex-1"
                  onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
                />
                <Button
                  onClick={handleChatSubmit}
                  className="btn-primary"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ask AI
                </Button>
              </div>

              {chatResponse && (
                <Card className="bg-muted border-border animate-fade-in-up">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-foreground">{chatResponse}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full animate-expand"></div>
            <p className="text-body text-muted-foreground mt-4 max-w-2xl mx-auto">
              Ready to start your next project? Let's discuss how I can help bring your ideas to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8 fade-in animate-fade-in-left">
              <div>
                <h3 className="text-2xl font-bold text-orange-500 mb-6">Let's create something amazing together</h3>
                <p className="text-body leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                  want to say hi, I'll try my best to get back to you!
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "dharaneeshc2006@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+91 (555) 123-4567" },
                  { icon: MapPin, label: "Location", value: "Coimbatore, India" }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center space-x-4 group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover-scale">
                      <contact.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-sm">{contact.label}</div>
                      <div className="font-semibold group-hover:text-orange-500 transition-colors">
                        {contact.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="fade-in animate-fade-in-right">
              <Card className="contact-form hover-lift">
                <CardContent className="p-8">
                  {formSubmitted ? (
                    <div className="text-center py-12 animate-fade-in-up">
                      <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                      <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon.</p>
                      <Button
                        onClick={() => setFormSubmitted(false)}
                        className="btn-outline mt-4"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block font-semibold mb-2">Name</label>
                          <Input
                            name="name"
                            required
                            className="form-input"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-2">Email</label>
                          <Input
                            name="email"
                            type="email"
                            required
                            className="form-input"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">Message</label>
                        <Textarea
                          name="message"
                          required
                          className="form-input min-h-[120px]"
                          placeholder="Tell me about your project..."
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full"
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="loading-spinner mr-2"></div>
                            Sending...
                          </div>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
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
      <footer className="py-12 px-4 md:px-8 footer-gradient text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">
                <span className="text-orange-500">Dharaneesh C</span>
              </h3>
              <p className="text-gray-300">Full Stack & AI Developer</p>
              <p className="text-gray-400 text-sm mt-2">Building the future, one line of code at a time.</p>
            </div>

            {/* Navigation */}
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-6">
                {["Home", "About", "Projects", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-gray-300 hover:text-orange-500 transition-colors duration-300 font-medium"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Back to Top */}
            <div className="text-center md:text-right">
              <Button
                onClick={scrollToTop}
                variant="outline"
                className="border-gray-600 hover:bg-orange-500 hover:border-orange-500 text-white"
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Back to Top
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 Dharaneesh C. All rights reserved. Crafted with passion and precision.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
