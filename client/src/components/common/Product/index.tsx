import React from 'react'
import './style.scss'
import { Product as ProductType } from '@/types'
import { HeartIcon } from './HeartIcon'
import { CartIcon } from './CartIcon'
import { Price } from './Price'

const imageBaseUrl = process.env.REACT_APP_S3_URL

export type ProductProps = {
  product: ProductType
  isBannerImg?: boolean
  eagerLoading?: boolean
  srcLoading?: boolean
}

export const Product: React.FC<ProductProps> = (props) => {
  const {
    product: { id, title, originPrice, salePrice, salePercent, amount, mainImage, bannerImage },
    eagerLoading,
    srcLoading = true,
    isBannerImg,
  } = props
  const priceProps = { originPrice, salePrice, salePercent }
  const imageUrl = imageBaseUrl + (isBannerImg ? bannerImage : mainImage)

  const imgLoading = eagerLoading ? 'eager' : 'lazy'
  return (
    <li className="product">
      <div className="image-wrapper">
        {srcLoading ? (
          <img src={imageUrl} loading={imgLoading} alt="no" />
        ) : (
          <div className="like-img"></div>
        )}
        <div className="icon-container">
          <HeartIcon id={id} />
          {amount ? <CartIcon id={id} /> : null}
        </div>
        {amount ? null : (
          <div className="sold-out">
            <p className="message">다 팔렸어요</p>
          </div>
        )}
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
