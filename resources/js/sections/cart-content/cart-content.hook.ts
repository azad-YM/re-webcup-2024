import { useCart } from "@/components/cart-provider"
import { products } from "@/lib/data"
import { Product } from "@/lib/types"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const useCartContent = () => {
  const { items, totalItems, addToCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const [showMagicEffect, setShowMagicEffect] = useState(false)

  // Produits recommandés (objets de niveau de magie similaire)
  const recommendedProducts = products
    .filter((product) => !items.some((item) => item.product.id === product.id))
    .sort(() => 0.5 - Math.random())
    .slice(0, 8)

  useEffect(() => {
    setMounted(true)

    // Afficher l'effet magique après un court délai
    const timer = setTimeout(() => {
      setShowMagicEffect(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = (product: Product, quantity?: number) => {
    addToCart(product)
    toast("Produit ajouté au panier", {
      description: `${product.name} a été ajouté à votre panier`,
    })
  }

  return {
    items,
    totalItems,
    mounted,
    showMagicEffect,
    recommendedProducts,
    handleAddToCart
  }
}