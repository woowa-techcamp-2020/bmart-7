import React, { useState } from 'react'
import { RouteProps } from 'react-router'
import { Redirect } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import { GET_MAIN_CATEGORY } from './gql'
import {
  ProductList,
  Divider,
  ProductSlide,
  Filter,
  SubHeader,
  Header,
  CartFloatButton,
} from '@/components/common'
import { CategoryList } from '@/components/MainCategoryPage/CategoryList'

export const MainCategoryPage: React.FC<RouteProps> = (props) => {
  const {
    match: {
      params: { id },
    },
    history,
  } = props

  const [filterCondition, setFilterCondition] = useState({
    sortBy: null,
    isAscending: false,
  })

  const { loading, error, data } = useQuery(GET_MAIN_CATEGORY, {
    variables: {
      categoryInput: {
        id: +id,
        categories: true,
      },
      productInput: {
        mainCategoryId: +id,
        ...filterCondition,
      },
      fetchPolicy: 'cache-and-network',
    },
  })

  if (loading) return <></>
  if (error) return <Redirect to="/" />

  const mainCategoryTitle = data.getMainCategory.title
  const categoryList = data.getMainCategory.categories.map((category) => ({
    id: category.id,
    title: category.title,
  }))
  const productList = data.getProducts
  const sortedProductList = productList
    .filter((product) => product.isMain)
    .sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    .slice(0, 10)

  return (
    <div id="main-category-page">
      <Header title={<h1>{mainCategoryTitle}</h1>} history={history}></Header>
      <CategoryList categoryList={categoryList}></CategoryList>
      <Divider />
      <ProductSlide productList={sortedProductList} title="이 상품 어때요?" />
      <Divider />
      <SubHeader title="" filter={<Filter setCondition={setFilterCondition} />} />
      <ProductList productList={productList} column={2} />
      <CartFloatButton />
    </div>
  )
}
