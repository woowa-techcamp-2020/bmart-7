import React, { useContext, useState, useEffect } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { GrCart } from 'react-icons/gr'
import { StoreContext, SetStoreContext } from '@/store'
import { useMutation } from 'react-apollo'
import { INSERT_CART_ITEM, PUT_CART_ITEM_COUNT } from './gql'

export const CartIcon: React.FC<{ id: number }> = ({ id }) => {
  const store = useContext(StoreContext)
  const setStore = useContext(SetStoreContext)

  const [cartItem, setCartItem] = useState(undefined)
  const [createCartItem] = useMutation(INSERT_CART_ITEM)
  const [increaseCartItemCount] = useMutation(PUT_CART_ITEM_COUNT)

  useEffect(() => {
    const matchedCartItem = store.cartItems.find((cartItem) => cartItem.product.id === id)
    if (matchedCartItem) {
      setCartItem(matchedCartItem)
    }
  }, [id])

  const insertCartItem = async () => {
    const {
      data: { insertCartItem },
    } = await createCartItem({
      variables: {
        input: {
          productId: id,
          userId: 5,
        },
      },
    })
    const newStore = { ...store }
    newStore.cartItems = [...newStore.cartItems, insertCartItem]
    setStore(newStore)
    setCartItem(insertCartItem)
  }

  const addCartItemCount = async () => {
    const {
      data: { putCartItemCount },
    } = await increaseCartItemCount({
      variables: {
        input: {
          id: cartItem.id,
          count: cartItem.count + 1,
        },
      },
    })

    const newStore = { ...store }
    const addedCartItem = newStore.cartItems.find((item) => item.id === cartItem.id)
    addedCartItem.count = putCartItemCount.count
    newStore.cartItems = [...newStore.cartItems]
    setStore(newStore)
    setCartItem(addedCartItem)
  }

  return (
    <div className="cart icon-wrapper">
      {cartItem ? (
        <>
          <FaShoppingCart className="icon" />
          <div className="count" onClick={addCartItemCount}>
            {cartItem.count}
          </div>
        </>
      ) : (
        <GrCart className="icon" onClick={insertCartItem} />
      )}
    </div>
  )
}
