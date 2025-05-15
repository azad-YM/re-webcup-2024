"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, SlidersHorizontal, Sparkles, Flame, Clock } from "lucide-react"
import { products } from "@/lib/data"
import ProductCard from "@/components/product-card"
import PromotionBanner from "@/components/promotion-banner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CategoryBanner from "@/components/category-banner"
import ProductCarousel from "@/components/product-carousel"
import MagicCarousel from "@/components/magic-carousel"
import Pagination from "@/components/pagination"

// Nombre de produits par page
const PRODUCTS_PER_PAGE = 8

export default function EnchantedCatalog() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Réinitialiser la page courante lorsque les filtres changent
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, activeCategory, activeTab])

  if (!mounted) return null

  // Filtrer les produits en fonction de la recherche et des filtres actifs
  const filteredProducts = products.filter((product) => {
    // Filtre de recherche
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filtre par catégorie
    if (activeCategory !== "all" && product.category.toLowerCase() !== activeCategory) {
      return false
    }

    // Filtre par onglet
    if (activeTab === "promotions" && product.discount === 0) {
      return false
    }
    if (activeTab === "new" && !product.isNew) {
      return false
    }
    if (activeTab === "powerful" && product.magicLevel <= 3) {
      return false
    }

    return true
  })

  // Obtenir les catégories uniques
  const categories = ["all", ...new Set(products.map((product) => product.category.toLowerCase()))]

  // Produits en promotion
  const promotionProducts = filteredProducts.filter((product) => product.discount > 0)

  // Produits non promotionnels
  const regularProducts = filteredProducts.filter((product) => product.discount === 0)

  // Produits rares (niveau de magie 4-5)
  const rareProducts = filteredProducts.filter((product) => product.magicLevel >= 4)

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(regularProducts.length / PRODUCTS_PER_PAGE)

  // Obtenir les produits pour la page courante
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentPageProducts = regularProducts.slice(startIndex, endIndex)

  // Gérer le changement de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Faire défiler vers le haut de la section
    document.getElementById("collection-section")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div>
      {/* Barre de recherche et filtres */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Rechercher un objet magique..."
              className="pl-10 border-purple-200 focus-visible:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="relative group">
              <Button variant="outline" className="border-purple-200">
                <Filter className="h-4 w-4 mr-2" />
                Catégories
              </Button>
              <div className="absolute z-50 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                        activeCategory === category
                          ? "bg-purple-100 text-purple-700"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category === "all"
                        ? "Toutes les catégories"
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Button variant="outline" className="border-purple-200">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Trier
            </Button>
          </div>
        </div>
      </div>
      {/* Bannière promotionnelle principale */}
      <PromotionBanner
        title="Offre Spéciale Weekend!"
        description="30% de réduction sur tous les objets magiques"
        endDate="2025-05-17"
      />

      {/* Onglets de filtrage */}
      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
          <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Tous
          </TabsTrigger>
          <TabsTrigger value="promotions" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
            <Flame className="h-4 w-4 mr-1" />
            Promos
          </TabsTrigger>
          <TabsTrigger value="new" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            <Clock className="h-4 w-4 mr-1" />
            Nouveautés
          </TabsTrigger>
          <TabsTrigger value="powerful" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            <Sparkles className="h-4 w-4 mr-1" />
            Puissants
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Affichage des résultats */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + activeCategory + searchQuery}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block p-4 rounded-full bg-purple-100 mb-4">
                <Search className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun objet trouvé</h3>
              <p className="text-gray-500">
                Essayez de modifier vos critères de recherche ou de consulter toutes nos catégories.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Section des produits en promotion en carrousel */}
              {promotionProducts.length > 0 && (
                <div>
                  <CategoryBanner title="Objets en Promotion" icon={<Flame className="h-5 w-5" />} color="red" />
                  <div className="mt-6">
                    <ProductCarousel products={promotionProducts} />
                  </div>
                </div>
              )}

              {/* Section des produits réguliers avec pagination */}
              {regularProducts.length > 0 && (
                <div id="collection-section">
                  <div className="flex justify-between items-center">
                    <CategoryBanner title="Notre Collection" icon={<Sparkles className="h-5 w-5" />} color="purple" />
                    <div className="text-sm text-gray-500">
                      Affichage de {startIndex + 1}-{Math.min(endIndex, regularProducts.length)} sur{" "}
                      {regularProducts.length} objets
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`page-${currentPage}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5 mt-6"
                    >
                      {currentPageProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            ease: "easeOut",
                          }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="mt-10"
                  />
                </div>
              )}

              {/* Carrousel de raretés magiques */}
              {rareProducts.length > 0 && (
                <div className="my-12">
                  <MagicCarousel />
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
