"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { products } from "@/lib/data"
import ProductCarousel from "@/components/product-carousel"
import MagicCarousel from "../magic-carousel"

export default function FeaturedProducts() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Sélectionner les produits en promotion
  const promotionProducts = products.filter((product) => product.discount > 0).slice(0, 8)

  // Sélectionner les produits puissants
  const powerfulProducts = products
    .filter((product) => product.magicLevel >= 4)
    .sort(() => 0.5 - Math.random())
    .slice(0, 8)

  // Sélectionner les nouveaux produits
  const newProducts = products.filter((product) => product.isNew).slice(0, 8)

  return (
    <div className="space-y-16 mb-16">
      {/* Produits en promotion */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center mb-6">
          <div className="bg-red-100 p-2 rounded-full mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-red-600"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Offres Spéciales</h2>
        </div>
        <ProductCarousel products={promotionProducts} />
      </motion.section>

      {/* Objets puissants */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center mb-6">
          <div className="bg-amber-100 p-2 rounded-full mr-3">
            <Sparkles className="h-5 w-5 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Objets Puissants</h2>
        </div>
        <ProductCarousel products={powerfulProducts} />
      </motion.section>

      {/* Nouveautés */}      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center mb-6">
          <div className="bg-emerald-100 p-2 rounded-full mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-emerald-600"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Nouveautés</h2>
        </div>
        
        <MagicCarousel products={newProducts} />

        {/* <ProductCarousel products={newProducts} /> */}
      </motion.section>
    </div>
  )
}
