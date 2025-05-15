"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trash2, Plus, Minus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import type { CartItem as CartItemType } from "@/lib/types"
import { Link } from "@inertiajs/react"

interface CartItemProps {
  item: CartItemType
  showMagicEffect: boolean
}

export default function CartItem({ item, showMagicEffect }: CartItemProps) {
  const { product, quantity } = item
  const { updateQuantity, removeFromCart } = useCart()
  const [isRemoving, setIsRemoving] = useState(false)

  // Calculer le prix avec réduction si applicable
  const finalPrice = product.discount > 0 ? (product.price * (100 - product.discount)) / 100 : product.price
  const totalPrice = finalPrice * quantity

  const handleRemove = () => {
    setIsRemoving(true)
    // Attendre la fin de l'animation avant de supprimer réellement
    setTimeout(() => {
      removeFromCart(product.id)
    }, 300)
  }

  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1)
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: isRemoving ? 0 : 1, height: isRemoving ? 0 : "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row gap-4 border-b border-gray-200 pb-6"
    >
      {/* Image du produit */}
      <div className="relative w-full sm:w-24 h-24 bg-white rounded-lg overflow-hidden flex-shrink-0">
        <Link href={`/produit/${product.id}`}>
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
        </Link>

        {/* Effet magique pour les objets puissants */}
        {product.magicLevel >= 4 && showMagicEffect && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  `radial-gradient(circle, ${product.magicLevel === 5 ? "rgba(245, 158, 11, 0.2)" : "rgba(139, 92, 246, 0.2)"} 0%, rgba(255, 255, 255, 0) 70%)`,
                  `radial-gradient(circle, ${product.magicLevel === 5 ? "rgba(245, 158, 11, 0.4)" : "rgba(139, 92, 246, 0.4)"} 0%, rgba(255, 255, 255, 0) 70%)`,
                  `radial-gradient(circle, ${product.magicLevel === 5 ? "rgba(245, 158, 11, 0.2)" : "rgba(139, 92, 246, 0.2)"} 0%, rgba(255, 255, 255, 0) 70%)`,
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />

            {product.magicLevel === 5 && (
              <motion.div
                className="absolute top-1 right-1"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles className="h-3 w-3 text-amber-400" />
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Informations du produit */}
      <div className="flex-grow">
        <div className="flex justify-between">
          <div>
            <Link href={`/produit/${product.id}`} className="hover:text-purple-700 transition-colors">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
            </Link>
            <p className="text-sm text-gray-500 mb-2">{product.category}</p>

            <div className="flex items-center gap-2 mb-3">
              {product.magicLevel > 3 && (
                <Badge
                  className={`${product.magicLevel === 5 ? "bg-amber-500" : "bg-purple-600"} flex items-center gap-1`}
                >
                  <Sparkles className="h-3 w-3" />
                  {product.magicLevel === 5 ? "Exceptionnel" : "Puissant"}
                </Badge>
              )}

              {product.discount > 0 && <Badge className="bg-red-500">-{product.discount}%</Badge>}
            </div>
          </div>

          <div className="text-right">
            <div className="font-medium text-gray-900">{finalPrice.toFixed(2)}€</div>
            {product.discount > 0 && (
              <div className="text-sm text-gray-500 line-through">{product.price.toFixed(2)}€</div>
            )}
          </div>
        </div>

        {/* Contrôles de quantité et suppression */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
              className="h-8 w-8 rounded-r-none"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="w-10 text-center text-sm">{quantity}</div>
            <Button variant="ghost" size="icon" onClick={handleIncreaseQuantity} className="h-8 w-8 rounded-l-none">
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="font-medium text-purple-700">{totalPrice.toFixed(2)}€</div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="h-8 w-8 text-gray-500 hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
