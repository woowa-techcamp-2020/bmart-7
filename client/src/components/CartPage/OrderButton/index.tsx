import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './style.scss'
import { formatPrice } from '@/utils'
import { CartItemsContext, SetCartItemsContext } from '@/pages/CartPage'
import { useMutation } from 'react-apollo'
import { INSERT_ORDER } from './gql'

type OrderButtonType = {
  totalPrice: number
}

export const OrderButton: React.FC<OrderButtonType> = ({ totalPrice }) => {
  const history = useHistory()
  const cartItems = useContext(CartItemsContext)
  const setCartItems = useContext(SetCartItemsContext)
  const [createOrder] = useMutation(INSERT_ORDER)
  const count = cartItems.filter((item) => item.isSelected).length

  const orderItems = async () => {
    const userId = +localStorage.getItem('userId')
    const selectedCartItems = cartItems.reduce((idList, item) => {
      if (item.isSelected) idList.push(item.id)
      return idList
    }, [])
    await createOrder({
      variables: {
        input: {
          userId,
          cartItemIds: selectedCartItems,
        },
      },
    })

    alert('주문이 완료되었습니다.')
    history.push('/order')
  }

  return (
    <>
      <div className="order-button-wrapper">
        <div className="order-button" onClick={() => orderItems()}>
          <div className="count">{count}</div>
          <div className="text">{formatPrice(totalPrice)}원 배달 주문하기</div>
        </div>
      </div>
      <div className="order-button-buffer"></div>
    </>
  )
}
