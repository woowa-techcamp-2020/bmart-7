import React from 'react'
import { CartItem as CartItemType } from '@/types'
import { formatPrice } from '@/utils'

export const Price: React.FC<CartItemType> = ({ product, count }) => {
  return (
    <div className="price-wrapper">
      <div className="origin-price">({formatPrice(product.originPrice)})원</div>
      <div className="sale-wrapper">
        {product.salePercent ? (
          <div className="origin-total-price">{formatPrice(product.originPrice * count)}원</div>
        ) : null}
        <div className="sale-price">{formatPrice(product.salePrice * count)}원</div>
      </div>
    </div>
  )
}
