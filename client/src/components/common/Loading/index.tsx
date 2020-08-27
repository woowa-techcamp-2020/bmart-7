import React from 'react'
import './style.scss'

export const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <img src="./images/bmart-loading.png" alt="" className="loading-img" />
    </div>
  )
}
