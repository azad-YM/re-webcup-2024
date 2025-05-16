import { products } from "@/lib/data"
import { useEffect, useState } from "react"

export const useFeaturedProducts = () => {
  const [mounted, setMounted] = useState(false)

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

  return {
    mounted,
    promotionProducts,
    powerfulProducts,
    newProducts
  }
}