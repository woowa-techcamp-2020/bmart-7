import React, { useState } from 'react'
import './style.scss'
import { ProductList } from '@/components/common/ProductList'
import { GET_RECOMMENDED } from './gql'
import { useQuery } from 'react-apollo'
import { BsArrowCounterclockwise } from 'react-icons/bs'
interface IProps {
  title: string
  categoryId: number
  totalPageNum: number
}

export const RecommendedContainer: React.FC<IProps> = (props) => {
  const limit = 6
  const [pageNum, setPageNum] = useState(1)
  const offset = (pageNum - 1) * limit
  const { title, categoryId, totalPageNum } = props
  const { loading, error, data } = useQuery(GET_RECOMMENDED, {
    variables: {
      offset,
      limit,
      categoryId,
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const productList = data.getRecommended

  return (
    <div className="recommended-container">
      <h2>{title}</h2>
      <ProductList column={3} productList={productList} />
      <button onClick={() => setPageNum(pageNum + 1)}>
        <span>
          <BsArrowCounterclockwise className="title-icon" />
          {title}?
        </span>{' '}
        다른 상품 보기 {pageNum}/{totalPageNum}
      </button>
    </div>
  )
}
