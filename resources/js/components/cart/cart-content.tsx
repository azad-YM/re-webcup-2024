"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, ArrowLeft, Sparkles, Truck, Shield, Gift, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import CartItem from "@/components/cart/cart-item"
import CartSummary from "@/components/cart/cart-summary"
import ProductCarousel from "@/components/product-carousel"
import { products } from "@/lib/data"
import { Link } from "@inertiajs/react"

export default function CartContent() {
  const { items, totalItems } = useCart()
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

  if (!mounted) {
    return null
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-8xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-md text-center"
      >
        <div className="mb-6">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="h-10 w-10 text-purple-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Votre panier est vide</h2>
          <p className="text-gray-600 mb-6">Vous n'avez pas encore ajouté d'objets magiques à votre panier.</p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retourner au catalogue
            </Link>
          </Button>
        </div>

        {recommendedProducts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-purple-800 mb-6">Objets qui pourraient vous intéresser</h3>
            <ProductCarousel products={recommendedProducts} />
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Liste des produits dans le panier */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Articles ({totalItems})</h2>
            <Link href="/" className="text-purple-600 hover:text-purple-700 text-sm flex items-center">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Continuer mes achats
            </Link>
          </div>

          <Separator className="mb-6" />

          {/* Liste des articles */}
          <div className="space-y-6">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} showMagicEffect={showMagicEffect} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 rounded-full p-2">
                <Truck className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Livraison gratuite</p>
                <p className="text-sm text-gray-600">Pour toute commande {">"} 50€</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 rounded-full p-2">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Garantie d'authenticité</p>
                <p className="text-sm text-gray-600">Objets vérifiés par nos mages</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 rounded-full p-2">
                <Gift className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Emballage protecteur</p>
                <p className="text-sm text-gray-600">Protège les propriétés magiques</p>
              </div>
            </div>
          </div>

          {/* Avertissement pour les objets puissants */}
          {items.some((item) => item.product.magicLevel >= 4) && (
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Objets puissants détectés</p>
                  <p className="text-sm text-amber-700">
                    Votre commande contient des objets de niveau magique élevé. Veuillez consulter nos guides
                    d'utilisation pour une manipulation sécuritaire.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Récapitulatif et paiement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CartSummary />
      </motion.div>

      {/* Produits recommandés */}
      {recommendedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-3 mt-8"
        >
          <h3 className="text-xl font-semibold text-purple-800 mb-6 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
            Complétez votre collection
          </h3>
          <ProductCarousel products={recommendedProducts} />
        </motion.div>
      )}
    </div>
  )
}
