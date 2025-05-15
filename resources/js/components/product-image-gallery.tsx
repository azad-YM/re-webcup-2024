"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ZoomIn, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductImageGalleryProps {
  images: string[]
  activeImage: number
  setActiveImage: (index: number) => void
  magicLevel: number
}

export default function ProductImageGallery({
  images,
  activeImage,
  setActiveImage,
  magicLevel,
}: ProductImageGalleryProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 })
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef) {
      setContainerDimensions({
        width: containerRef.offsetWidth,
        height: containerRef.offsetHeight,
      })
    }
  }, [containerRef])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef) return

    const { left, top } = containerRef.getBoundingClientRect()
    const x = ((e.clientX - left) / containerDimensions.width) * 100
    const y = ((e.clientY - top) / containerDimensions.height) * 100

    setMousePosition({ x, y })
  }

  const nextImage = () => {
    setActiveImage((activeImage + 1) % images.length)
  }

  const prevImage = () => {
    setActiveImage((activeImage - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      {/* Image principale */}
      <div
        ref={setContainerRef}
        className={`relative overflow-hidden rounded-xl bg-white shadow-md aspect-square ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={isZoomed ? handleMouseMove : undefined}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <img
              src={images[activeImage] || "/placeholder.svg"}
              alt="Product"
              className={`w-full h-full object-contain transition-transform duration-200 ${isZoomed ? "scale-150" : "scale-100"}`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                    }
                  : undefined
              }
            />
          </motion.div>
        </AnimatePresence>

        {/* Effet de particules magiques pour les objets puissants */}
        {magicLevel > 3 && <MagicParticles />}

        {/* Boutons de navigation */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm z-10 rounded-full h-10 w-10"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm z-10 rounded-full h-10 w-10"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Indicateur de zoom */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="bg-white/80 rounded-full p-2 shadow-sm">
            <ZoomIn className="h-5 w-5 text-gray-700" />
          </div>
        </div>
      </div>

      {/* Miniatures */}
      {images.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative rounded-md overflow-hidden border-2 transition-all ${
                activeImage === index
                  ? "border-purple-600 shadow-sm"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
              onClick={() => setActiveImage(index)}
            >
              <div className="w-16 h-16">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Composant pour les particules magiques
function MagicParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
            scale: [0, Math.random() * 0.5 + 0.5, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        >
          <Sparkles className="text-amber-400 h-3 w-3" />
        </motion.div>
      ))}
    </div>
  )
}
