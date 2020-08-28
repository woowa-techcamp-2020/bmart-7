import React from 'react'
import './style.scss'
import { Divider, EmptyPage } from '@/components/common'
import { GET_USER_ORDERS } from './gql'
import { useQuery } from 'react-apollo'
import { formatPrice } from '@/utils'

export const OrderRecordContainer: React.FC = () => {
  const date = new Date()
  const today = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`

  const { loading, error, data } = useQuery(GET_USER_ORDERS, {
    variables: {
      id: +localStorage.getItem('userId'),
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <></>
  if (error) return <></>

  const orders = data.getUserOrders

  return (
    <div className="order-container">
      {orders.length > 0 ? (
        orders.map((order) => (
          <React.Fragment key={order.id}>
            <div className="order-record-container">
              <div className="date-wrap">
                <img src="./images/orderIcon.png" alt="order-icon" className="order-icon" />
                <div className="price">
                  {formatPrice(
                    order.orderItems.reduce(
                      (sum, item) => sum + item.product.salePrice * item.count,
                      0
                    )
                  )}
                  원
                </div>
              </div>

              {order.orderItems.map((item) => (
                <div className="text-wrap" key={item.id}>
                  <div className="sub-text">{item.product.title}</div>
                  <div className="price-text">
                    {formatPrice(item.product.salePrice)}원 | {item.count}개
                  </div>
                </div>
              ))}
            </div>
            <Divider />
          </React.Fragment>
        ))
      ) : (
        <EmptyPage title="주문내역이 없습니다." buttonText="주문하러 가기" />
      )}
    </div>
  )
}
