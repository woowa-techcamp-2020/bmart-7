import React, { useContext, useState, useEffect } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { GrCart } from 'react-icons/gr'
import { StoreContext, SetStoreContext } from '@/store'

export const CartIcon: React.FC<{ id: number }> = ({ id }) => {
  const store = useContext(StoreContext)
  const setStore = useContext(SetStoreContext)

  const [cartItem, setCartItem] = useState(undefined)

  useEffect(() => {
    const cartItem = store.cartItems.find((cartItem) => cartItem.product.id === id)
    if (cartItem) {
      setCartItem(cartItem)
    }
  }, [id])

  return (
    <div className="cart icon-wrapper">
      {cartItem ? (
        <>
          <FaShoppingCart className="icon" />
          <div className="count">{cartItem.count}</div>
        </>
      ) : (
        <GrCart className="icon" />
      )}
    </div>
  )
}
