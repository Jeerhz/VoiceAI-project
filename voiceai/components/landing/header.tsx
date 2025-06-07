"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-poppins font-bold text-sylog-ink">VoiceSurvey</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#fonctionnalites" className="text-sylog-ink hover:text-sylog-indigo transition-colors">
              Fonctionnalités
            </Link>
            <Link href="#tarifs" className="text-sylog-ink hover:text-sylog-indigo transition-colors">
              Tarifs
            </Link>
            <Link href="#contact" className="text-sylog-ink hover:text-sylog-indigo transition-colors">
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Connexion</Link>
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90 text-white" asChild>
              <Link href="/dashboard">Essai gratuit</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#fonctionnalites"
                className="text-sylog-ink hover:text-sylog-indigo transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Fonctionnalités
              </Link>
              <Link
                href="#tarifs"
                className="text-sylog-ink hover:text-sylog-indigo transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tarifs
              </Link>
              <Link
                href="#contact"
                className="text-sylog-ink hover:text-sylog-indigo transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Connexion</Link>
                </Button>
                <Button className="bg-gradient-primary text-white" asChild>
                  <Link href="/dashboard">Essai gratuit</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
