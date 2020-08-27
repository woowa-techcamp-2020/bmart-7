import React, { useState } from 'react'
import { GET_PRODUCTS } from './gql'
import { useQuery } from 'react-apollo'
import { RouteProps } from 'react-router'
import { Redirect } from 'react-router-dom'
import { ProductList, Filter, SubHeader, CartFloatButton } from '@/components/common'
import { SearchHeader } from '@/components/common'
export const SearchResultPage: React.FC<RouteProps> = (props) => {
  const {
    match: {
      params: { q },
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
        searchQuery: q,
        ...filterCondition,
      },
    },
  })

  if (loading) return <></>
  if (error) return <Redirect to="/" />

  const productList = data.getProducts
  const subHeaderTitle = `검색결과 ${productList.length}개`

  const deleteHandler = () => {
    history.go(-2)
  }

  return (
    <>
      <SearchHeader
        keyword={q}
        result={true}
        clickBackHandler={history.goBack}
        deleteHandler={deleteHandler}
        focusHandler={history.goBack}
      />
      <div id="search-result-page">
        <SubHeader title={subHeaderTitle} filter={<Filter setCondition={setFilterCondition} />} />
        <ProductList productList={productList} column={2} />
        <CartFloatButton />
      </div>
    </>
  )
}
