import React from 'react'
import './style.scss'

export const Spinner: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  )
}
