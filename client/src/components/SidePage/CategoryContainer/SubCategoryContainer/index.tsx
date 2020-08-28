import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import { access } from 'fs'

interface IProps {
  mainId: string
  isShow: boolean
  subCategories: {
    title: string
    id: string
  }[]
}
export const SubCategoryContainer: React.FC<IProps> = (props) => {
  const { mainId, isShow, subCategories } = props
  const newsubCategories = subCategories.reduce(
    (acc, data) => {
      return [...acc, data]
    },
    [{ title: '전체보기', id: mainId }]
  )

  const path = (id) => {
    if (id === mainId) {
      return '/main/category/'
    } else {
      return '/category/'
    }
  }

  if (newsubCategories.length % 2 === 1) newsubCategories.push({ title: '', id: '' })

  return (
    <>
      {isShow
        ? newsubCategories.map((data, idx) => (
            <Link to={`${path(data.id)}${data.id}`} key={idx}>
              <li className="title sub-title">{data.title}</li>
            </Link>
          ))
        : null}
    </>
  )
}
