import React, { useContext } from 'react'
import { createContext, useEffect } from 'react'
import { Favorite, CartItem } from '@/types'
import { GET_INIT_DATA } from './gql'
import { fetchQuery } from '@/utils'

export const StoreContext = createContext<StoreType>(undefined)
export const SetStoreContext = createContext<React.Dispatch<React.SetStateAction<StoreType>>>(
  undefined
)

export type StoreType = {
  isLoading: boolean
  favorites: Favorite[]
  cartItems: CartItem[]
}

export const defaultStore = {
  isLoading: true,
  favorites: [],
  cartItems: [],
}

export const InitStore: React.FC = () => {
  const setStore = useContext(SetStoreContext)

  useEffect(() => {
    fetchQuery({
      query: GET_INIT_DATA,
      variables: {
        userId: 5,
      },
    }).then((data) => {
      setStore({
        isLoading: false,
        favorites: data.getUserFavorites,
        cartItems: data.getUserCartItems,
      })
    })
  }, [])

  return <></>
}
