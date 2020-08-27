import React from 'react'
import './style.scss'

export const ProductCommon: React.FC = () => {
  return (
    <div className="common-info-wrap">
      <div className="info-wrap">
        <div className="title del-info">배달 정보</div>
        <div className="text-wrap">
          <div className="speed-delivery-text-wrap">
            <div className="speed-delivery-title">가장 필요할 때, 필요한 만큼만 ⚡ 번쩍 배달</div>
          </div>
          <div className="time-info-wrap">
            <div className="time-text">🕙 배달시간 16~20분 예상</div>
            <div className="Dividing-line">|</div>
            <div className="category-deadline-text">24시까지 주문 가능</div>
          </div>
        </div>
      </div>

      <div className="info-wrap">
        <div className="title">적립 혜택</div>
        <div className="text">배민페이로 결제하면 포인트 0.5% 적립</div>
      </div>

      <div className="info-wrap">
        <div className="title">원산지표시</div>
        <div className="text">하단상세 내용참고</div>
      </div>
    </div>
  )
}
