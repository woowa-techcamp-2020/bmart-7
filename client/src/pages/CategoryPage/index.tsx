import React, { useState } from 'react'
import { RouteProps } from 'react-router'
import { GET_PRODUCTS } from './gql'
import { useQuery } from 'react-apollo'
import {
  ProductList,
  Filter,
  SubHeader,
  Header,
  Divider,
  CartFloatButton,
} from '@/components/common'
import { Redirect } from 'react-router-dom'

export const CategoryPage: React.FC<RouteProps> = (props) => {
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

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      input: {
        categoryId: +id,
        ...filterCondition,
      },
      id: +id,
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <></>
  if (error) return <Redirect to="/" />

  const categoryTitle = data.getCategory.title
  const productList = data.getProducts

  return (
    <div id="category-page">
      <Header title={<h1>{categoryTitle}</h1>} history={history} />
      <Divider />
      <SubHeader title="" filter={<Filter setCondition={setFilterCondition} />} />
      <ProductList productList={productList} column={2} />
      <CartFloatButton />
    </div>
  )
}
