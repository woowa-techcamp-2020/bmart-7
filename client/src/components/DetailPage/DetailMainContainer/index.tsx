import React from 'react'
import './style.scss'
import { GET_PRODUCT } from './gql'
import { Divider } from '@/components/common'
// import { Product as ProductType } from '@/types'
import { useQuery } from 'react-apollo'
import { formatPrice } from '@/utils/formatPrice'
import { ProductCommon } from './ProductCommon'

const productInfo = {
  title: '[서울마님] 미니 인절미 3종',
  originPrice: 4000,
  salePercent: 10,
  salePrice: 750,
  description: '국산 찹쌀로 빚고 부담없이 담은',
  mainImage: 'https://image.auction.co.kr/itemimage/16/06/ea/1606eaf9e6.jpg',
  bannerImage: 'https://i.pinimg.com/736x/2b/76/f6/2b76f657a56cc383f2b6b0a191ce0046.jpg',
}
const mainImage =
  'https://m.josunyega.com/web/product/big/201910/99498085a0a47ba5062e46f9e2e540c5.jpg'

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
  console.log(data.getProduct)

  return (
    <>
      <div className="detail-main-container">
        <img className="logo" src={mainImage} />
        <div className="contents">
          <div className="product-info-wrap">
            <div className="left">
              <h1 className="title">{productInfo.title}</h1>
              <div className="price-wrap">
                <div className="sale-percent num">{formatPrice(productInfo.salePercent)}%</div>
                <div className="original-price num">{formatPrice(productInfo.originPrice)}원</div>
                <div className="sale-price">{productInfo.salePrice}원</div>
              </div>
            </div>

            <div className="right">
              <div className="favorite">하트</div>
            </div>
          </div>
          <ProductCommon />
        </div>
        <Divider />
      </div>

      <div className="detail-sub-container">
        <h1 className="desc-text">{productInfo.description}</h1>
        <img className="product-image" src={productInfo.bannerImage} />
        <img className="product-image" src={productInfo.mainImage} />
        <p className="words">
          문화가 발달한 유럽에선 초콜릿만을 전문으로 파는 쇼콜라트리를 쉽게 찾아볼 수 있습니다.
          스위스도 예외는 아니지요. 스위스의 주요 도심엔 전 세계적으로 사랑받는 쇼콜라트리,
          레더라(Läderach) 매장이 곳곳에 포진해 있는데요. 고급스러운 봉봉 오 쇼콜라, 사르르 녹는
          파베 초콜릿 등 레더라의 다양한 제품을 컬리를 통해 맛보셨을 거예요. 레더라가 이번에는
          투박하면서도 정교함이 느껴지는 신상 초콜릿으로 찾아왔습니다. 레더라 로고가 찍힌 자그마한
          상자에 7가지맛 판 초콜릿이 작은 크기로 툭툭 잘려 포장돼 있지요. 볶은 아몬드, 헤이즐넛,
          피스타치오 등이 콕콕 박힌 견과류 초콜릿부터 라즈베리와 블랙베리로 맛을 낸 핑크빛
          화이트초콜릿까지, 각양각색 레더라 초콜릿으로 오감을 깨워 보세요.
        </p>
      </div>
    </>
  )
}
