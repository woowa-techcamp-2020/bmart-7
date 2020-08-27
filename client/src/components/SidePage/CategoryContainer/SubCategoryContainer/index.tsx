import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

interface IProps {
  mainId: string
  subCategories: {
    title: string
    id: string
  }[]
}

export const SubCategoryContainer: React.FC<IProps> = (props) => {
  const { mainId, subCategories } = props
  return (
    <>
      {subCategories.map((data, idx) => (
        <Link to={`/category/${data.id}`}>
          <li key={idx} className="title sub-title">
            {data.title}
          </li>
        </Link>
      ))}
    </>
  )
}
