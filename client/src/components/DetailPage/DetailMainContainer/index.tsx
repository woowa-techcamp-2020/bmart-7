import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { StoreContext, SetStoreContext } from '@/store'

import './style.scss'
import { GET_PRODUCT } from './gql'
import { Divider } from '@/components/common'
import { useQuery, useMutation } from 'react-apollo'
import { formatPrice } from '@/utils/formatPrice'
import { ProductCommon } from './ProductCommon'
import { HeartIcon } from '@/components/common/Product/HeartIcon'
import { INSERT_CART_ITEM } from '@/components/common/Product/gql'

interface ProductId {
  productId: number
}

export const DetailMainContainer: React.FC<ProductId> = (props) => {
  const { productId } = props

  const history = useHistory()
  const store = useContext(StoreContext)
  const setStore = useContext(SetStoreContext)
  const [createCartItem] = useMutation(INSERT_CART_ITEM)

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      id: productId,
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  const productInfo = data.getProduct
  const S3_URL = process.env.REACT_APP_S3_URL + 'product/'

  const insertCartItem = async () => {
    const itemInCart = store.cartItems.find((item) => item.product.id === productId)
    if (itemInCart) {
      const isGoCart = window.confirm(
        '이미 장바구니에 담긴 상품입니다.\n장바구니로 이동하시겠습니까?'
      )
      if (isGoCart) history.push('/cart')

      return
    }

    const {
      data: { insertCartItem },
    } = await createCartItem({
      variables: {
        input: {
          userId: 5,
          productId,
        },
      },
    })
    const newStore = { ...store }
    newStore.cartItems = [...newStore.cartItems, insertCartItem]
    setStore(newStore)
    alert('장바구니에 물건이 담겼습니다.')
    history.push('/cart')
  }

  return (
    <>
      <div className="detail-main-container">
        <img className="logo" src={`${S3_URL}${productInfo.mainImage}`} />
        <div className="contents">
          <div className="product-info-wrap">
            <div className="left">
              <h1 className="main-title">{productInfo.title}</h1>
              <div className="price-wrap">
                {productInfo.salePercent ? (
                  <>
                    <div className="sale-percent num">{productInfo.salePercent}%</div>
                    <div className="original-price num">
                      {formatPrice(productInfo.originPrice)}원
                    </div>
                  </>
                ) : null}
                <div className="sale-price">{formatPrice(productInfo.salePrice)}원</div>
              </div>
              <div className="favorite">
                <HeartIcon id={productId} />
              </div>
            </div>
          </div>
          <ProductCommon />
        </div>
        <Divider />
      </div>

      <div className="detail-sub-container">
        <h1 className="desc-text sub-content">{productInfo.description}</h1>
        <img className="product-image sub-content" src={`${S3_URL}${productInfo.bannerImage}`} />
        <h2 className="desc-sub-text sub-content">{productInfo.title}</h2>
        <div className="words-wrap">
          <article className="words">
            <p>지금 주문하면 동네에 배치된 비마트 거점으로부터</p>
            <p>30분 이내에 신속하게 배달됩니다.</p>
          </article>
          <article className="words ">
            <p>이벤트 기간동안 전 상품 무료로 배달해드립니다.</p>
            <p>지금 바로 만나보세요!</p>
          </article>
        </div>
        <img className="product-image sub-content" src={`${S3_URL}${productInfo.mainImage}`} />
      </div>

      <div className="order-buffer">
        <div className="order-btn">
          <div className="order-text" onClick={() => insertCartItem()}>
            구매하기
          </div>
        </div>
      </div>
    </>
  )
}
