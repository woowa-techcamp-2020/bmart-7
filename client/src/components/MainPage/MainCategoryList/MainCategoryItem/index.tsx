import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

interface IconProps {
  id: number
  url: string
  title: string
}

export const MainCategoryItem: React.FC<IconProps> = (props) => {
  const { id, url, title } = props
  return (
    <Link to={`/main/category/${id}`} className="category-item">
      <img data-id={id} src={url} alt="cat" />
      <div className="title">{title}</div>
    </Link>
  )
}
