"use client"

import { useCategoryShowcase } from "./category-showcase.hook"
import CategoryCarousel from "@/components/category-carouse"

export default function CategoryShowcaseSection() {
  const presenter = useCategoryShowcase()
  if (!presenter.mounted) return null

  return <CategoryCarousel categories={presenter.categories} />
}