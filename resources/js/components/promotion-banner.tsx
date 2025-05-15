"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PromotionBannerProps {
  title: string
  description: string
  endDate: string
}

export default function PromotionBanner({ title, description, endDate }: PromotionBannerProps) {
  const [timeLeft, setTimeLeft] = useState("")
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime()

      if (difference <= 0) {
        setTimeLeft("Offre expirée")
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

      setTimeLeft(`${days}j ${hours}h ${minutes}m`)
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000)

    return () => clearInterval(timer)
  }, [endDate])

  if (!visible) return null

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-purple-600 text-white p-6 mb-8 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-white hover:bg-white/20"
          onClick={() => setVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="inline-flex items-center gap-2 bg-white/20 px-5 py-2 rounded-full">
          <Clock className="h-4 w-4" />
          <span className="font-mono font-medium">{timeLeft}</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
          <p className="text-white/90">{description}</p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          
          <Button className="bg-white text-purple-700 hover:bg-white/90 hover:text-purple-800">
            En profiter maintenant
          </Button>
        </div>
      </div>

      <motion.div
        className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/10 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 8,
        }}
      />

      <motion.div
        className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 10,
          delay: 1,
        }}
      />
    </motion.div>
  )
}
