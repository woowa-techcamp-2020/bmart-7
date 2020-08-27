import React, { useContext } from 'react'
import './style.scss'
import { CartItemsContext, SetCartItemsContext } from '@/pages/CartPage'
import { IoIosCheckbox } from 'react-icons/io'
import { useMutation } from 'react-apollo'
import { DELETE_CART_ITEM } from '../CartItem/gql'
import { StoreContext, SetStoreContext } from '@/store'

export const CartSelectBar: React.FC = () => {
  const store = useContext(StoreContext)
  const setStore = useContext(SetStoreContext)
  const cartItems = useContext(CartItemsContext)
  const setCartItems = useContext(SetCartItemsContext)
  const [deleteCartItem] = useMutation(DELETE_CART_ITEM)

  const isAllChecked = cartItems.reduce(
    (isAllChecked, item) => isAllChecked && item.isSelected,
    true
  )

  const changeAllSelected = () => {
    const toSelected = !isAllChecked
    const newCartItems = cartItems.map((item) => {
      item.isSelected = toSelected
      return item
    })
    setCartItems(newCartItems)
  }

  const removeCartItems = async () => {
    const isConfirm = window.confirm('정말 삭제하시겠습니까?')

    if (!isConfirm) return

    const selectedList = cartItems.reduce((selectedList, item) => {
      if (item.isSelected) selectedList.push(item.id)
      return selectedList
    }, [])

    await deleteCartItem({
      variables: {
        idList: selectedList,
      },
    })

    const newStore = { ...store }
    newStore.cartItems = newStore.cartItems.filter(
      (cartItem) => !selectedList.includes(cartItem.id)
    )
    setStore(newStore)
    setCartItems(newStore.cartItems)
  }

  return (
    <div className="cart-select-bar">
      <div className="checkbox-wrapper">
        <IoIosCheckbox
          className={'checkbox-icon' + (isAllChecked ? ' checked' : '')}
          onClick={() => changeAllSelected()}
        />
        <div>선택 해제</div>
      </div>
      <div onClick={() => removeCartItems()}>선택 항목 삭제</div>
    </div>
  )
}
