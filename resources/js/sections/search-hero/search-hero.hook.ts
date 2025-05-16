import { useEffect, useRef, useState } from "react"
import { products } from "@/lib/data"
import { router } from "@inertiajs/react"

export const useSearchHero = () => {
  const categories = [...new Set(products.map((product) => product.category))]
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [mounted, setMounted] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Fermer les suggestions lors d'un clic à l'extérieur
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const onSearch = (value: string) => {
    setQuery(value)
    setShowSuggestions(true)
  }
  
  // Filtrer les produits et catégories selon la recherche
  const filteredProducts = query
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()),
      )
    : []

  const filteredCategories = query
    ? categories.filter((category) => category.toLowerCase().includes(query.toLowerCase()))
    : []

  // Limiter le nombre de suggestions
  const limitedProducts = filteredProducts.slice(0, 3)
  const limitedCategories = filteredCategories.slice(0, 3)
  const hasResults = limitedProducts.length > 0 || limitedCategories.length > 0

  // Navigation vers la page produit
  const handleProductClick = (productId: string) => {
    router.get(`/product/${productId}`)
  }

  // Navigation vers la page catalogue avec filtre de catégorie
  const handleCategoryClick = (category: string) => {
    router.get(`/catalogue?category=${encodeURIComponent(category)}`)
  }

  // Navigation vers la page catalogue avec la recherche
  const handleSearch = () => {
    if (query.trim()) {
      router.get(`/catalogue?search=${encodeURIComponent(query)}`)
    }
  }
  
  return {
    query,
    onSearch,
    showSuggestions,
    filteredProducts,
    filteredCategories,
    limitedProducts,
    limitedCategories,
    hasResults,
    mounted,
    setQuery,
    searchRef,
    handleProductClick,
    handleCategoryClick,
    handleSearch
  }
}