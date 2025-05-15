"use client"

import { useState } from "react"
import { ShoppingCart, Menu, X, User, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Link } from "@inertiajs/react"
import { useCart } from "./cart-provider"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems } = useCart()

  const navItems = [
    { name: "Accueil", href: "/" },
    { name: "Catalogue", href: "/catalogue" },
    // { name: "Catégories", href: "/categories" },
    // { name: "Nouveautés", href: "/nouveautes" },
    // { name: "À propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-500" />
            <span className="font-bold text-xl text-purple-900">Objets Enchantés</span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-600 hover:text-purple-700 transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/panier">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-purple-600">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>

            {/* Menu mobile */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between my-4 px-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-amber-500" />
                      <span className="font-bold text-lg">Objets Enchantés</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <nav className="flex flex-col gap-2 px-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-600 hover:text-purple-700 py-1 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto p-4 border-t border-gray-100">
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" className="justify-start">
                        <Heart className="h-4 w-4 mr-2" />
                        Mes favoris
                      </Button>
                      <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                        <Link href="/panier" onClick={() => setIsOpen(false)}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Voir mon panier ({totalItems})
                        </Link>
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Mon compte
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
