"use client"

import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "29",
    period: "mois",
    description: "Parfait pour les petites entreprises",
    features: [
      "100 appels par mois",
      "1 agent IA inclus",
      "Analytics de base",
      "Support email",
      "Intégrations standard",
    ],
    popular: false,
    gradient: "from-gray-50 to-white",
  },
  {
    name: "Professional",
    price: "99",
    period: "mois",
    description: "Idéal pour les entreprises en croissance",
    features: [
      "1 000 appels par mois",
      "5 agents IA personnalisés",
      "Analytics avancés",
      "Support prioritaire",
      "API complète",
      "KPIs personnalisés",
      "Exports de données",
    ],
    popular: true,
    gradient: "from-sylog-indigo/5 to-sylog-teal/5",
  },
  {
    name: "Enterprise",
    price: "299",
    period: "mois",
    description: "Pour les grandes organisations",
    features: [
      "Appels illimités",
      "Agents IA illimités",
      "Analytics en temps réel",
      "Support dédié 24/7",
      "Intégrations sur mesure",
      "Conformité RGPD",
      "Formation équipe",
      "SLA garanti",
    ],
    popular: false,
    gradient: "from-sylog-gold/5 to-sylog-emerald/5",
  },
]

export function Pricing() {
  return (
    <section id="tarifs" className="py-24 bg-gradient-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-sylog-ink mb-6">
            Tarifs <span className="text-gradient">transparents</span>
          </h2>
          <p className="text-xl text-sylog-ink/70 max-w-3xl mx-auto">
            Choisissez le plan qui correspond à vos besoins. Tous les plans incluent un essai gratuit de 14 jours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover-lift ${
                plan.popular
                  ? "border-sylog-teal bg-white card-shadow scale-105"
                  : "border-gray-200 bg-white card-shadow hover:border-sylog-teal/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Plus populaire
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-poppins font-bold text-sylog-ink mb-2">{plan.name}</h3>
                <p className="text-sylog-ink/60 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-poppins font-bold text-sylog-ink">{plan.price}€</span>
                  <span className="text-sylog-ink/60 ml-2">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className="w-5 h-5 bg-sylog-emerald rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sylog-ink/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-3 ${
                  plan.popular
                    ? "bg-gradient-primary hover:opacity-90 text-white"
                    : "border-sylog-indigo text-sylog-indigo hover:bg-sylog-indigo hover:text-white"
                } transition-all duration-300`}
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <Link href="/dashboard">Commencer l'essai gratuit</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sylog-ink/60">
            Besoin d'un plan sur mesure ?{" "}
            <Link href="#contact" className="text-sylog-indigo hover:text-sylog-teal transition-colors font-medium">
              Contactez notre équipe
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
