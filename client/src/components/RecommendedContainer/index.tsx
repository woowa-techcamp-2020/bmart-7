import React, { useState, useEffect } from 'react'
import './style.scss'
import { ProductList } from '@/components/common/ProductList'
import { GET_RECOMMENDED } from './gql'
import { client } from '@/ApolloClient'
import { BsArrowCounterclockwise } from 'react-icons/bs'
interface IProps {
  title: string
  categoryId: number
  totalPageNum: number
}

export const RecommendedContainer: React.FC<IProps> = (props) => {
  const { title, categoryId, totalPageNum } = props
  const count = 6
  const limit = count * totalPageNum
  const [pageNum, setPageNum] = useState(1)
  const [productList, setProductList] = useState([])
  const offset = (pageNum - 1) * count

  useEffect(() => {
    client
      .query({
        query: GET_RECOMMENDED({
          categoryId,
          offset,
          limit,
        }),
      })
      .then(({ data, loading, errors }) => {
        if (loading) return <p>Loading...</p>
        if (errors) return <p>Error...</p>
        setProductList(data.getRecommended)
      })
  }, [])

  const onClickHandler = () => {
    pageNum === totalPageNum ? setPageNum(1) : setPageNum(pageNum + 1)
  }

  return (
    <div className="recommended-container">
      <h2>{title}</h2>
      <ProductList
        column={3}
        productList={productList.slice(offset, offset + count)}
        eagerLoading={offset ? true : false}
      />
      <button onClick={onClickHandler}>
        <span>
          <BsArrowCounterclockwise className="title-icon" />
          {title}?
        </span>
        다른 상품 보기 {pageNum}/{totalPageNum}
      </button>
    </div>
  )
}
