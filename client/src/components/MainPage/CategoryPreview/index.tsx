import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import { GET_PRODUCTS } from './gql'
import './style.scss'
import { ProductList } from '@/components/common/ProductList'
import { IoIosArrowForward } from 'react-icons/io'

interface IProps {
  title?: string
  mainCategoryId?: number
  id?: string
  io?: {
    observe: (HTMLElement) => void
  }
  productList: any[]
  srcLoading: boolean
}
const limit = 10

export const CategoryPreview: React.FC<IProps> = (props) => {
  const { title, mainCategoryId, id, io, productList, srcLoading } = props

  const previewRef = useRef<HTMLDivElement>()
  if (previewRef.current) io.observe(previewRef.current)
  return (
    <div>
      <div className="category-buffer" id={id}></div>
      <div
        className="category-preview-container"
        ref={previewRef}
        data-main-category-id={mainCategoryId}
      >
        <div className="header">
          <h2>{title}</h2>
          <Link to={`/main/category/${mainCategoryId}`} className="more-link">
            더보기 <IoIosArrowForward className="arrow" />
          </Link>
        </div>
        <ProductList
          column={2}
          productList={productList}
          eagerLoading={true}
          srcLoading={srcLoading}
        />
      </div>
    </div>
  )
}
