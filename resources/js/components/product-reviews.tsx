"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, User, ThumbsUp, Flag, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface ProductReviewsProps {
  productId: string
}

// Données fictives pour les avis
const mockReviews = [
  {
    id: "1",
    author: "Marie L.",
    rating: 5,
    date: "15/04/2025",
    title: "Absolument magique !",
    content:
      "Cet objet a dépassé toutes mes attentes. Les effets sont exactement comme décrits et la qualité est exceptionnelle. Je l'utilise quotidiennement et je remarque déjà des changements positifs dans mon environnement.",
    helpful: 12,
    verified: true,
  },
  {
    id: "2",
    author: "Thomas D.",
    rating: 4,
    date: "02/04/2025",
    title: "Très bon produit, mais...",
    content:
      "L'objet fonctionne très bien et l'effet est impressionnant. Je retire une étoile car l'intensité diminue un peu après quelques heures d'utilisation. Il faut le recharger à la lumière de la lune, ce qui n'était pas clairement indiqué dans la description.",
    helpful: 8,
    verified: true,
  },
  {
    id: "3",
    author: "Sophie M.",
    rating: 5,
    date: "28/03/2025",
    title: "Un trésor rare",
    content:
      "Je collectionne les objets magiques depuis des années et celui-ci est vraiment spécial. Son aura est puissante et stable. La livraison a été rapide et l'emballage protégeait parfaitement l'objet. Je recommande vivement ce vendeur !",
    helpful: 15,
    verified: true,
  },
  {
    id: "4",
    author: "Lucas B.",
    rating: 3,
    date: "15/03/2025",
    title: "Correct mais pas exceptionnel",
    content:
      "L'objet est bien fait et fonctionne, mais je m'attendais à quelque chose de plus puissant vu le prix. Les effets sont subtils et il faut vraiment se concentrer pour les percevoir. Peut-être que je n'ai pas encore trouvé la bonne façon de l'utiliser.",
    helpful: 4,
    verified: false,
  },
]

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([])
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [reviewContent, setReviewContent] = useState("")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const displayedReviews = showAllReviews ? mockReviews : mockReviews.slice(0, 2)

  const handleHelpful = (reviewId: string) => {
    if (helpfulReviews.includes(reviewId)) {
      setHelpfulReviews(helpfulReviews.filter((id) => id !== reviewId))
    } else {
      setHelpfulReviews([...helpfulReviews, reviewId])
    }
  }

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast("Veuillez attribuer une note", {
        description: "Vous devez attribuer une note avant de soumettre votre avis",
      })
      return
    }

    if (reviewContent.trim().length < 10) {
      toast("Avis trop court", {
        description: "Veuillez écrire un avis plus détaillé (minimum 10 caractères)",
      })
      return
    }

    toast("Merci pour votre avis !", {
      description: "Votre avis a été soumis avec succès et sera publié après modération",
    })

    setReviewContent("")
    setRating(0)
  }

  // Calculer la note moyenne
  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length

  // Calculer la distribution des notes
  const ratingDistribution = [0, 0, 0, 0, 0]
  mockReviews.forEach((review) => {
    ratingDistribution[review.rating - 1]++
  })

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Résumé des avis */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-purple-900 mb-4">Résumé des avis</h3>

          <div className="flex items-center mb-6">
            <div className="text-4xl font-bold text-purple-900 mr-4">{averageRating.toFixed(1)}</div>
            <div>
              <div className="flex mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.round(averageRating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">{mockReviews.length} avis</div>
            </div>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingDistribution[stars - 1]
              const percentage = (count / mockReviews.length) * 100

              return (
                <div key={stars} className="flex items-center text-sm">
                  <div className="w-12 text-gray-600">{stars} étoiles</div>
                  <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <div className="w-8 text-right text-gray-500">{count}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Écrire un avis */}
        <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-purple-900 mb-4">Partagez votre expérience</h3>

          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Votre note</div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="p-1"
                  onMouseEnter={() => setHoverRating(i + 1)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(i + 1)}
                >
                  <Star
                    className={`h-6 w-6 ${
                      (hoverRating ? i < hoverRating : i < rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Votre avis</div>
            <Textarea
              placeholder="Partagez votre expérience avec ce produit..."
              className="min-h-[120px]"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmitReview} className="bg-purple-600 hover:bg-purple-700">
            Soumettre mon avis
          </Button>
        </div>
      </div>

      {/* Liste des avis */}
      <div className="space-y-6">
        {displayedReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-2 mr-3">
                  <User className="h-5 w-5 text-purple-700" />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">{review.author}</span>
                    {review.verified && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Achat vérifié
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{review.date}</div>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>

            <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
            <p className="text-gray-700 mb-4">{review.content}</p>

            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm ${helpfulReviews.includes(review.id) ? "text-purple-700" : "text-gray-500"}`}
                onClick={() => handleHelpful(review.id)}
              >
                <ThumbsUp className={`h-4 w-4 mr-1 ${helpfulReviews.includes(review.id) ? "fill-purple-700" : ""}`} />
                Utile ({helpfulReviews.includes(review.id) ? review.helpful + 1 : review.helpful})
              </Button>

              <Button variant="ghost" size="sm" className="text-sm text-gray-500">
                <Flag className="h-4 w-4 mr-1" />
                Signaler
              </Button>
            </div>
          </motion.div>
        ))}

        {mockReviews.length > 2 && (
          <div className="text-center mt-4">
            <Button
              variant="outline"
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="text-purple-700 border-purple-200"
            >
              {showAllReviews ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Voir moins d'avis
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Voir tous les avis ({mockReviews.length})
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
