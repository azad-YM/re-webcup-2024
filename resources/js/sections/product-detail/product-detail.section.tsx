"use client"

import { motion } from "framer-motion"
import {
  ShoppingCart,
  Heart,
  Share2,
  ChevronRight,
  Star,
  StarHalf,
  Plus,
  Minus,
  Sparkles,
  Shield,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Product } from "@/lib/types"
import MagicLevelIndicator from "@/components/magic-level-indicator"
import ProductImageGallery from "@/components/product-image-gallery"
import { Link } from "@inertiajs/react"
import { useProductDetail } from "./product-detail.hook"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetailSection({ product }: ProductDetailProps) {
  const presenter = useProductDetail(product)

  return (
    <div className="pt-8">
      {/* Fil d'Ariane */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-purple-700">
          Accueil
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/catalogue?category=${product.category.toLowerCase()}`} className="hover:text-purple-700">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700 font-medium truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galerie d'images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <ProductImageGallery
            images={presenter.productImages}
            activeImage={presenter.activeImage}
            setActiveImage={presenter.setActiveImage}
            magicLevel={product.magicLevel}
          />
        </motion.div>

        {/* Informations produit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {product.isNew && <Badge className="bg-emerald-500 hover:bg-emerald-600">Nouveau</Badge>}
            {product.discount > 0 && <Badge className="bg-red-500 hover:bg-red-600">-{product.discount}%</Badge>}
            {product.magicLevel > 3 && (
              <Badge className="bg-purple-600 hover:bg-purple-700 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Puissant
              </Badge>
            )}
          </div>

          {/* Nom et évaluation */}
          <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => {
                const rating = 4.5 // Exemple de note
                return i < Math.floor(rating) ? (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ) : i < Math.ceil(rating) ? (
                  <StarHalf key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ) : (
                  <Star key={i} className="h-5 w-5 text-gray-300" />
                )
              })}
            </div>
            <span className="ml-2 text-sm text-gray-600">4.5 (12 avis)</span>
          </div>

          {/* Prix */}
          <div className="mb-6">
            {product.discount > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-purple-700">{presenter.finalPrice.toFixed(2)}€</span>
                <span className="text-lg text-gray-400 line-through">{product.price.toFixed(2)}€</span>
                <span className="text-sm bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                  Économisez {(product.price - presenter.finalPrice).toFixed(2)}€
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-purple-700">{product.price.toFixed(2)}€</span>
            )}
          </div>

          {/* Niveau de magie */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Niveau de magie:</p>
            <MagicLevelIndicator level={product.magicLevel} />
          </div>

          {/* Description courte */}
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Quantité et boutons d'action */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Quantité:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={presenter.decreaseQuantity}
                  disabled={presenter.quantity <= 1}
                  className="h-10 w-10 rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center">{presenter.quantity}</div>
                <Button variant="ghost" size="icon" onClick={presenter.increaseQuantity} className="h-10 w-10 rounded-l-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={presenter.handleAddToCart}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Ajouter au panier
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={presenter.toggleWishlist}
                className={`h-12 w-12 ${presenter.isInWishlist ? "text-red-500 border-red-200 hover:bg-red-50" : ""}`}
              >
                <Heart className={`h-5 w-5 ${presenter.isInWishlist ? "fill-red-500" : ""}`} />
              </Button>
              <Button variant="outline" size="icon" onClick={presenter.handleShare} className="h-12 w-12">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Informations de livraison */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3 mb-2">
              <Truck className="h-5 w-5 text-purple-700 mt-0.5" />
              <div>
                <p className="font-medium text-purple-900">Livraison estimée: {presenter.formattedDeliveryDate}</p>
                <p className="text-sm text-gray-600">Livraison gratuite à partir de 50€</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-purple-700 mt-0.5" />
              <div>
                <p className="font-medium text-purple-900">Garantie d'authenticité</p>
                <p className="text-sm text-gray-600">Tous nos objets sont vérifiés par nos mages experts</p>
              </div>
            </div>
          </div>

          {/* Onglets d'information */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="histoire">Histoire</TabsTrigger>
              <TabsTrigger value="utilisation">Utilisation</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="text-gray-700">
              <p className="mb-4">
                {product.description} Ce précieux artefact a été soigneusement restauré par nos artisans spécialisés
                pour préserver toutes ses propriétés magiques d'origine.
              </p>
              <p>
                Fabriqué à partir de matériaux rares et enchantés, cet objet dégage une aura mystique perceptible même
                par ceux qui ne sont pas sensibles aux énergies magiques. Sa conception unique en fait une pièce de
                collection exceptionnelle.
              </p>
            </TabsContent>
            <TabsContent value="histoire" className="text-gray-700">
              <p className="mb-4">
                Cet objet aurait appartenu à un puissant mage du 17ème siècle, connu pour ses recherches sur les
                dimensions parallèles. Après sa mystérieuse disparition, l'objet a changé de mains plusieurs fois avant
                d'être redécouvert dans une vente aux enchères secrète à Prague en 1923.
              </p>
              <p>
                Plusieurs témoignages historiques mentionnent des phénomènes inexpliqués en présence de cet artefact,
                notamment des fluctuations temporelles mineures et des manifestations lumineuses spontanées.
              </p>
            </TabsContent>
            <TabsContent value="utilisation" className="text-gray-700">
              <p className="mb-4">
                Pour activer les propriétés magiques de cet objet, il est recommandé de le placer dans un endroit calme
                et de se concentrer sur votre intention. Les débutants devraient commencer par de courtes sessions de 5
                à 10 minutes.
              </p>
              <p>
                Attention: Ne pas utiliser en présence d'autres artefacts magiques de niveau 4 ou supérieur sans
                préparation adéquate. Conserver à l'abri de la lumière directe du soleil et des champs magnétiques
                puissants.
              </p>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
