import { useContext, useState, useEffect } from 'react'
import { StoreContext, SetStoreContext } from '@/store'
import { useMutation } from 'react-apollo'
import { INSERT_FAVORITES, DELETE_FAVORITES } from './gql'
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'
import React from 'react'

export const HeartIcon: React.FC<{ id: number }> = ({ id }) => {
  const store = useContext(StoreContext)
  const setStore = useContext(SetStoreContext)

  const [favoriteId, setFavoriteId] = useState(0)
  const [isPending, setIsPending] = useState(false)
  const [createFavorite] = useMutation(INSERT_FAVORITES)
  const [removeFavorite] = useMutation(DELETE_FAVORITES)

  useEffect(() => {
    const favoriteItem = store.favorites.find((favorite) => favorite.product.id === id)
    if (favoriteItem) {
      setFavoriteId(favoriteItem.id)
    }
  }, [])

  const insertFavorite = async () => {
    if (favoriteId !== 0) return

    setIsPending(true)
    const {
      data: { insertFavorite },
    } = await createFavorite({
      variables: {
        input: {
          productId: id,
          userId: 5,
        },
      },
    })

    const newStore = { ...store }
    newStore.favorites = [...newStore.favorites, insertFavorite]

    setStore(newStore)
    setFavoriteId(insertFavorite.id)
    setIsPending(false)
  }

  const deleteFavorite = async () => {
    if (!favoriteId) return

    setIsPending(true)
    const {
      data: { deleteFavorite },
    } = await removeFavorite({ variables: { favoriteId } })

    const newStore = { ...store }
    newStore.favorites = newStore.favorites.filter((favorite) => favorite.id !== deleteFavorite.id)

    setStore(newStore)
    setFavoriteId(0)
    setIsPending(false)
  }

  const toggleFavorite = () => {
    if (isPending) return
    favoriteId ? deleteFavorite() : insertFavorite()
  }

  return (
    <div className="heart icon-wrapper" onClick={toggleFavorite}>
      <IoMdHeartEmpty className={'icon' + (favoriteId ? ' dp-none' : '')} />
      <IoMdHeart className={'icon' + (favoriteId ? '' : ' dp-none')} />
    </div>
  )
}
