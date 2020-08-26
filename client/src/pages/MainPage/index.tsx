import React, { useRef, useState, useEffect } from 'react'
import { RouteProps } from 'react-router'
import './style.scss'
import { GET_PRODUCTS } from './gql'
import {
  MainCategoryList,
  RecommendedContainer,
  CategoryPreviewSection,
  PreviewContainer,
  Footer,
} from '@/components/MainPage'
import { SlickCarousel, ProductSlide, Divider, Header, CartFloatButton } from '@/components/common'
import { makeIntersectionObserver, fetchQuery } from '@/utils/index'
import { useQuery } from 'react-apollo'

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
  const newestResponse = useGetProducts(sortByList.CREATED_AT)
  const hottestResponse = useGetProducts(sortByList.HIT)

  if (newestResponse.loading || hottestResponse.loading) return <p>로딩</p>
  if (newestResponse.error || hottestResponse.error) return <p>에러</p>

  const hotProducList = hottestResponse.data.getProducts
  const newProducList = newestResponse.data.getProducts

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
      <SlickCarousel />
      <MainCategoryList />
      <Divider />
      <ProductSlide productList={hotProducList} title="김영지님을 위해 준비한 상품" moreLink="" />
      <Divider />
      <PreviewContainer />
      <Divider />
      <RecommendedContainer title="지금 뭐 먹지?" categoryId={187} totalPageNum={3} />
      <Divider />

      <ProductSlide productList={newProducList} title="새로 나왔어요" moreLink="" />
      <Divider />
      <RecommendedContainer title="지금 필요한 생필품!" categoryId={187} totalPageNum={3} />
      <Divider />
      <CategoryPreviewSection />
      <CartFloatButton />
      <Footer />
    </div>
  )
}
