import React, { useEffect, useRef } from 'react'
import './style.scss'
import { Product as ProductType } from '@/types'
import { Product } from '@/components/common/Product'

const FONT_SIZE: number = 1
const BASE_COLUMN: number = 2
const BUFFER: number = 0.5

export type ProductListType = {
  productList: ProductType[]
  column: number
}

export const ProductList: React.FC<ProductListType> = (props) => {
  const { productList, column } = props
  const productListElement = useRef<HTMLUListElement>()

  useEffect(() => {
    productListElement.current.style.gridTemplateColumns = `repeat(${column}, 1fr)`

    const gap: number = BASE_COLUMN / column
    const fontResize: number =
      gap < 1 ? (BASE_COLUMN + BUFFER) / column : gap > 1 ? (BASE_COLUMN - BUFFER) / column : 1
    productListElement.current.style.fontSize = `${fontResize * FONT_SIZE}rem`
  }, [])

  return (
    <ul className="product-list" ref={productListElement}>
      {productList.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </ul>
  )
}
