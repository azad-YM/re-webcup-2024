import { useCart } from "@/components/cart-provider"
import { products } from "@/lib/data"
import { Product } from "@/lib/types"
import { toast } from "sonner"

export const useRelatedProduct = (productId: string|number) => {
  const relatedProducts = getRelatedProducts(productId)
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast("Produit ajouté au panier", {
      description: `${product.name} a été ajouté à votre panier`,
    })
  }

  return {
    relatedProducts,
    handleAddToCart,

  }
} 

const getRelatedProducts = (productId: string|number) => {
  const product = products.find(product => product.id === productId)
  if (!product) return []

  // Trouver des produits similaires (même catégorie ou niveau de magie similaire)
  return products
    .filter(
      (p) =>
        p.id !== productId && (p.category === product?.category || Math.abs(p.magicLevel - product?.magicLevel) <= 1),
    )
    .slice(0, 4)

}