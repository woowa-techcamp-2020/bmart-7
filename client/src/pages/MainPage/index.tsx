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
import { SlickCarousel, ProductSlide, Divider, Header } from '@/components/common'
import { client } from '@/ApolloClient'
import { makeIntersectionObserver, fetchQuery } from '@/utils/index'
import { useQuery } from 'react-apollo'

const sortByList = {
  CREATED_AT: 'createdAt',
  HIT: 'hit',
}

export const MainPage: React.FC<RouteProps> = ({ history }) => {
  const [hotProductList, setHotProductList] = useState([])
  const [newProductList, setNewProductList] = useState([])
  const fetchProducts = async (sortBy) => {
    const { getProducts } = await fetchQuery({
      query: GET_PRODUCTS,
      variables: {
        input: {
          sortBy,
          isAscending: false,
          limit: 10,
        },
      },
    })
    sortBy === sortByList.CREATED_AT
      ? setNewProductList(getProducts)
      : setHotProductList(getProducts)
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
      <SlickCarousel />
      <MainCategoryList />
      <Divider />
      <ProductSlide
        productList={hotProductList}
        title="김영지님을 위해 준비한 상품"
        io={makeIntersectionObserver(() => fetchProducts(sortByList.HIT))}
        moreLink=""
      />
      <Divider />
      <PreviewContainer />
      <Divider />
      <RecommendedContainer title="지금 뭐 먹지?" categoryId={187} totalPageNum={3} />
      <Divider />
      <ProductSlide
        productList={newProductList}
        title="새로 나왔어요"
        io={makeIntersectionObserver(() => fetchProducts(sortByList.CREATED_AT))}
        moreLink=""
      />
      <Divider />
      <RecommendedContainer title="지금 필요한 생필품!" categoryId={187} totalPageNum={3} />
      <Divider />
      <CategoryPreviewSection />
      <Footer />
    </div>
  )
}
