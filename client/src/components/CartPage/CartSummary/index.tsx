import React from 'react'
import './style.scss'
import { formatPrice } from '@/utils'

export const CartSummary: React.FC<{ totalPrice: number }> = ({ totalPrice }) => {
  return (
    <div className="cart-summary">
      <div className="price-info">
        <div className="info-wrapper">
          <div className="title">주문금액</div>
          <div className="price-wrapper">
            <div className="price">{formatPrice(totalPrice)}원</div>
          </div>
        </div>
        <div className="info-wrapper">
          <div className="title">배달팁</div>
          <div className="price-wrapper">
            <div className="origin-price">1,500원</div>
            <div className="price">0원</div>
          </div>
        </div>
      </div>
      <div className="event-info">
        <p>배달팁 할인 이벤트가 진행중입니다. (~2020년 8월 31일까지)</p>
        <p>배달팁 할인 이벤트는 내부사정으로 사전 예고 없이 조기 종료될 수 있습니다.</p>
      </div>
    </div>
  )
}
