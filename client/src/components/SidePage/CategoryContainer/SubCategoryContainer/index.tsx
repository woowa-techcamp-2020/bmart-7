import React from 'react'
import './style.scss'

interface IProps {
  subCategories: {
    title: string
  }[]
}

export const SubCategoryContainer: React.FC<IProps> = (props) => {
  const { subCategories } = props
  console.log(subCategories)
  return (
    <>
      {subCategories.map((data, idx) => (
        <li key={idx} className="title sub-title">
          {data.title}
        </li>
      ))}
    </>
  )
}
