import React from 'react'
import './style.scss'
import { IoIosPaper } from 'react-icons/io'
import { AiFillHeart } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'

export const SideMenuHeader: React.FC = () => {
  return (
    <header id="side-menu-header">
      <div className="redirect-home">
        <div className="strong-text">B마트 홈</div>
        <div className="normal-text">으로 가기</div>
        <IoIosArrowForward className="arrow-icon" />
      </div>
      <div className="show-detail-wrap">
        <div className="list-wrap">
          <div className="icon">
            <IoIosPaper />
          </div>
          <div className="text">주문내역</div>
        </div>
        <div className="border">|</div>
        <div className="list-wrap">
          <div className="icon">
            <AiFillHeart className="heart-icon" />
          </div>
          <div className="text">찜한상품</div>
        </div>
      </div>
    </header>
  )
}
