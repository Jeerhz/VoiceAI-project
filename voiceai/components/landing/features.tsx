"use client"

import { Phone, Bot, BarChart3, Target, Zap, Shield } from "lucide-react"

const features = [
  {
    icon: Phone,
    title: "Campagnes d'appels intelligentes",
    description:
      "Créez et gérez des campagnes d'appels automatisées avec des scénarios personnalisés et des questions adaptatives.",
    gradient: "from-sylog-indigo to-sylog-teal",
  },
  {
    icon: Bot,
    title: "Agents IA personnalisés",
    description:
      "Configurez des assistants vocaux avec des personnalités uniques, des intonations naturelles et des réponses contextuelles.",
    gradient: "from-sylog-teal to-sylog-emerald",
  },
  {
    icon: BarChart3,
    title: "Analytics en temps réel",
    description:
      "Suivez vos KPIs, analysez les sentiments et obtenez des insights précieux sur la satisfaction client.",
    gradient: "from-sylog-gold to-sylog-red",
  },
  {
    icon: Target,
    title: "KPIs personnalisables",
    description:
      "Définissez vos propres indicateurs de performance et mesurez ce qui compte vraiment pour votre entreprise.",
    gradient: "from-sylog-emerald to-sylog-teal",
  },
  {
    icon: Zap,
    title: "Traitement en lot",
    description:
      "Lancez des milliers d'appels simultanément avec une gestion intelligente des files d'attente et des priorités.",
    gradient: "from-sylog-red to-sylog-indigo",
  },
  {
    icon: Shield,
    title: "Sécurité & conformité",
    description:
      "Respectez les réglementations RGPD avec un chiffrement de bout en bout et une gestion sécurisée des données.",
    gradient: "from-sylog-indigo to-sylog-gold",
  },
]

export function Features() {
  return (
    <section id="fonctionnalites" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-sylog-ink mb-6">
            Fonctionnalités <span className="text-gradient">avancées</span>
          </h2>
          <p className="text-xl text-sylog-ink/70 max-w-3xl mx-auto">
            Découvrez comment VoiceSurvey transforme vos enquêtes de satisfaction avec des technologies d'intelligence
            artificielle de pointe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-white card-shadow hover-lift border border-gray-100 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-xl font-poppins font-semibold text-sylog-ink mb-4">{feature.title}</h3>

              <p className="text-sylog-ink/70 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
