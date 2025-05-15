"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"
import ProductCard from "@/components/product-card"
import Pagination from "@/components/pagination"
import type { Product } from "@/lib/types"

interface CatalogProductsProps {
  products: Product[]
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
  totalProducts: number
}

export default function CatalogProducts({
  products,
  currentPage,
  totalPages,
  setCurrentPage,
  totalProducts,
}: CatalogProductsProps) {
  // Gérer le changement de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Faire défiler vers le haut de la section
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-md text-center"
      >
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="h-8 w-8 text-purple-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Aucun objet trouvé</h2>
        <p className="text-gray-600">Essayez de modifier vos critères de recherche ou de réinitialiser les filtres.</p>
      </motion.div>
    )
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Affichage de {(currentPage - 1) * 12 + 1}-{Math.min(currentPage * 12, totalProducts)} sur {totalProducts}{" "}
          objets
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`page-${currentPage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products.map((product, index) => (
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
          </div>
        </motion.div>
      </AnimatePresence>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} className="mt-8" />
    </div>
  )
}
