import { useEffect, useState } from "react"
import { useCart } from "@/components/cart-provider"
import { products } from "@/lib/data"
import { Product } from "@/lib/types"
import { toast } from "sonner"

export const useFeaturedProducts = () => {
  const [mounted, setMounted] = useState(false)
  const { addToCart } = useCart()

  // Sélectionner les produits en promotion
  const promotionProducts = products.filter((product) => product.discount > 0).slice(0, 8)

  // Sélectionner les produits puissants
  const powerfulProducts = products
    .filter((product) => product.magicLevel >= 4)
    .sort(() => 0.5 - Math.random())
    .slice(0, 8)

  // Sélectionner les nouveaux produits
  const newProducts = products.filter((product) => product.isNew).slice(0, 8)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast("Produit ajouté au panier", {
      description: `${product.name} a été ajouté à votre panier`,
    })
  }

  return {
    mounted,
    promotionProducts,
    powerfulProducts,
    newProducts,
    handleAddToCart
  }
}