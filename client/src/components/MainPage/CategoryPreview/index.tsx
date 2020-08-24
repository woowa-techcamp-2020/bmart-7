import React, { useEffect, useRef } from 'react'
import { useQuery } from 'react-apollo'
import { GET_PRODUCTS } from './gql'
import './style.scss'
import { ProductList } from '@/components/common/ProductList'

interface IProps {
  title: string
  mainCategoryId: number
  id: string
  io: {
    observe: (HTMLElement) => void
  }
}
const limit = 10

export const CategoryPreview: React.FC<IProps> = (props) => {
  const { title, mainCategoryId, id, io } = props

  const previewRef = useRef<HTMLDivElement>()
  if (previewRef.current) io.observe(previewRef.current)

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      input: {
        limit,
        mainCategoryId,
      },
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const productList = data.getProducts

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
          <a href="#">더보기 &gt;</a>
        </div>
        <ProductList column={2} productList={productList} eagerLoading={true} />
      </div>
    </div>
  )
}
