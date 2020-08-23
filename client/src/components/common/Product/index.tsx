import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import { Product as ProductType } from '@/types'
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'
import { FaShoppingCart } from 'react-icons/fa'
import { GrCart } from 'react-icons/gr'
import { formatPrice } from '@/utils'
import { client } from '@/ApolloClient'
import { INSERT_FAVORITES, DELETE_FAVORITES } from './gql'
import { StoreContext, SetStoreContext } from '@/store'

const imageBaseUrl = process.env.REACT_APP_S3_URL

type PriceProps = {
  originPrice: number
  salePrice: number
  salePercent: number
}

const Price: React.FC<PriceProps> = (props) => {
  const { originPrice, salePrice, salePercent } = props

  return (
    <div className="price">
      {salePercent !== 0 ? (
        <>
          <div className="origin-price-wrapper">
            <div className="sale-percent">{formatPrice(salePercent)}%</div>
            <div className="origin-price">{formatPrice(originPrice)}원</div>
          </div>
          <div className="display-price">{formatPrice(salePrice)}원</div>
        </>
      ) : (
        <div className="display-price">{formatPrice(originPrice)}원</div>
      )}
    </div>
  )
}

const HeartIcon: React.FC<{ id: number }> = ({ id }) => {
  const store = useContext(StoreContext)
  const setStore = useContext(SetStoreContext)
  const [favoriteId, setFavoriteId] = useState(0)

  useEffect(() => {
    const favoriteItem = store.favorites.find((favorite) => favorite.product.id === id)
    if (favoriteItem) setFavoriteId(favoriteItem.id)
  }, [])

  const insertFavorite = async () => {
    const {
      data: { insertFavorite },
    } = await client.mutate({ mutation: INSERT_FAVORITES(5, id) })

    const newStore = { ...store }
    newStore.favorites = [...newStore.favorites, insertFavorite]

    setStore(newStore)
    setFavoriteId(insertFavorite.id)
  }

  const deleteFavorite = async () => {
    await client.mutate({ mutation: DELETE_FAVORITES(favoriteId) })

    const newStore = { ...store }
    newStore.favorites = newStore.favorites.filter((favorite) => favorite.id !== favoriteId)

    setStore(newStore)
  }

  const toggleFavorite = () => {
    favoriteId ? deleteFavorite() : insertFavorite()
  }

  return (
    <div className="heart icon-wrapper" onClick={toggleFavorite}>
      <IoMdHeartEmpty className={'icon ' + (favoriteId ? 'dp-none' : '')} />
      <IoMdHeart className={'icon ' + (!favoriteId ? 'dp-none' : '')} />
    </div>
  )
}

const CartIcon: React.FC<{ id: number }> = ({ id }) => {
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

export type ProductProps = {
  product: ProductType
}

export const Product: React.FC<ProductProps> = (props) => {
  const {
    product: { id, title, originPrice, salePrice, salePercent, amount, mainImage },
  } = props
  const priceProps = { originPrice, salePrice, salePercent }

  return (
    <li className="product">
      <div className="image-wrapper">
        <img src={imageBaseUrl + mainImage} alt="no image" />
        <div className="icon-container">
          <CartIcon id={id} />
          <HeartIcon id={id} />
        </div>
      </div>
      <div className="product-wrapper">
        <div className="info-wrapper">
          <h3 className="title">{title}</h3>
          <Price {...priceProps} />
        </div>
      </div>
    </li>
  )
}
