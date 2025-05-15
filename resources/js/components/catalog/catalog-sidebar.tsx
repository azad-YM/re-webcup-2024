"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface CatalogSidebarProps {
  categories: string[]
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  minPrice: number
  maxPrice: number
  magicLevels: number[]
  setMagicLevels: (levels: number[]) => void
  showDiscount: boolean
  setShowDiscount: (show: boolean) => void
  showNew: boolean
  setShowNew: (show: boolean) => void
}

export default function CatalogSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  minPrice,
  maxPrice,
  magicLevels,
  setMagicLevels,
  showDiscount,
  setShowDiscount,
  showNew,
  setShowNew,
}: CatalogSidebarProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Gérer la sélection/désélection des niveaux de magie
  const toggleMagicLevel = (level: number) => {
    if (magicLevels.includes(level)) {
      setMagicLevels(magicLevels.filter((l) => l !== level))
    } else {
      setMagicLevels([...magicLevels, level])
    }
  }

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setSelectedCategory(null)
    setPriceRange([minPrice, maxPrice])
    setMagicLevels([])
    setShowDiscount(false)
    setShowNew(false)
  }

  // Compter le nombre de filtres actifs
  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    (priceRange[0] > minPrice || priceRange[1] < maxPrice ? 1 : 0) +
    magicLevels.length +
    (showDiscount ? 1 : 0) +
    (showNew ? 1 : 0)

  // Contenu des filtres
  const filtersContent = (
    <div className="space-y-6">
      {/* En-tête mobile */}
      <div className="lg:hidden flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filtres</h2>
        <Button variant="ghost" size="icon" onClick={() => setShowMobileFilters(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Filtres actifs */}
      {activeFiltersCount > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">Filtres actifs</h3>
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={resetFilters}>
              Tout effacer
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                {selectedCategory}
                <button className="ml-1 hover:text-purple-900" onClick={() => setSelectedCategory(null)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {priceRange[0] > minPrice || priceRange[1] < maxPrice ? (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                {priceRange[0].toFixed(0)}€ - {priceRange[1].toFixed(0)}€
                <button className="ml-1 hover:text-purple-900" onClick={() => setPriceRange([minPrice, maxPrice])}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null}
            {magicLevels.map((level) => (
              <Badge key={level} variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                Niveau {level}
                <button className="ml-1 hover:text-purple-900" onClick={() => toggleMagicLevel(level)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {showDiscount && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                En promotion
                <button className="ml-1 hover:text-purple-900" onClick={() => setShowDiscount(false)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {showNew && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                Nouveautés
                <button className="ml-1 hover:text-purple-900" onClick={() => setShowNew(false)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Catégories */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <span>Catégories</span>
          <ChevronDown className="ml-auto h-4 w-4" />
        </h3>
        <div className="space-y-2">
          <div
            className={`flex items-center cursor-pointer rounded-md px-2 py-1.5 ${
              selectedCategory === null ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            <span className="text-sm">Toutes les catégories</span>
            {selectedCategory === null && <span className="ml-auto text-xs font-medium text-purple-700">✓</span>}
          </div>
          {categories.map((category) => (
            <div
              key={category}
              className={`flex items-center cursor-pointer rounded-md px-2 py-1.5 ${
                selectedCategory === category ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className="text-sm">{category}</span>
              {selectedCategory === category && <span className="ml-auto text-xs font-medium text-purple-700">✓</span>}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Prix */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <span>Prix</span>
          <ChevronDown className="ml-auto h-4 w-4" />
        </h3>
        <div className="px-2">
          <Slider
            defaultValue={[priceRange[0], priceRange[1]]}
            min={minPrice}
            max={maxPrice}
            step={1}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={(value) => setPriceRange([value[0], value[1]])}
            className="mb-6"
          />
          <div className="flex items-center justify-between">
            <div className="border rounded-md px-2 py-1 w-20 text-center text-sm">{priceRange[0].toFixed(0)}€</div>
            <div className="text-gray-400">-</div>
            <div className="border rounded-md px-2 py-1 w-20 text-center text-sm">{priceRange[1].toFixed(0)}€</div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Niveau de magie */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <span>Niveau de magie</span>
          <ChevronDown className="ml-auto h-4 w-4" />
        </h3>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={`magic-level-${level}`}
                checked={magicLevels.includes(level)}
                onCheckedChange={() => toggleMagicLevel(level)}
              />
              <Label htmlFor={`magic-level-${level}`} className="text-sm font-normal cursor-pointer flex items-center">
                Niveau {level}
                {level >= 4 && (
                  <span
                    className={`ml-2 inline-block w-2 h-2 rounded-full ${
                      level === 5 ? "bg-amber-500" : "bg-purple-500"
                    }`}
                  ></span>
                )}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Autres filtres */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Autres filtres</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="discount"
              checked={showDiscount}
              onCheckedChange={(checked) => setShowDiscount(checked === true)}
            />
            <Label htmlFor="discount" className="text-sm font-normal cursor-pointer">
              En promotion
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="new" checked={showNew} onCheckedChange={(checked) => setShowNew(checked === true)} />
            <Label htmlFor="new" className="text-sm font-normal cursor-pointer">
              Nouveautés
            </Label>
          </div>
        </div>
      </div>

      {/* Bouton d'application des filtres (mobile) */}
      <div className="mt-6 lg:hidden">
        <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setShowMobileFilters(false)}>
          Appliquer les filtres
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Version desktop */}
      <div className="hidden lg:block sticky top-24 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Filtres</h2>
        {filtersContent}
      </div>

      {/* Bouton pour ouvrir les filtres (mobile) */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full border-purple-200 flex items-center justify-between"
          onClick={() => setShowMobileFilters(true)}
        >
          <span>Filtres</span>
          {activeFiltersCount > 0 && <Badge className="ml-2 bg-purple-600">{activeFiltersCount}</Badge>}
        </Button>
      </div>

      {/* Drawer pour les filtres (mobile) */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-xl p-6 overflow-y-auto"
          >
            {filtersContent}
          </motion.div>
        </div>
      )}
    </>
  )
}
