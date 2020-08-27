import React from 'react'
import './style.scss'
import { useQuery } from 'react-apollo'
import { GET_PRODUCTS } from './gql'
import { ProductSlide } from '@/components/common'
interface IProps {
  sortBy: string
}

export const ProductSlideFetch: React.FC<IProps> = ({ sortBy }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      input: {
        sortBy,
        isAscending: false,
        limit: 10,
      },
    },
  })

  if (loading) return <p>로딩</p>
  if (error) return <p>에러</p>
  const productList = data.getProducts

  return <ProductSlide productList={productList} title="김영지님을 위해 준비한 상품" moreLink="" />
}
