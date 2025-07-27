"use client"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

interface CTAPopupProps {
  onContactClick: () => void
}

export function CTAPopup({ onContactClick }: CTAPopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 10000) // Show after 10 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleContactClick = () => {
    setIsOpen(false)
    onContactClick()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md gradient-card border border-orange-500/20">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold gradient-text">Ready to work together?</DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-6 py-4">
          <p className="text-gray-300">
            Let's discuss your next project and bring your ideas to life with cutting-edge technology!
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleContactClick} className="gradient-primary text-white flex-1 hover-glow">
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 border-orange-500/30 text-orange-300 hover:bg-orange-500/10"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
