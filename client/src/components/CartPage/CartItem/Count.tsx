import React, { useState, useContext } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { useMutation } from 'react-apollo'
import { CartItem as CartItemType } from '@/types'
import './style.scss'
import { PUT_CART_ITME_COUNT } from './gql'
import { StoreContext, SetStoreContext } from '@/store'

export const Count: React.FC<CartItemType> = ({ id, count }) => {
  const store = useContext(StoreContext)
  const setStore = useContext(SetStoreContext)

  const [itemCount, setItemCount] = useState(count)
  const [changeCartItemCount] = useMutation(PUT_CART_ITME_COUNT)

  const changeCount = async (newCount: number) => {
    if (newCount < 1) return

    const {
      data: { putCartItemCount },
    } = await changeCartItemCount({
      variables: {
        input: {
          id: id,
          count: newCount,
        },
      },
    })

    const newStore = { ...store }
    const currentCartItem = newStore.cartItems.find((cartItem) => cartItem.id === id)
    currentCartItem.count = putCartItemCount.count
    newStore.cartItems = [...newStore.cartItems]

    setStore(newStore)
    setItemCount(putCartItemCount.count)
  }

  return (
    <div className="count-wrapper">
      <FiMinus
        className={`minus-btn count-btn ${count > 1 ? 'active' : null}`}
        onClick={() => changeCount(itemCount - 1)}
      />
      <div className="count">{itemCount}</div>
      <FiPlus className="plus-btn count-btn active" onClick={() => changeCount(itemCount + 1)} />
    </div>
  )
}
