import React from 'react'
import './style.scss'
import { RouteProps } from 'react-router'
import { Divider } from '@/components/common/Divider'
import { Footer } from '@/components/MainPage/Footer'
import { Header } from '@/components/common'
import { OrderRecordContainer } from '@/components/OrderPage/OrderRecordContainer'

export const OrderPage: React.FC<RouteProps> = ({ history }) => {
  return (
    <div id="order-page">
      <Header
        title={<h1>주문 내역</h1>}
        isShowSearch={false}
        isShowMenu={false}
        history={history}
      />
      <Divider />
      <OrderRecordContainer />
    </div>
  )
}
