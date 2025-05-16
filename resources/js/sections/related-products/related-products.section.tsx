"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import ProductCard from "@/components/product-card"
import { Link } from "@inertiajs/react"
import { useRelatedProduct } from "./related-products.hook"

interface RelatedProductsProps {
  productId: string|number
}

export default function RelatedProductsSection({ productId }: RelatedProductsProps) {
  const presenter = useRelatedProduct(productId)

  if (presenter.relatedProducts.length === 0) {
    return null
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {presenter.relatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
          >
            <ProductCard 
              addToCart={presenter.handleAddToCart} 
              product={product} 
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/catalogue" className="inline-flex items-center text-purple-700 hover:text-purple-800 font-medium">
          Voir tous les produits
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  )
}
