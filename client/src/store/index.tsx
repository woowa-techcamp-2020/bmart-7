import React, { useContext } from 'react'
import { createContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Favorite, CartItem } from '@/types'
import { GET_INIT_DATA, GET_USER } from './gql'
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
  const history = useHistory()

  useEffect(() => {
    const init = async () => {
      try {
        const { initAuthUser } = await fetchQuery({
          query: GET_USER,
        })

        if (!initAuthUser.id) {
          history.push('/login')
          return
        }
        localStorage.setItem('userId', initAuthUser.id)

        const data = await fetchQuery({
          query: GET_INIT_DATA,
          variables: {
            userId: initAuthUser.id,
          },
        })
        setStore({
          isLoading: false,
          favorites: data.getUserFavorites,
          cartItems: data.getUserCartItems,
        })

        if (history.location.pathname === '/login') {
          history.push('/')
        }
      } catch (e) {
        history.push('/login')
      }
    }
    init()
  }, [])

  return <></>
}
