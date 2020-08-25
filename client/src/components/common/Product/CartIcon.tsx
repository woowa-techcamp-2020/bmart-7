import React, { useContext, useState, useEffect } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { GrCart } from 'react-icons/gr'
import { StoreContext, SetStoreContext } from '@/store'

export const CartIcon: React.FC<{ id: number }> = ({ id }) => {
  const store = useContext(StoreContext)
  const setStore = useContext(SetStoreContext)

  const [cartItemId, setCartItemId] = useState(0)
  const isInCart = false

  useEffect(() => {
    const cartItem = store.cartItems.find((cartItem) => cartItem.product.id === id)
    if (cartItem) {
      setCartItemId(cartItem.id)
    }
  }, [id])

  return (
    <div className={'cart icon-wrapper ' + (isInCart ? 'active' : '')}>
      {cartItemId ? <FaShoppingCart className="icon" /> : <GrCart className="icon" />}
    </div>
  )
}
