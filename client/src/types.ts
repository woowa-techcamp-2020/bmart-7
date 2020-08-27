export type Section = {
  id: number
  title: string
  mainCategories?: MainCategory[]
}

export type MainCategory = {
  id: number
  title: string
  imageUrl?: string
  section?: Section
  categories?: Category[]
}

export type Category = {
  id: number
  title: string
  mainCategory?: MainCategory
  products?: Product[]
}

export type Product = {
  id: number
  title: string
  originPrice: number
  salePrice: number
  salePercent: number
  amount: number
  mainImage: string
  category?: Category
  description?: string
  isMain?: boolean
  hit?: number
  bannerImage?: string
}

export type Favorite = {
  id: number
  product: Product
}

export type CartItem = {
  id: number
  count: number
  product: Product
}
