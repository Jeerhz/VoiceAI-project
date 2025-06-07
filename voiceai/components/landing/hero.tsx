"use client"

import Link from "next/link"
import { ArrowRight, Play, Phone, Bot, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-light">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sylog-teal/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-sylog-indigo/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sylog-gold/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-sylog-teal/20 text-sm font-medium text-sylog-indigo mb-8 animate-slide-up">
            <span className="w-2 h-2 bg-sylog-emerald rounded-full mr-2 animate-pulse-glow"></span>
            Nouvelle génération d'enquêtes vocales
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-poppins font-bold text-sylog-ink mb-6 animate-slide-up text-shadow">
            Révolutionnez vos <span className="text-gradient">enquêtes de satisfaction</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl text-sylog-ink/70 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Menez des enquêtes vocales intelligentes avec des agents IA personnalisés. Obtenez des insights précieux en
            temps réel.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-white px-8 py-4 text-lg hover-lift hover-glow"
              asChild
            >
              <Link href="/dashboard">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-sylog-indigo/20 hover:bg-sylog-indigo/5 hover-lift"
            >
              <Play className="mr-2 h-5 w-5" />
              Voir la démo
            </Button>
          </div>

          {/* Feature Icons */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex flex-col items-center p-6 rounded-xl glass-effect hover-lift">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-poppins font-semibold text-sylog-ink mb-2">Appels automatisés</h3>
              <p className="text-sm text-sylog-ink/60 text-center">
                Campagnes d'appels intelligentes et personnalisées
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl glass-effect hover-lift">
              <div className="w-12 h-12 bg-gradient-to-r from-sylog-teal to-sylog-emerald rounded-lg flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-poppins font-semibold text-sylog-ink mb-2">Agents IA</h3>
              <p className="text-sm text-sylog-ink/60 text-center">Assistants vocaux adaptatifs et naturels</p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl glass-effect hover-lift">
              <div className="w-12 h-12 bg-gradient-to-r from-sylog-gold to-sylog-red rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-poppins font-semibold text-sylog-ink mb-2">Analytics avancés</h3>
              <p className="text-sm text-sylog-ink/60 text-center">Insights en temps réel et KPIs personnalisés</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
