import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Dharaneesh Portfolio",
  description:
    "Professional portfolio of Dharaneesh C, a Full Stack Developer and AI/Data Science student specializing in web development and AI solutions using React, Python, and Deep Learning.",
  keywords: "Full Stack Developer, AI Developer, React, Python, Deep Learning, Web Development, Dharaneesh C",
  authors: [{ name: "Dharaneesh C" }],
  robots: "index, follow",
  openGraph: {
    title: "Dharaneesh Portfolio",
    description: "Building innovative web solutions and AI-powered applications",
    type: "website",
    locale: "en_US",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-inter antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
