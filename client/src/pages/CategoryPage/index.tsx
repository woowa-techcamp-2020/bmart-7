import React, { useState } from 'react'
import { RouteProps } from 'react-router'
import './style.scss'
import { GET_PRODUCTS } from './gql'
import { useQuery } from 'react-apollo'
import { ProductList } from '@/components/common/ProductList'
import { Redirect } from 'react-router-dom'
import { Filter } from '@/components/common/Filter'

export const CategoryPage: React.FC<RouteProps> = (props) => {
  const {
    match: {
      params: { id },
    },
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
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <></>
  if (error) return <></>

  if (data.getProducts.length === 0) {
    return <Redirect to="/" />
  }

  return (
    <div id="category-page">
      <Filter setCondition={setFilterCondition} />
      <ProductList productList={data.getProducts} column={2} />
    </div>
  )
}
