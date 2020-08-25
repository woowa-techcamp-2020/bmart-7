import React, { useContext } from 'react'
import { createContext, useEffect } from 'react'
import { Favorite, CartItem } from '@/types'
import { useQuery } from 'react-apollo'
import { GET_FAVORITES } from './gql'

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

  const { loading, error, data } = useQuery(GET_FAVORITES, {
    variables: {
      userId: 5,
    },
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (data) {
      setStore({
        isLoading: false,
        favorites: data.getUserFavorites,
        cartItems: data.getUserCartItems,
      })
    }
  }, [loading, error, data])

  return <></>
}
