import React, { useRef, useEffect } from 'react'
import './style.scss'
import { Product as ProductType } from '@/types'
import { Product } from '@/components/common/Product'
import { IoIosArrowForward } from 'react-icons/io'

export type ProductSlideProps = {
  title: string
  moreLink?: string
  productList?: ProductType[]
}

export const ProductSlide: React.FC<ProductSlideProps> = (props) => {
  const { title, moreLink, productList } = props
  const ref = useRef<HTMLDivElement>()
  return (
    <div className="product-slide" ref={ref}>
      <div className="title-wrapper">
        <div className="title">{title}</div>
        {moreLink ? (
          <div className="more-link">
            더보기 <IoIosArrowForward className="arrow" />
          </div>
        ) : null}
      </div>
      <div className="slider-wrapper">
        {productList.map((product) => (
          <Product product={product} key={product.id} />
        ))}
        <div className="buffer"></div>
      </div>
    </div>
  )
}
