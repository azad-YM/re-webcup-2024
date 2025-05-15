"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Sparkles, Tag, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"
import { router } from "@inertiajs/react"

// Extraire les catégories uniques
const categories = [...new Set(products.map((product) => product.category))]

export default function SearchHero() {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [mounted, setMounted] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  // const router = useRouter()

  useEffect(() => {
    setMounted(true)

    // Fermer les suggestions lors d'un clic à l'extérieur
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!mounted) return null

  // Filtrer les produits et catégories selon la recherche
  const filteredProducts = query
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()),
      )
    : []

  const filteredCategories = query
    ? categories.filter((category) => category.toLowerCase().includes(query.toLowerCase()))
    : []

  // Limiter le nombre de suggestions
  const limitedProducts = filteredProducts.slice(0, 3)
  const limitedCategories = filteredCategories.slice(0, 3)
  const hasResults = limitedProducts.length > 0 || limitedCategories.length > 0

  // Navigation vers la page produit
  const handleProductClick = (productId: string) => {
    router.get(`/product/${productId}`)
  }

  // Navigation vers la page catalogue avec filtre de catégorie
  const handleCategoryClick = (category: string) => {
    router.get(`/catalogue?category=${encodeURIComponent(category)}`)
  }

  // Navigation vers la page catalogue avec la recherche
  const handleSearch = () => {
    if (query.trim()) {
      router.get(`/catalogue?search=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="max-w-3xl mx-auto mb-16 relative" ref={searchRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-md rounded-xl p-1 shadow-lg"
      >
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Rechercher un objet magique, une catégorie..."
            className="pl-12 pr-20 py-6 text-lg border-none focus-visible:ring-purple-500 rounded-lg"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
          />
          <Button className="absolute right-2 bg-purple-600 hover:bg-purple-700" onClick={handleSearch}>
            Rechercher
          </Button>
        </div>
      </motion.div>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && query.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl overflow-hidden"
          >
            {hasResults ? (
              <div className="p-2">
                {/* Suggestions de catégories */}
                {limitedCategories.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Catégories
                    </div>
                    {limitedCategories.map((category) => (
                      <div
                        key={category}
                        className="px-3 py-2 hover:bg-purple-50 rounded-lg cursor-pointer flex items-center"
                        onClick={() => handleCategoryClick(category)}
                      >
                        <Tag className="h-4 w-4 mr-2 text-purple-600" />
                        <span>{category}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions de produits */}
                {limitedProducts.length > 0 && (
                  <div>
                    <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produits
                    </div>
                    {limitedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="px-3 py-2 hover:bg-purple-50 rounded-lg cursor-pointer flex items-center"
                        onClick={() => handleProductClick(product.id)}
                      >
                        {product.magicLevel >= 4 ? (
                          <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                        ) : (
                          <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
                        )}
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.category}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Voir tous les résultats */}
                {(filteredProducts.length > 3 || filteredCategories.length > 3) && (
                  <div
                    className="px-3 py-2 text-center text-purple-600 hover:bg-purple-50 cursor-pointer font-medium"
                    onClick={handleSearch}
                  >
                    Voir tous les résultats
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">Aucun résultat trouvé</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
