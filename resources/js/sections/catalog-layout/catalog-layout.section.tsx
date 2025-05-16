"use client"

import { useState, useEffect } from "react"
// import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import CatalogSidebar from "@/components/catalog/catalog-sidebar"
import CatalogProducts from "@/components/catalog/catalog-products"
import CatalogSearch from "@/components/catalog/catalog-search"
import { products } from "@/lib/data"
import { useCatalogLayout } from "./catalog-layout.hook"

export default function CatalogLayoutSection({}) {
  const presenter = useCatalogLayout()

  if (!presenter.mounted) return null

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
          categories={presenter.categories}
          selectedCategory={presenter.selectedCategory}
          setSelectedCategory={presenter.setSelectedCategory}
          priceRange={presenter.priceRange}
          setPriceRange={presenter.setPriceRange}
          minPrice={presenter.minPrice}
          maxPrice={presenter.maxPrice}
          magicLevels={presenter.magicLevels}
          setMagicLevels={presenter.setMagicLevels}
          showDiscount={presenter.showDiscount}
          setShowDiscount={presenter.setShowDiscount}
          showNew={presenter.showNew}
          setShowNew={presenter.setShowNew}
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
          searchQuery={presenter.searchQuery}
          setSearchQuery={presenter.setSearchQuery}
          sortBy={presenter.sortBy}
          setSortBy={presenter.setSortBy}
          totalProducts={presenter.filteredProducts.length}
        />

        {/* Liste des produits */}
        <CatalogProducts
          products={presenter.currentProducts}
          currentPage={presenter.currentPage}
          totalPages={presenter.totalPages}
          setCurrentPage={presenter.setCurrentPage}
          totalProducts={presenter.filteredProducts.length}
        />
      </motion.div>
    </div>
  )
}
