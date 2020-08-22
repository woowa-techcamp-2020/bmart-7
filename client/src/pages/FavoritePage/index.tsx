import React, { useEffect, useState, useContext } from 'react'
import { client } from '@/ApolloClient'
import { ProductList } from '@/components/common/ProductList'
import './style.scss'
import { GET_FAVORITES } from './gql'
import { StoreContext, SetStoreContext } from '@/store'
import { useQuery } from 'react-apollo'

const COLUMN_NUM = 2

export const FavoritePage = () => {
  const store = useContext(StoreContext)
  const setStore = useContext(SetStoreContext)
  const productList = store.favorites.map((favorite) => favorite.product)

  const { loading, error, data } = useQuery(GET_FAVORITES, {
    variables: {
      userId: 5,
    },
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (data) {
      const newStore = { ...store }
      newStore.favorites = data.getUserFavorites

      setStore(newStore)
    }
  }, [loading, error, data])

  return (
    <div id="favorite-page">
      <ProductList productList={productList} column={COLUMN_NUM} />
    </div>
  )
}
