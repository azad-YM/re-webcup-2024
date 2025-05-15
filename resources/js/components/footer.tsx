import { Sparkles, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="relative bg-purple-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-amber-400" />
              <span className="font-bold text-xl">Objets Enchantés</span>
            </div>
            <p className="text-purple-200 mb-4">
              Votre boutique d'objets magiques d'occasion, soigneusement sélectionnés pour leur authenticité et leur
              pouvoir.
            </p>
            <div className="flex gap-4">
              <Button size="icon" variant="ghost" className="text-purple-200 hover:text-white hover:bg-purple-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-purple-200 hover:text-white hover:bg-purple-800">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-purple-200 hover:text-white hover:bg-purple-800">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-purple-200 hover:text-white transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/catalogue" className="text-purple-200 hover:text-white transition-colors">
                  Catalogue
                </a>
              </li>
              <li>
                <a href="/nouveautes" className="text-purple-200 hover:text-white transition-colors">
                  Nouveautés
                </a>
              </li>
              <li>
                <a href="/promotions" className="text-purple-200 hover:text-white transition-colors">
                  Promotions
                </a>
              </li>
              <li>
                <a href="/blog" className="text-purple-200 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <a href="/categories/artefacts" className="text-purple-200 hover:text-white transition-colors">
                  Artefacts
                </a>
              </li>
              <li>
                <a href="/categories/bijoux" className="text-purple-200 hover:text-white transition-colors">
                  Bijoux enchantés
                </a>
              </li>
              <li>
                <a href="/categories/livres" className="text-purple-200 hover:text-white transition-colors">
                  Livres magiques
                </a>
              </li>
              <li>
                <a href="/categories/potions" className="text-purple-200 hover:text-white transition-colors">
                  Potions
                </a>
              </li>
              <li>
                <a href="/categories/accessoires" className="text-purple-200 hover:text-white transition-colors">
                  Accessoires
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-400 mt-0.5" />
                <span className="text-purple-200">
                  42 Rue des Mystères
                  <br />
                  75001 Paris, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-amber-400" />
                <span className="text-purple-200">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-amber-400" />
                <span className="text-purple-200">contact@objets-enchantes.fr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-purple-800 text-center text-purple-300 text-sm">
          <p>© 2025 Objets Enchantés. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
