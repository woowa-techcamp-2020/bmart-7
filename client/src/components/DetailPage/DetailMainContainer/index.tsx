import React from 'react'
import './style.scss'
import { GET_PRODUCT } from './gql'
import { Divider } from '@/components/common'
import { useQuery } from 'react-apollo'
import { formatPrice } from '@/utils/formatPrice'
import { ProductCommon } from './ProductCommon'
import { HeartIcon } from '@/components/common/Product/HeartIcon'

interface ProductId {
  productId: number
}

export const DetailMainContainer: React.FC<ProductId> = (props) => {
  const { productId } = props
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      id: productId,
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const productInfo = data.getProduct
  const S3_URL = process.env.REACT_APP_S3_URL

  console.log(data.getProduct)

  return (
    <>
      <div className="detail-main-container">
        <img className="logo" src={`${S3_URL}${productInfo.mainImage}`} />
        <div className="contents">
          <div className="product-info-wrap">
            <div className="left">
              <h1 className="main-title">{productInfo.title}</h1>
              <div className="price-wrap">
                <div className="sale-percent num">{productInfo.salePercent}%</div>
                <div className="original-price num">{formatPrice(productInfo.originPrice)}원</div>
                <div className="sale-price">{formatPrice(productInfo.salePrice)}원</div>
              </div>
            </div>

            <div className="right">
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
          <h3 className="words ">'바로먹는 간편함'을 주기적으로 만나 보세요.</h3>
          <h3 className="words ">
            맛있는 음식을 국내로 수입하는 브랜드, 엄격하게 품질을 관리하여 담아낸 제품입니다.
          </h3>
        </div>
        <img className="product-image sub-content" src={`${S3_URL}${productInfo.mainImage}`} />
      </div>
    </>
  )
}
