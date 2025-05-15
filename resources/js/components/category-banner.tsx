"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface CategoryBannerProps {
  title: string
  icon: ReactNode
  color: "purple" | "red" | "green" | "amber"
}

export default function CategoryBanner({ title, icon, color }: CategoryBannerProps) {
  const getColorClasses = () => {
    switch (color) {
      case "red":
        return "from-red-500 to-red-600"
      case "green":
        return "from-emerald-500 to-emerald-600"
      case "amber":
        return "from-amber-500 to-amber-600"
      default:
        return "from-purple-600 to-purple-700"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r ${getColorClasses()} rounded-lg px-6 py-4 text-white shadow-md`}
    >
      <div className="flex items-center">
        <div className="bg-white/20 rounded-full p-2 mr-3">{icon}</div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </motion.div>
  )
}
