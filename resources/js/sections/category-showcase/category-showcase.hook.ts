import { products } from "@/lib/data"
import { useEffect, useState } from "react"

export const useCategoryShowcase = () => {
  const [mounted, setMounted] = useState(false)
  // Extraire les catégories uniques et leur nombre de produits
  const categories = [...new Set(products.map((product) => product.category))].map((category) => ({
    name: category,
    count: products.filter((product) => product.category === category).length,
    image: products.find((product) => product.category === category)?.image || "/placeholder.svg",
  }))

  useEffect(() => {
    setMounted(true)
  }, [])

  return {
    mounted,
    categories
  }
}