import React from 'react'
import './style.scss'
import { Divider } from '@/components/common'

export const OrderRecordContainer: React.FC = () => {
  const date = new Date()
  const today = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`

  return (
    <>
      <div className="order-record-container">
        <div className="date-wrap">
          <img src="./images/orderIcon.png" alt="order-icon" className="order-icon" />
          <div className="today">{today}</div>
        </div>

        <div className="text-wrap">
          <div className="price">36,500원</div>
          <div className="sub-text">한우 A++ 척 아이롤 스테이크용 300g</div>
        </div>

        <div className="bottom-wrap">
          <div className="content-btn-wrap">
            <button className="content-btn">펼쳐보기</button>
          </div>
        </div>
      </div>
      <Divider />
      <div className="order-record-container">
        <div className="date-wrap">
          <img src="./images/orderIcon.png" alt="order-icon" className="order-icon" />
          <div className="today">{today}</div>
        </div>

        <div className="text-wrap">
          <div className="price">25,000원</div>
          <div className="sub-text">맞춤상회 소대창 구이 200g 외 2개</div>
        </div>

        <div className="bottom-wrap">
          <div className="content-btn-wrap">
            <button className="content-btn">펼쳐보기</button>
          </div>
        </div>
      </div>
    </>
  )
}
