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
  const [srcLoading, setSrcLoading] = useState(false)
  const [io] = useState(makeIntersectionObserver(() => setSrcLoading(true)))

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
    io.observe(ref.current)
  }

  const onClickHandler = () => {
    pageNum === totalPageNum ? setPageNum(1) : setPageNum(pageNum + 1)
  }
  useEffect(() => {
    fetchRecommended()
  }, [])

  // if (ref.current) io.observe(ref.current)

  return (
    <div className="recommended-container" ref={ref}>
      <h2>{title}</h2>
      <ProductList
        column={3}
        productList={productList.slice(offset, offset + count)}
        srcLoading={srcLoading}
        eagerLoading={true}
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
