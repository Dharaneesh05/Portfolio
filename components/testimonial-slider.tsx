"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Project Manager at TechCorp",
    content:
      "Dharaneesh's AI project was impressive. His deep learning model improved our data processing efficiency by 40%. Highly recommended!",
    avatar: "professional woman project manager",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "Team Lead at InnovateLabs",
    content:
      "Working with Dharaneesh was fantastic. His full-stack development skills and attention to detail are exceptional.",
    avatar: "professional man team lead",
    rating: 5,
  },
  {
    name: "Dr. Priya Sharma",
    role: "Professor at Kongu Engineering College",
    content: "Dharaneesh is one of our brightest students. His passion for AI and web development is truly inspiring.",
    avatar: "professional woman professor",
    rating: 5,
  },
]

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <Card className="bg-card border-border shadow-xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <Quote className="w-12 h-12 text-primary mb-6 opacity-50" />
            <p className="text-lg text-muted-foreground mb-6 italic leading-relaxed">
              "{testimonials[currentIndex].content}"
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary p-0.5">
                <Image
                  src={`/placeholder.svg?height=64&width=64&text=${testimonials[currentIndex].avatar}`}
                  alt={testimonials[currentIndex].name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover rounded-full bg-background"
                />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{testimonials[currentIndex].name}</h4>
                <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevTestimonial}
          className="rounded-full border-border hover:bg-accent bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextTestimonial}
          className="rounded-full border-border hover:bg-accent bg-transparent"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
