"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Sparkles, ChevronDown, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MagicBookIntro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isBookOpen, setIsBookOpen] = useState(false)
  const [showSkip, setShowSkip] = useState(true)

  // Animation liée au défilement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Animations fluides
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Transformations basées sur le défilement
  const bookRotation = useTransform(smoothProgress, [0, 0.3], [0, 180])
  const leftPageRotation = useTransform(smoothProgress, [0.3, 0.6], [0, -180])
  const rightPageRotation = useTransform(smoothProgress, [0.6, 0.9], [0, 180])
  const bookScale = useTransform(smoothProgress, [0, 0.3, 0.9, 1], [0.6, 1, 1, 0.8])
  const bookOpacity = useTransform(smoothProgress, [0.9, 1], [1, 0])
  const titleOpacity = useTransform(smoothProgress, [0, 0.2, 0.3], [0, 0, 1])
  const subtitleOpacity = useTransform(smoothProgress, [0.3, 0.4, 0.5], [0, 0, 1])
  const contentOpacity = useTransform(smoothProgress, [0.5, 0.6, 0.7], [0, 0, 1])
  const particlesOpacity = useTransform(smoothProgress, [0.7, 0.8, 0.9], [0, 1, 0])

  // Effet pour détecter le défilement et ouvrir le livre automatiquement après un délai
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !hasScrolled) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Ouvrir le livre automatiquement après 1.5 secondes
    const timer = setTimeout(() => {
      setIsBookOpen(true)
    }, 1500)

    // Masquer le bouton "Passer" après 8 secondes
    const skipTimer = setTimeout(() => {
      setShowSkip(false)
    }, 8000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
      clearTimeout(skipTimer)
    }
  }, [hasScrolled])

  // Fonction pour faire défiler vers le catalogue
  const scrollToCatalog = () => {
    const catalogSection = document.getElementById("catalog-section")
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* Section fixe qui reste en place pendant le défilement */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700">
        {/* Fond magique avec étoiles et particules */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Étoiles scintillantes */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: "0 0 4px 1px rgba(255, 255, 255, 0.5)",
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}

          {/* Cercles lumineux */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 300 + 200}px`,
                height: `${Math.random() * 300 + 200}px`,
                background: `radial-gradient(circle, ${
                  i % 2 === 0 ? "rgba(139, 92, 246, 0.3)" : "rgba(245, 158, 11, 0.2)"
                } 0%, rgba(30, 20, 60, 0) 70%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25, 0],
                y: [0, Math.random() * 50 - 25, 0],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Conteneur du livre */}
        <motion.div
          className="relative"
          style={{
            scale: bookScale,
            opacity: bookOpacity,
          }}
        >
          {/* Livre */}
          <div className="relative perspective-[1200px] w-[300px] sm:w-[500px] md:w-[600px] h-[200px] sm:h-[350px] md:h-[400px]">
            {/* Couverture du livre */}
            <motion.div
              className="absolute w-full h-full bg-gradient-to-br from-amber-800 to-amber-950 rounded-lg border-4 border-amber-700 shadow-2xl flex items-center justify-center origin-left"
              style={{
                rotateY: isBookOpen ? bookRotation : 0,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(255, 215, 0, 0.3)",
              }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: isBookOpen ? 180 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="absolute inset-4 border-2 border-amber-500/30 rounded-md"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center transform rotate-180" style={{ writingMode: "vertical-rl" }}>
                  <h1 className="text-2xl sm:text-4xl font-bold text-amber-300 font-serif tracking-wider">
                    Objets Enchantés
                  </h1>
                  <div className="w-40 h-1 bg-amber-500/50 my-4 mx-auto"></div>
                  <p className="text-amber-200/80 text-sm sm:text-base">Catalogue des Merveilles</p>
                </div>
              </div>
            </motion.div>

            {/* Page de gauche */}
            <motion.div
              className="absolute w-full h-full bg-amber-100 rounded-lg shadow-lg flex items-center justify-center origin-left"
              style={{
                rotateY: isBookOpen ? leftPageRotation : -180,
                boxShadow: "0 10px 15px rgba(0, 0, 0, 0.3)",
              }}
              initial={{ rotateY: -180 }}
              animate={{ rotateY: isBookOpen ? leftPageRotation.get() : -180 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
            >
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=600&text=Texture+Papier')] opacity-20"></div>
              <div className="p-8 sm:p-12 text-center">
                <motion.h2
                  className="text-xl sm:text-3xl font-bold text-purple-900 mb-4 font-serif"
                  style={{ opacity: titleOpacity }}
                >
                  Bienvenue dans notre collection
                </motion.h2>
                <motion.p className="text-sm sm:text-lg text-gray-700 mb-6" style={{ opacity: subtitleOpacity }}>
                  Découvrez des objets magiques uniques, soigneusement sélectionnés pour leur authenticité et leur
                  pouvoir.
                </motion.p>
                <motion.div style={{ opacity: contentOpacity }}>
                  <p className="text-xs sm:text-sm text-gray-600 italic mb-4">
                    "Chaque objet raconte une histoire, chaque artefact détient un secret. Explorez notre catalogue et
                    laissez la magie entrer dans votre vie."
                  </p>
                  <div className="flex justify-center">
                    <BookOpen className="h-8 w-8 text-purple-600" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Page de droite */}
            <motion.div
              className="absolute w-full h-full bg-amber-100 rounded-lg shadow-lg flex items-center justify-center origin-right"
              style={{
                rotateY: isBookOpen ? rightPageRotation : 0,
                boxShadow: "0 10px 15px rgba(0, 0, 0, 0.3)",
              }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: isBookOpen ? rightPageRotation.get() : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 3 }}
            >
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=600&text=Texture+Papier')] opacity-20"></div>
              <div className="p-8 sm:p-12 text-center">
                <motion.div style={{ opacity: contentOpacity }}>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-2">
                        <Sparkles className="h-6 w-6 text-purple-600" />
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700">Objets authentiques</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-amber-600"
                        >
                          <path d="M12 22v-5" />
                          <path d="M9 8V2" />
                          <path d="M15 8V2" />
                          <path d="M18 8v4.09a1.93 1.93 0 0 1-1.06 1.77l-5 2.73a1.93 1.93 0 0 1-1.88 0l-5-2.73A1.93 1.93 0 0 1 6 12.09V8" />
                          <path d="M12 17v-5.88" />
                          <path d="M6 8h12" />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700">Pouvoirs vérifiés</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 italic">
                    Faites défiler pour découvrir notre collection d'objets magiques et commencer votre voyage dans le
                    monde de l'enchantement.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Particules magiques qui sortent du livre */}
            <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: particlesOpacity }}>
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: "50%",
                    y: "50%",
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: `${Math.random() * 200 - 100 + 50}%`,
                    y: `${Math.random() * 200 - 100 + 50}%`,
                    scale: Math.random() * 0.5 + 0.5,
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    ease: "easeOut",
                    delay: Math.random() * 2 + 3,
                  }}
                >
                  <Sparkles className={`h-3 w-3 ${i % 2 === 0 ? "text-amber-400" : "text-purple-400"}`} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Indicateur de défilement */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
          animate={{
            opacity: [0.5, 1, 0.5],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <p className="text-sm mb-2 text-white/80">Défiler pour explorer</p>
          <ChevronDown className="h-6 w-6" />
        </motion.div>

        {/* Bouton pour passer l'animation */}
        <AnimatePresence>
          {showSkip && (
            <motion.div
              className="absolute top-6 right-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={scrollToCatalog}
              >
                Passer l'animation
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
