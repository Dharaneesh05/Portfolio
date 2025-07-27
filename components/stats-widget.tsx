"use client"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface StatProps {
  end: number
  label: string
  icon: string
  suffix?: string
}

function AnimatedCounter({ end, label, icon, suffix = "" }: StatProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = end / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [end])

  return (
    <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card border-border">
      <CardContent className="p-6">
        <div className="text-4xl mb-2">{icon}</div>
        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          {count}
          {suffix}
        </div>
        <div className="text-sm text-muted-foreground font-medium">{label}</div>
      </CardContent>
    </Card>
  )
}

export function StatsWidget() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <AnimatedCounter end={3} label="Years Experience" icon="🚀" suffix="+" />
      <AnimatedCounter end={15} label="Projects Completed" icon="💼" suffix="+" />
      <AnimatedCounter end={5} label="Happy Clients" icon="😊" suffix="+" />
      <AnimatedCounter end={2} label="Certifications" icon="🏆" suffix="+" />
    </div>
  )
}
