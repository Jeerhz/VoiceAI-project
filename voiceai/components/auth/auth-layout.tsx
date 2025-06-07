import type React from "react";
import { Phone } from "lucide-react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center mb-8 gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-poppins font-bold">VoiceSurvey</span>
          </Link>

          {/* Title */}
          <h1 className="text-3xl font-poppins font-bold mb-2">{title}</h1>
          <p className="text-gray-600 mb-8">{subtitle}</p>

          {/* Form */}
          {children}
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-sylog-indigo via-sylog-teal to-sylog-indigo relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-sylog-gold/10 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-10 text-white">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-poppins font-bold mb-6">
              Révolutionnez vos enquêtes de satisfaction
            </h2>
            <p className="text-white/80 mb-8">
              Utilisez l'intelligence artificielle pour mener des enquêtes
              vocales et obtenir des insights précieux en temps réel.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-sm text-white/70">
                  Taux de satisfaction
                </div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="text-4xl font-bold mb-2">10k+</div>
                <div className="text-sm text-white/70">Appels par jour</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
