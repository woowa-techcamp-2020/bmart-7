import React from 'react'
import './style.scss'
import { Product as ProductType } from '@/types'
import { HeartIcon } from './HeartIcon'
import { CartIcon } from './CartIcon'
import { Price } from './Price'

const imageBaseUrl = process.env.REACT_APP_S3_URL

export type ProductProps = {
  product: ProductType
  eagerLoading?: boolean
}

export const Product: React.FC<ProductProps> = (props) => {
  const {
    product: { id, title, originPrice, salePrice, salePercent, amount, mainImage },
    eagerLoading,
  } = props
  const priceProps = { originPrice, salePrice, salePercent }

  return (
    <li className="product">
      <div className="image-wrapper">
        {eagerLoading ? (
          <img src={imageBaseUrl + mainImage} loading="eager" alt="no image" />
        ) : (
          <img src={imageBaseUrl + mainImage} loading="lazy" alt="no image" />
        )}

        <div className="icon-container">
          <CartIcon id={id} />
          <HeartIcon id={id} />
        </div>
      </div>
      <div className="product-wrapper">
        <div className="info-wrapper">
          <h3 className="title">{title}</h3>
          <Price {...priceProps} />
        </div>
      </div>
    </li>
  )
}
