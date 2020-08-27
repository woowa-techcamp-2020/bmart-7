import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import { MainCategoryItem } from './MainCategoryItem'
import { MainCategory } from '@/types'

type MainCategoryListProps = {
  mainCategoryList: MainCategory[]
}

const CATEGORY_NUM = 10

export const MainCategoryList: React.FC<MainCategoryListProps> = ({ mainCategoryList }) => {
  const imageBaseUrl = process.env.REACT_APP_S3_URL + 'category/'
  const sideImgUrl: string = '10.png'

  return (
    <div className="main-category-list">
      <div className="category-text-wrap">
        <div className="category-time-text">
          <span role="img" aria-label="clock">
            🕙
          </span>
          배달시간 16~20분 예상
        </div>
        <div className="Dividing-line">|</div>
        <div className="category-deadline-text">24시까지 주문 가능</div>
      </div>
      <ul className="category-wrap">
        {mainCategoryList.length ? (
          <>
            {mainCategoryList.map((mainCategory, idx: number) => (
              <MainCategoryItem
                id={mainCategory.id}
                url={`${imageBaseUrl}${mainCategory.imageUrl}`}
                title={mainCategory.title}
                key={idx}
              />
            ))}
            <Link to="/side" className="category-item">
              <img src={`${imageBaseUrl}${sideImgUrl}`} alt="cat" />
              <div className="title">더보기</div>
            </Link>
          </>
        ) : (
          [...new Array(CATEGORY_NUM)].map((_, i) => <div className="loading-block" key={i}></div>)
        )}
      </ul>
    </div>
  )
}
