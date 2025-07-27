"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const socialActivity = [
  {
    platform: "GitHub",
    icon: Github,
    activity: "Pushed to resume-frontend",
    description: "Added new AI model integration for better resume analysis",
    time: "2 hours ago",
    link: "https://github.com/Dharaneesh05/resume-frontend",
  },
  {
    platform: "LinkedIn",
    icon: Linkedin,
    activity: "Shared article",
    description: "Deep Learning in Web Development: A Practical Guide",
    time: "1 day ago",
    link: "https://linkedin.com/in/dharaneesh",
  },
  {
    platform: "GitHub",
    icon: Github,
    activity: "Created new repository",
    description: "AI-powered task management system with React and Python",
    time: "3 days ago",
    link: "https://github.com/Dharaneesh05",
  },
]

export function SocialFeed() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {socialActivity.map((item, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
              <item.icon className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Badge variant="secondary" className="text-xs">
                  {item.platform}
                </Badge>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
              <p className="text-sm font-medium text-foreground">{item.activity}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
            </div>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
