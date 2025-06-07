import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-sylog-ink text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-poppins font-bold">VoiceSurvey</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Révolutionnez vos enquêtes de satisfaction avec des agents IA vocaux intelligents. Obtenez des insights
              précieux en temps réel.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                contact@voicesurvey.fr
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-poppins font-semibold mb-4">Produit</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#fonctionnalites" className="hover:text-sylog-teal transition-colors">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="#tarifs" className="hover:text-sylog-teal transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-sylog-teal transition-colors">
                  Démo
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-sylog-teal transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-poppins font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#" className="hover:text-sylog-teal transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-sylog-teal transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-sylog-teal transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-sylog-teal transition-colors">
                  Statut
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 VoiceSurvey. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-sylog-teal transition-colors text-sm">
              Politique de confidentialité
            </Link>
            <Link href="#" className="text-gray-400 hover:text-sylog-teal transition-colors text-sm">
              Conditions d'utilisation
            </Link>
            <Link href="#" className="text-gray-400 hover:text-sylog-teal transition-colors text-sm">
              RGPD
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
