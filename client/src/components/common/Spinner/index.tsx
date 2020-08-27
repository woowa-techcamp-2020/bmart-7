import React from 'react'
import './style.scss'

interface IProps {
  isHidden?: boolean
}
export const Spinner: React.FC<IProps> = ({ isHidden }) => {
  const hiddenClass = isHidden ? 'display-none' : ''
  return (
    <div className={`loader-container ${hiddenClass}`}>
      <div className="loader"></div>
    </div>
  )
}
