import React, { useState, useEffect, useRef } from 'react'
import './style.scss'
import { ProductList } from '@/components/common/ProductList'
import { GET_RECOMMENDED } from './gql'
import { client } from '@/ApolloClient'
import { BsArrowCounterclockwise } from 'react-icons/bs'
import { makeIntersectionObserver, fetchQuery } from '@/utils/index'
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
  const ref = useRef()
  const fetchRecommended = async () => {
    const { getRecommended } = await fetchQuery({
      query: GET_RECOMMENDED,
      variables: {
        categoryId,
        offset,
        limit,
      },
    })

    setProductList(getRecommended)
  }

  const [io] = useState(makeIntersectionObserver(fetchRecommended))

  useEffect(() => {
    io.observe(ref.current)
  }, [])

  const onClickHandler = () => {
    pageNum === totalPageNum ? setPageNum(1) : setPageNum(pageNum + 1)
  }

  return (
    <div className="recommended-container" ref={ref}>
      <h2>{title}</h2>
      <ProductList
        column={3}
        productList={productList.slice(offset, offset + count)}
        eagerLoading={offset ? true : false}
      />
      <button onClick={onClickHandler}>
        <span>
          <BsArrowCounterclockwise className="title-icon" />
          {title}
        </span>
        다른 상품 보기 {pageNum}/{totalPageNum}
      </button>
    </div>
  )
}
