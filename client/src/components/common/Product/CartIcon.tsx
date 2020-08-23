import React, { useContext } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { GrCart } from 'react-icons/gr'
import { StoreContext, SetStoreContext } from '@/store'

export const CartIcon: React.FC<{ id: number }> = ({ id }) => {
  const store = useContext(StoreContext)
  const setStore = useContext(SetStoreContext)
  //id가 카트 안에 있는지 검사 (전역 스토어에서 찾기)
  const isInCart = false

  return (
    <div className={'cart icon-wrapper ' + (isInCart ? 'active' : '')}>
      {isInCart ? <FaShoppingCart className="icon" /> : <GrCart className="icon" />}
    </div>
  )
}
