import React, { useContext, useEffect, useState } from 'react'
import { ProductList } from '@/components/common/ProductList'
import { StoreContext } from '@/store'
import { SubHeader } from '@/components/common/SubHeader'

const COLUMN_NUM = 2

export const FavoritePage = () => {
  const store = useContext(StoreContext)
  const [productList, setProductList] = useState([])

  useEffect(() => {
    setProductList(store.favorites.map((favorite) => favorite.product))
  }, [])

  const subHeaderTitle = `찜한상품 ${store.favorites.length}개`

  return (
    <div id="favorite-page">
      <SubHeader title={subHeaderTitle} filter={null} />
      <ProductList productList={productList} column={COLUMN_NUM} />
    </div>
  )
}
