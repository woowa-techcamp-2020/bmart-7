import React from 'react'
import { RouteProps } from 'react-router'
import { FiArrowLeft } from 'react-icons/fi'
import './style.scss'
import { DetailMainContainer } from '@/components/DetailPage/DetailMainContainer'

export const DetailPage: React.FC<RouteProps> = (props) => {
  const {
    match: {
      params: { id },
    },
    history,
  } = props

  const addCartAndMovePage = () => {
    // cart에 담는 로직 추가
    window.location.assign('/favorite')
  }

  return (
    <div id="detail-page">
      <div className="back-btn">
        <FiArrowLeft className="icon" onClick={history.goBack} />
      </div>
      <DetailMainContainer productId={parseInt(id)} />
      <div className="buffer">
        <div className="order-btn">
          <div className="order-text" onClick={addCartAndMovePage}>
            구매하기
          </div>
        </div>
      </div>
    </div>
  )
}
