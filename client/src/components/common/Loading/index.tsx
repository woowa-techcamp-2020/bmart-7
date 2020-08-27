import React from 'react'
import './style.scss'

interface IProps {
  class: string
}
export const Loading: React.FC<IProps> = (props) => {
  return (
    <div className={`loading-container ${props.class}`}>
      <img src="./images/bmart-loading.png" alt="" className="loading-img" />
    </div>
  )
}
