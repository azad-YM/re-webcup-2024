"use client"

import { useState, useEffect } from "react"
// import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import CatalogSidebar from "@/components/catalog/catalog-sidebar"
import CatalogProducts from "@/components/catalog/catalog-products"
import CatalogSearch from "@/components/catalog/catalog-search"
import { products } from "@/lib/data"

// Extraire les catégories uniques
const categories = [...new Set(products.map((product) => product.category))]

// Trouver les prix min et max
const minPrice = Math.min(...products.map((product) => product.price))
const maxPrice = Math.max(...products.map((product) => product.price))

export default function CatalogLayout({}) {

  const [mounted, setMounted] = useState(false)

  // Filtres
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice])
  const [magicLevels, setMagicLevels] = useState<number[]>([])
  const [showDiscount, setShowDiscount] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  // Réinitialiser la page courante lorsque les filtres changent
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, priceRange, magicLevels, showDiscount, showNew, sortBy, searchQuery])

  // Récupérer les paramètres de l'URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setMounted(true)

    const category = searchParams.get("category")
    const search = searchParams.get("search")

    if (category) {
      setSelectedCategory(category)
    }

    if (search) {
      setSearchQuery(search)
    }
  }, [])

  if (!mounted) return null

  // Filtrer les produits
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
    if (selectedCategory && product.category !== selectedCategory) {
      return false
    }

    // Filtre par prix
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Filtre par niveau de magie
    if (magicLevels.length > 0 && !magicLevels.includes(product.magicLevel)) {
      return false
    }

    // Filtre par promotion
    if (showDiscount && product.discount === 0) {
      return false
    }

    // Filtre par nouveauté
    if (showNew && !product.isNew) {
      return false
    }

    return true
  })

  // Trier les produits
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "magic-level":
        return b.magicLevel - a.magicLevel
      case "newest":
        return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1
      default: // featured
        return 0
    }
  })

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)

  // Obtenir les produits pour la page courante
  const currentProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar avec filtres */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:w-1/4"
      >
        <CatalogSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          magicLevels={magicLevels}
          setMagicLevels={setMagicLevels}
          showDiscount={showDiscount}
          setShowDiscount={setShowDiscount}
          showNew={showNew}
          setShowNew={setShowNew}
        />
      </motion.div>

      {/* Contenu principal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:w-3/4"
      >
        {/* Barre de recherche et tri */}
        <CatalogSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalProducts={filteredProducts.length}
        />

        {/* Liste des produits */}
        <CatalogProducts
          products={currentProducts}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          totalProducts={filteredProducts.length}
        />
      </motion.div>
    </div>
  )
}
