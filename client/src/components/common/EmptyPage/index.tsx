import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

type EmptyPageProps = {
  title: string
  buttonText: string
}

export const EmptyPage: React.FC<EmptyPageProps> = ({ title, buttonText }) => {
  return (
    <div className="empty-cart">
      <img className="empty-cart-img" src="./images/empty-cart.jpeg" />
      <div className="message">{title}</div>
      <Link to="/" className="main-link">
        {buttonText}
      </Link>
    </div>
  )
}
