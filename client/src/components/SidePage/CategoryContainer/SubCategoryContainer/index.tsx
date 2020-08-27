import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

interface IProps {
  isShow: boolean
  subCategories: {
    title: string
    id: string
  }[]
}

export const SubCategoryContainer: React.FC<IProps> = (props) => {
  const { isShow, subCategories } = props
  if (subCategories.length % 2 === 1) subCategories.push({ title: '', id: '' })
  return (
    <>
      {isShow
        ? subCategories.map((data, idx) => (
            <Link to={`/category/${data.id}`}>
              <li key={idx} className="title sub-title">
                {data.title}
              </li>
            </Link>
          ))
        : null}
    </>
  )
}
