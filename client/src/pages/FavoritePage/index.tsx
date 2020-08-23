import React, { useContext, useEffect, useState } from 'react'
import { ProductList } from '@/components/common/ProductList'
import './style.scss'
import { StoreContext } from '@/store'
import { FavoriteHeader } from '@/components/FavoritePage/FavoriteHeader'

const COLUMN_NUM = 2

export const FavoritePage = () => {
  const store = useContext(StoreContext)
  const [productList, setProductList] = useState([])

  useEffect(() => {
    setProductList(store.favorites.map((favorite) => favorite.product))
  }, [])

  return (
    <div id="favorite-page">
      <FavoriteHeader count={store.favorites.length} />
      <ProductList productList={productList} column={COLUMN_NUM} />
    </div>
  )
}
