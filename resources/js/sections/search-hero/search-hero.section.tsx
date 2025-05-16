"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search, Sparkles, Tag, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSearchHero } from "./search-hero.hook"

export default function SearchHeroSection() {
  const presenter = useSearchHero()
  if (!presenter.mounted) return null

  return (
    <div className="max-w-3xl mx-auto mb-16 relative" ref={presenter.searchRef}>
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
            value={presenter.query}
            onChange={e => presenter.onSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                presenter.handleSearch()
              }
            }}
          />
          <Button className="absolute right-2 bg-purple-600 hover:bg-purple-700" onClick={presenter.handleSearch}>
            Rechercher
          </Button>
        </div>
      </motion.div>

      {/* Suggestions */}
      <AnimatePresence>
        {presenter.showSuggestions && presenter.query.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl overflow-hidden"
          >
            {presenter.hasResults ? (
              <div className="p-2">
                {/* Suggestions de catégories */}
                {presenter.limitedCategories.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Catégories
                    </div>
                    {presenter.limitedCategories.map((category) => (
                      <div
                        key={category}
                        className="px-3 py-2 hover:bg-purple-50 rounded-lg cursor-pointer flex items-center"
                        onClick={() => presenter.handleCategoryClick(category)}
                      >
                        <Tag className="h-4 w-4 mr-2 text-purple-600" />
                        <span>{category}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions de produits */}
                {presenter.limitedProducts.length > 0 && (
                  <div>
                    <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produits
                    </div>
                    {presenter.limitedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="px-3 py-2 hover:bg-purple-50 rounded-lg cursor-pointer flex items-center"
                        onClick={() => presenter.handleProductClick(product.id)}
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
                {(presenter.filteredProducts.length > 3 || presenter.filteredCategories.length > 3) && (
                  <div
                    className="px-3 py-2 text-center text-purple-600 hover:bg-purple-50 cursor-pointer font-medium"
                    onClick={presenter.handleSearch}
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
