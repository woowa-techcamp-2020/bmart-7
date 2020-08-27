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
import { Loading, Spinner } from '@/components/common'
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
  let hotProducList = []
  let mainCategoryList = []
  const isLoading = hottestResponse.loading || mainCategoryResponse.loading
  const isError = hottestResponse.error || mainCategoryResponse.error
  const loadingClass = isLoading ? '' : 'display-none'
  if (hottestResponse.data) hotProducList = hottestResponse.data.getProducts
  if (mainCategoryResponse.data) mainCategoryList = mainCategoryResponse.data.getMainCategories

  let tempY = 0
  let tempX = 0
  let diffX = 0
  let diffY = 0
  const pointerHandler = (e) => {
    if (isResize) return
    if (tempY > e.clientY) return
    diffX = e.clientX - tempX
    if (Math.abs(diffX) > 5) return
    diffY = e.clientY - tempY
    tempY = e.clientY
    tempX = e.clientX
    if (diffY > 20) {
      if (!isResize) setIsResize(true)
    }
  }
  const pointerEnterHandelr = (e) => {
    if (isResize) return
    diffX = 0
    diffY = 0
    tempY = e.clientY
    tempX = e.clientX
  }
  return (
    <>
      {/* <Loading class={loadingClass} /> */}
      <Spinner isHidden={!isLoading} />
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
        <div
          className={'scroll-top'}
          onPointerMove={pointerHandler}
          onPointerEnter={pointerEnterHandelr}
        >
          <SlickCarousel />
          <MainCategoryList mainCategoryList={mainCategoryList} />
          <Divider />
        </div>
        <div className={'scroll-top'}>
          <ProductSlide
            eagerLoading={false}
            productList={hotProducList}
            title="김영지님을 위해 준비한 상품"
            moreLink=""
          />
        </div>
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
        <CartFloatButton isLoading={isLoading} />
        <Footer />
      </div>
    </>
  )
}
