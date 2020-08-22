import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import { Category } from '@/types'

export type CategoryListProps = {
  categoryList: Category[]
}

export const CategoryList: React.FC<CategoryListProps> = (props) => {
  const { categoryList } = props

  return (
    <div className="category-list">
      {categoryList.map((category) => (
        <Link to={`/category/${category.id}`} className="category" key={category.id}>
          {category.title}
        </Link>
      ))}
    </div>
  )
}
