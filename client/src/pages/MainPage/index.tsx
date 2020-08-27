import React, { useRef, useState, useEffect } from 'react'
import { RouteProps } from 'react-router'
import './style.scss'
import { GET_PRODUCTS, GET_MAIN_CATEGORIES } from './gql'
import {
  MainCategoryList,
  RecommendedContainer,
  CategoryPreviewSection,
  PreviewContainer,
  Footer,
} from '@/components/MainPage'
import { Loading } from '@/components/common'
import { SlickCarousel, ProductSlide, Divider, Header, CartFloatButton } from '@/components/common'
import { makeIntersectionObserver, fetchQuery } from '@/utils/index'
import { useQuery } from 'react-apollo'
import { RandomRecommend } from './RandomRecommend'
import { ProductSlideFetch } from './ProductSlideFetch'

const sortByList = {
  CREATED_AT: 'createdAt',
  HIT: 'hit',
}

const useGetProducts = (sortBy) => {
  return useQuery(GET_PRODUCTS, {
    variables: {
      input: {
        sortBy,
        isAscending: false,
        limit: 10,
      },
    },
  })
}

export const MainPage: React.FC<RouteProps> = ({ history }) => {
  const [isResize, setIsResize] = useState(false)
  const hottestResponse = useGetProducts(sortByList.HIT)
  const mainCategoryResponse = useQuery(GET_MAIN_CATEGORIES, {
    variables: {
      isMain: true,
    },
    fetchPolicy: 'cache-and-network',
  })
  const isLoading = hottestResponse.loading || mainCategoryResponse.loading
  const isError = hottestResponse.error || mainCategoryResponse.error
  if (isLoading) return <Loading />
  if (isError) return <p>에러</p>
  const hotProducList = hottestResponse.data.getProducts
  const mainCategoryList = mainCategoryResponse.data.getMainCategories

  let temp = 0
  let diff = 0

  const pointerHandler = (e) => {
    e.preventDefault()
    if (isResize) return
    if (temp > e.clientY) return
    diff = e.clientY - temp
    temp = e.clientY
    if (diff > 4) {
      if (!isResize) setIsResize(true)
    }
  }
  const pointerEnterHandelr = (e) => {
    e.preventDefault()
    if (isResize) return
    diff = 0
    temp = e.clientY
  }
  return (
    <div id="main-page">
      <Header
        title={
          <h1>
            <img src="./images/bmart-logo.png" alt="B마트" className="header-logo" />
          </h1>
        }
        history={history}
      />
      {isResize ? <RandomRecommend resetHandler={() => setIsResize(false)} /> : <></>}
      <div onPointerMove={pointerHandler} onPointerEnter={pointerEnterHandelr}>
        <SlickCarousel />
        <MainCategoryList mainCategoryList={mainCategoryList} />
        <Divider />
      </div>
      <ProductSlide productList={hotProducList} title="김영지님을 위해 준비한 상품" moreLink="" />
      <Divider />
      <PreviewContainer />
      <Divider />
      <RecommendedContainer title="지금 뭐 먹지?" categoryId={187} totalPageNum={3} />
      <Divider />
      <ProductSlideFetch sortBy={sortByList.CREATED_AT} />
      <Divider />
      <RecommendedContainer title="지금 필요한 생필품!" categoryId={187} totalPageNum={3} />
      <Divider />
      <CategoryPreviewSection />
      <CartFloatButton />
      <Footer />
    </div>
  )
}
