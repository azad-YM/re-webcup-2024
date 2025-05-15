"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface MagicLevelIndicatorProps {
  level: number // 1-5
}

export default function MagicLevelIndicator({ level }: MagicLevelIndicatorProps) {
  // Définir les couleurs en fonction du niveau de magie
  const getColor = (index: number) => {
    if (index >= level) return "bg-gray-200"

    switch (level) {
      case 1:
        return "bg-blue-400"
      case 2:
        return "bg-green-400"
      case 3:
        return "bg-amber-400"
      case 4:
        return "bg-purple-500"
      case 5:
        return "bg-red-500"
      default:
        return "bg-gray-200"
    }
  }

  // Définir le texte descriptif du niveau
  const getLevelText = () => {
    switch (level) {
      case 1:
        return "Faible - Effets subtils"
      case 2:
        return "Modéré - Effets perceptibles"
      case 3:
        return "Significatif - Effets notables"
      case 4:
        return "Puissant - Effets importants"
      case 5:
        return "Exceptionnel - Effets majeurs"
      default:
        return "Inconnu"
    }
  }

  return (
    <div>
      <div className="flex items-center gap-1 mb-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`h-3 w-8 rounded-full ${getColor(i)}`}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: i < level ? 1 : 0.8,
              opacity: i < level ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      <div className="flex items-center text-sm">
        <span className={`font-medium ${level >= 4 ? "text-purple-700 flex items-center gap-1" : "text-gray-600"}`}>
          {level >= 4 && <Sparkles className="h-3 w-3 text-amber-500" />}
          {getLevelText()}
        </span>
      </div>
    </div>
  )
}
