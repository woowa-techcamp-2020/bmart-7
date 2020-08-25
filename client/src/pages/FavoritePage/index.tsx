import React, { useContext, useEffect, useState } from 'react'
import { RouteProps } from 'react-router'
import { ProductList, SubHeader, Header, Divider, CartFloatButton } from '@/components/common'
import { StoreContext } from '@/store'

const COLUMN_NUM = 2

export const FavoritePage: React.FC<RouteProps> = (props) => {
  const { history } = props

  const store = useContext(StoreContext)
  const [productList, setProductList] = useState([])

  useEffect(() => {
    setProductList(store.favorites.map((favorite) => favorite.product))
  }, [])

  const subHeaderTitle = `찜한상품 ${store.favorites.length}개`

  return (
    <div id="favorite-page">
      <Header title={<h1>찜한상품</h1>} isShowSearch={false} isShowMenu={false} history={history} />
      <Divider />
      <SubHeader title={subHeaderTitle} filter={null} />
      <ProductList productList={productList} column={COLUMN_NUM} />
      <CartFloatButton />
    </div>
  )
}
