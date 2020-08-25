import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import { GET_PRODUCTS } from './gql'
import { useQuery } from 'react-apollo'
import { Product as ProductType } from '@/types'
import { Product } from '@/components/common/Product'
import { IoIosArrowForward } from 'react-icons/io'
const imgCount = 4

export const PreviewContainer: React.FC = () => {
  const [previewIdx, setPreviewIdx] = useState(0)
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      input: {
        sortBy: 'salePercent',
        isAscending: false,
        limit: imgCount,
      },
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const productList = data.getProducts
  const S3_URL = process.env.REACT_APP_S3_URL
  const clickPreviewProduct = (idx: number) => {
    setPreviewIdx(idx)
  }

  return (
    <div className="preview-container">
      <div className="preview-header-section">
        <div className="preview-header-left">
          <div className="now-buy">
            지금 사면{' '}
            <span role="img" aria-label="thunder">
              ⚡
            </span>
          </div>
          <div className="surprise-sale">번쩍 할인</div>
        </div>
        <div className="preview-header-right">
          <div className="more-link">
            더보기 <IoIosArrowForward className="arrow" />
          </div>
        </div>
      </div>

      <div className="preview-body-section">
        <ul className="preview-list-wrap">
          {productList.map((product: ProductType, idx: number) => {
            const isActive = idx === previewIdx ? 'active' : ''
            return (
              <li
                className={'product-small-item ' + isActive}
                onClick={() => clickPreviewProduct(idx)}
                key={idx}
              >
                <img
                  loading="lazy"
                  data-id={idx}
                  src={`${S3_URL}${product.mainImage}`}
                  alt="preview"
                />
              </li>
            )
          })}
        </ul>

        <Link to="/detail">
          <div className="product-big-item">
            <Product product={productList[previewIdx]} eagerLoading={false} isBannerImg={true} />
          </div>
        </Link>
      </div>
    </div>
  )
}
