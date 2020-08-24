import React from 'react'
import './style.scss'

export const Footer: React.FC = () => {
  return (
    <footer className="main-footer-container">
      <input type="button" value="반품 및 교환하기" />
      <p className="footer-customer-center">
        고객센터 오전 9시 ~ 새벽 3시<span>1600-0025</span>
      </p>
      <p className="footer-copyright">Copyright by jihwan, bumsu, blair</p>
    </footer>
  )
}
