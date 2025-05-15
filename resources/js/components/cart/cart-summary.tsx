"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { toast } from "sonner"

export default function CartSummary() {
  const { items, totalPrice } = useCart()
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [promoDiscount, setPromoDiscount] = useState(0)

  // Calculer les frais de livraison
  const getShippingCost = () => {
    if (totalPrice >= 50) return 0

    switch (shippingMethod) {
      case "express":
        return 9.99
      case "magical":
        return 14.99
      default: // standard
        return 4.99
    }
  }

  const shippingCost = getShippingCost()
  const finalTotal = totalPrice + shippingCost - promoDiscount

  // Simuler l'application d'un code promo
  const handleApplyPromoCode = () => {
    setIsApplyingPromo(true)

    setTimeout(() => {
      if (promoCode.toLowerCase() === "magic") {
        const discount = totalPrice * 0.1 // 10% de réduction
        setPromoDiscount(discount)
        toast("Code promo appliqué !", {
          description: "Vous bénéficiez de 10% de réduction sur votre commande.",
        })
      } else {
        toast("Code promo invalide", {
          description: "Le code promo saisi n'est pas valide ou a expiré.",
        })
      }
      setIsApplyingPromo(false)
    }, 1000)
  }

  // Simuler le passage à la caisse
  const handleCheckout = () => {
    toast("Redirection vers le paiement...", {
      description: "Cette fonctionnalité serait connectée à un système de paiement réel.",
    })
  }

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md sticky top-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Récapitulatif</h2>

      {/* Résumé des prix */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Sous-total</span>
          <span>{totalPrice.toFixed(2)}€</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Livraison</span>
          <span>{shippingCost === 0 ? "Gratuite" : `${shippingCost.toFixed(2)}€`}</span>
        </div>

        {promoDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Réduction</span>
            <span>-{promoDiscount.toFixed(2)}€</span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{finalTotal.toFixed(2)}€</span>
        </div>
      </div>

      {/* Options de livraison */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-3">Mode de livraison</h3>
        <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard" className="font-normal">
                Standard (3-5 jours)
              </Label>
            </div>
            <span className="text-gray-600">{totalPrice >= 50 ? "Gratuit" : "4,99€"}</span>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="express" id="express" />
              <Label htmlFor="express" className="font-normal">
                Express (1-2 jours)
              </Label>
            </div>
            <span className="text-gray-600">{totalPrice >= 50 ? "5,00€" : "9,99€"}</span>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="magical" id="magical" />
              <Label htmlFor="magical" className="font-normal flex items-center">
                Portail magique (instantané)
                <Sparkles className="h-3 w-3 ml-1 text-amber-500" />
              </Label>
            </div>
            <span className="text-gray-600">{totalPrice >= 50 ? "10,00€" : "14,99€"}</span>
          </div>
        </RadioGroup>
      </div>

      {/* Code promo */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-3">Code promo</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Entrez votre code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="border-purple-200"
          />
          <Button
            variant="outline"
            onClick={handleApplyPromoCode}
            disabled={!promoCode || isApplyingPromo}
            className="border-purple-200 min-w-20"
          >
            {isApplyingPromo ? "..." : "Appliquer"}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Essayez le code "MAGIC" pour une surprise</p>
      </div>

      {/* Bouton de paiement */}
      <Button onClick={handleCheckout} className="w-full bg-purple-600 hover:bg-purple-700 h-12">
        <CreditCard className="mr-2 h-4 w-4" />
        Passer au paiement
      </Button>

      {/* Sécurité */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Paiement sécurisé - Vos données sont protégées
        </p>
      </div>
    </motion.div>
  )
}
