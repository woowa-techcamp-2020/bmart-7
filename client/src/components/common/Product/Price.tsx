import React from 'react'
import { formatPrice } from '@/utils'

type PriceProps = {
  originPrice: number
  salePrice: number
  salePercent: number
}

export const Price: React.FC<PriceProps> = (props) => {
  const { originPrice, salePrice, salePercent } = props

  return (
    <div className="price">
      {salePercent !== 0 ? (
        <>
          <div className="origin-price-wrapper">
            <div className="sale-percent">{formatPrice(salePercent)}%</div>
            <div className="origin-price">{formatPrice(originPrice)}원</div>
          </div>
          <div className="display-price">{formatPrice(salePrice)}원</div>
        </>
      ) : (
        <div className="display-price">{formatPrice(originPrice)}원</div>
      )}
    </div>
  )
}
