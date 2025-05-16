"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Category } from "@/lib/types"
import { useMobile } from "@/hooks/use-mobile"
import { CategoryCard } from "./category-card"
import { Link } from "@inertiajs/react"

interface ProductCarouselProps {
  categories: Category[]
  className?: string
}

export default function CategoryCarousel({ categories, className = "" }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Nombre d'éléments à afficher en fonction de la taille de l'écran
  const itemsToShow = isMobile ? 1 : 4
  const totalPages = Math.ceil(categories.length / itemsToShow)

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }

    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [categories])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages)
  }

  // Calculer les produits à afficher pour la page actuelle
  const visibleCatgories = categories.slice(currentIndex * itemsToShow, (currentIndex + 1) * itemsToShow)

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Catégories</h2>
        <Link href="/catalogue" className="text-purple-600 hover:text-purple-700 flex items-center text-sm font-medium">
          Voir toutes les catégories
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      {/* {title && <h3 className="text-xl font-semibold text-purple-800 mb-4">{title}</h3>} */}

      <div className="relative overflow-hidden">
        <motion.div
          ref={carouselRef}
          className="overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {visibleCatgories.map((category, index) => (
                <div key={category.name} className="h-full">
                  <CategoryCard category={category} index={index} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation buttons */}
        {categories.length > itemsToShow && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm z-10 rounded-full h-10 w-10 ml-1"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm z-10 rounded-full h-10 w-10 mr-1"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Pagination dots */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-1">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? "bg-purple-600 w-4" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
