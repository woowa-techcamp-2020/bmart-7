import React from 'react'
import { RouteProps } from 'react-router'
import { SlickCarousel } from '@/components/common/Carousel'
import { MainCategoryList } from '@/components/MainPage/MainCategoryList'
import { RecommendedContainer } from '@/components/MainPage/RecommendedContainer'
import { CategoryPreviewSection } from '@/components/MainPage/CategoryPreviewSection'
import './style.scss'
import { GET_PRODUCTS } from './gql'
import { useQuery } from 'react-apollo'
import { ProductSlide } from '@/components/common/ProductSlide'
import { Divider } from '@/components/common/Divider'
import { PreviewContainer } from '@/components/MainPage/PreviewContainer'
import { Header } from '@/components/common/Header'
import { Footer } from '@/components/MainPage/Footer'

export const MainPage: React.FC<RouteProps> = ({ history }) => {
  const newestResponse = useQuery(GET_PRODUCTS, {
    variables: {
      input: {
        sortBy: 'createdAt',
        isAscending: false,
        limit: 10,
      },
    },
    fetchPolicy: 'cache-and-network',
  })

  const hottestResponse = useQuery(GET_PRODUCTS, {
    variables: {
      input: {
        sortBy: 'hit',
        isAscending: false,
        limit: 10,
      },
    },
    fetchPolicy: 'cache-and-network',
  })

  if (newestResponse.loading || hottestResponse.loading) return <p>Loading...</p>
  if (newestResponse.error || hottestResponse.error) return <p>Error...</p>

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
        productList={hottestResponse.data.getProducts}
        title="김영지님을 위해 준비한 상품"
        moreLink=""
      />
      <Divider />
      <PreviewContainer />
      <Divider />
      <RecommendedContainer title="지금 뭐 먹지?" categoryId={187} totalPageNum={3} />
      <Divider />
      <ProductSlide
        productList={newestResponse.data.getProducts}
        title="새로 나왔어요"
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
