import React from 'react'
import './style.scss'

export type FavoriteHeaderProps = {
  count: number
}

export const FavoriteHeader: React.FC<FavoriteHeaderProps> = (props) => {
  const { count } = props

  return (
    <div className="favorite-header">
      <div className="title">찜한상품 {count}개</div>
    </div>
  )
}
