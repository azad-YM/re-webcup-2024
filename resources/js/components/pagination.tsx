"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export default function Pagination({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) {
  // Ne pas afficher la pagination s'il n'y a qu'une seule page
  if (totalPages <= 1) return null

  // Fonction pour générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pageNumbers = []

    // Toujours afficher la première page
    pageNumbers.push(1)

    // Calculer la plage de pages à afficher autour de la page courante
    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPages - 1, currentPage + 1)

    // Ajouter des ellipses si nécessaire avant la plage
    if (startPage > 2) {
      pageNumbers.push("...")
    } else if (startPage === 2) {
      pageNumbers.push(2)
    }

    // Ajouter les pages dans la plage
    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i)
      }
    }

    // Ajouter des ellipses si nécessaire après la plage
    if (endPage < totalPages - 1) {
      pageNumbers.push("...")
    } else if (endPage === totalPages - 1) {
      pageNumbers.push(totalPages - 1)
    }

    // Toujours afficher la dernière page si elle existe
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  return (
    <motion.div
      className={`flex items-center justify-center gap-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full border-purple-200"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <Button
            key={`page-${page}`}
            variant={currentPage === page ? "default" : "outline"}
            className={`h-9 w-9 rounded-full ${
              currentPage === page ? "bg-purple-600 hover:bg-purple-700" : "border-purple-200 hover:border-purple-300"
            }`}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </Button>
        ),
      )}

      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full border-purple-200"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}
