import { useCart } from "@/components/cart-provider"
import { Product } from "@/lib/types"
import { useState } from "react"
import { toast } from "sonner"

export const useProductDetail = (product: Product) => {
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const { addToCart } = useCart()

  // Simuler plusieurs images pour la galerie
  const productImages = [
    product.image,
    `/placeholder.svg?height=600&width=600&text=Vue+${product.name}+2`,
    `/placeholder.svg?height=600&width=600&text=Vue+${product.name}+3`,
  ]

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast("Produit ajouté au panier", {
      description: `${quantity} × ${product.name} ${quantity > 1 ? "ont été ajoutés" : "a été ajouté"} à votre panier`,
    })
  }

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist)
    toast(isInWishlist ? "Retiré des favoris" : "Ajouté aux favoris", {
      description: `${product.name} a été ${isInWishlist ? "retiré de" : "ajouté à"} votre liste de favoris`,
    })
  }

  const handleShare = () => {
    // Simuler le partage
    toast("Lien copié", {
      description: "Le lien vers ce produit a été copié dans votre presse-papiers",
    })
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  // Calculer le prix avec réduction si applicable
  const finalPrice = product.discount > 0 ? (product.price * (100 - product.discount)) / 100 : product.price

  // Simuler une date de livraison (3 jours ouvrables à partir d'aujourd'hui)
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 3)
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })

  return {
    productImages,
    quantity,
    activeImage,
    isInWishlist,
    handleAddToCart,
    toggleWishlist,
    handleShare,
    decreaseQuantity,
    increaseQuantity,
    finalPrice,
    deliveryDate,
    formattedDeliveryDate,
    setActiveImage
  }
}