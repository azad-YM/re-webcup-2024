export interface Product {
  id: string
  name: string
  description: string
  price: number
  discount: number
  image: string
  category: string
  isNew: boolean
  magicLevel: number // 1-5, 5 being the most magical
}

export interface CartItem {
  product: Product
  quantity: number
}
