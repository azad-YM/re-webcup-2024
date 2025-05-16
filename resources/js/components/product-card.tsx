"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Heart, Sparkles } from "lucide-react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Link } from "@inertiajs/react"
import { useCart } from "./cart-provider"

interface ProductCardProps {
  product: Product,
  addToCart: (product: Product, quantity?: number) => void
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  // const { addToCart } = useCart()

  const onAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Empêcher la navigation lors du clic sur le bouton
    addToCart(product)
    toast("Produit ajouté au panier", {
      description: `${product.name} a été ajouté à votre panier`,
    })
  }

  const addToWishlist = (e: React.MouseEvent) => {
    e.preventDefault() // Empêcher la navigation lors du clic sur le bouton
    toast("Produit ajouté aux favoris", {
      description: `${product.name} a été ajouté à vos favoris`,
    })
  }

  // Calculer le prix avec réduction si applicable
  const finalPrice = product.discount > 0 ? (product.price * (100 - product.discount)) / 100 : product.price

  return (
    <Link href={`/product/${product.id}`} className="block h-full">
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative h-full flex flex-col"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -5, scale: 1.02 }}
      >
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />

          {/* Effet de lueur pour les objets puissants */}
          {product.magicLevel > 3 && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-t ${product.magicLevel === 5 ? "from-amber-500/20" : "from-purple-500/20"} to-transparent`}
              ></div>
            </motion.div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.discount > 0 && <Badge className="bg-red-500 hover:bg-red-600">-{product.discount}%</Badge>}
          </div>

          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-emerald-500 hover:bg-emerald-600">Nouveau</Badge>}
          </div>

          {product.magicLevel > 3 && (
            <motion.div
              className="absolute bottom-2 left-2"
              animate={{
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
              }}
            >
              <Badge
                className={`flex items-center gap-1 ${product.magicLevel === 5 ? "bg-amber-500 hover:bg-amber-600" : "bg-purple-600 hover:bg-purple-700"}`}
              >
                <Sparkles className="h-3 w-3" />
                {product.magicLevel === 5 ? "Exceptionnel" : "Puissant"}
              </Badge>
            </motion.div>
          )}
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-medium text-lg text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-3 flex-grow">{product.description}</p>

          <div className="flex items-end justify-between mt-auto">
            {/* Prix redessiné en bloc compact */}
            <div>
              {product.discount > 0 ? (
                <div className="relative">
                  <div className="bg-red-100 text-red-700 px-3 py-1 rounded-lg flex items-center">
                    <span className="text-lg font-bold">{finalPrice.toFixed(2)}€</span>
                    <span className="text-xs ml-1 line-through opacity-70">{product.price.toFixed(2)}€</span>
                  </div>
                </div>
              ) : (
                <span className="text-lg font-bold text-purple-700">{product.price.toFixed(2)}€</span>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={addToWishlist}
                className="rounded-full h-9 w-9 border-purple-200 hover:bg-purple-50 hover:text-purple-700"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                onClick={onAddToCart}
                className="rounded-full bg-purple-600 hover:bg-purple-700 text-xs text-white"
                size="sm"
              >
                <ShoppingCart className="h-4 w-4" />
                Ajouter
              </Button>
            </div>
          </div>
        </div>

        {/* Effet de particules magiques pour les objets exceptionnels */}
        {product.magicLevel === 5 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
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
                <Sparkles className="text-amber-400 h-3 w-3" />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </Link>
  )
}
