import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

export const EmptyCart: React.FC = () => {
  return (
    <div className="empty-cart">
      <img className="empty-cart-img" src="./images/empty-cart.jpeg" />
      <div className="message">장바구니가 텅 비어있어요</div>
      <Link to="/" className="main-link">
        담으러 가기
      </Link>
    </div>
  )
}
