import React from 'react'
import { RouteProps } from 'react-router'
import { Header, Divider } from '@/components/common'

export const CartPage: React.FC<RouteProps> = ({ history }) => {
  return (
    <div id="cart-page">
      <Header title={<h1>장바구니</h1>} isShowSearch={false} isShowMenu={false} history={history} />
      <Divider />
    </div>
  )
}
