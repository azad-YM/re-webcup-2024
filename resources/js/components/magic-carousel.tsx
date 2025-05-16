"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { Product } from "@/lib/types"
import { Link } from "@inertiajs/react"

export default function MagicCarousel({products}: {products: Product[]}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const isMobile = useMobile()

  useEffect(() => {
    // Auto-rotation du carrousel
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  const currentProduct = products[currentIndex]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-500 to-pink-300 text-white shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-64 md:h-80 overflow-hidden">
        {/* Éléments décoratifs */}
        <motion.div
          className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
          }}
        />

        <motion.div
          className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/10 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 10,
            delay: 1,
          }}
        />

        {/* Particules magiques */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute z-10"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              scale: [0, Math.random() * 0.5 + 0.5, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          >
            <Sparkles className="text-white h-3 w-3" />
          </motion.div>
        ))}

        {/* Contenu du carrousel */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-6 md:py-10 md:px-20"
          >
            <div className="text-center md:text-left mb-4 md:mb-0 md:max-w-md">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center md:justify-start">
                <Sparkles className="h-5 w-5 mr-2 text-amber-300" />
                {currentProduct.name}
              </h3>
              <p className="text-white/90 mb-6">{currentProduct.description}</p>
              <Link href={`/product/${currentProduct.id}`}>
                <Button
                  className="bg-white text-purple-700 hover:bg-white/90 hover:text-purple-800"
                  size={isMobile ? "default" : "lg"}
                >
                  Découvrir cet objet
                </Button>
              </Link>
            </div>

            <div className="relative w-40 h-40 md:w-56 md:h-56">
              <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm"></div>
              <motion.div
                className="absolute inset-2 rounded-full overflow-hidden"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={currentProduct.image || "/placeholder.svg"}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Aura magique */}
              <motion.div
                className="absolute -inset-4 rounded-full"
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  background: `radial-gradient(circle, ${
                    currentProduct.magicLevel === 5 ? "rgba(245, 158, 11, 0.3)" : "rgba(139, 92, 246, 0.3)"
                  } 0%, rgba(255, 255, 255, 0) 70%)`,
                }}
              ></motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 z-10 rounded-full h-10 w-10"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 z-10 rounded-full h-10 w-10"
          onClick={nextSlide}
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </Button>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center p-4 gap-1">
        {products.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? "bg-white w-4" : "bg-white/50"}`}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1)
              setCurrentIndex(i)
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
