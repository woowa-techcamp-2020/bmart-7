import React, { useContext } from 'react'
import { DELETE_CART_ITEM } from './gql'
import { StoreContext, SetStoreContext } from '@/store'
import { useMutation } from 'react-apollo'

export const RemoveButton: React.FC<{ id: number }> = ({ id }) => {
  const store = useContext(StoreContext)
  const setStore = useContext(SetStoreContext)

  const [deleteCartItem] = useMutation(DELETE_CART_ITEM)

  const removeCartItem = async () => {
    await deleteCartItem({
      variables: {
        idList: [id],
      },
    })

    const newStore = { ...store }
    newStore.cartItems = newStore.cartItems.filter((cartItem) => cartItem.id !== id)
    setStore(newStore)
  }

  return (
    <div className="remove-btn" onClick={() => removeCartItem()}>
      삭제
    </div>
  )
}
