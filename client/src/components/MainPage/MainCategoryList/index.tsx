import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import { MainCategoryItem } from './MainCategoryItem'

const categoryimgUrlList: Array<string> = [
<<<<<<< HEAD
  './mainIcons/1.jpeg',
  './mainIcons/2.jpeg',
  './mainIcons/3.jpeg',
  './mainIcons/4.jpeg',
  './mainIcons/5.jpeg',
  './mainIcons/6.jpeg',
  './mainIcons/7.jpeg',
  './mainIcons/8.jpeg',
  './mainIcons/9.jpeg',
=======
  './mainIcons/1.png',
  './mainIcons/2.png',
  './mainIcons/3.png',
  './mainIcons/4.png',
  './mainIcons/5.png',
  './mainIcons/6.png',
  './mainIcons/7.png',
  './mainIcons/8.png',
  './mainIcons/9.png',
  './mainIcons/10.png',
>>>>>>> [feat][#127]MainCategory파일들 변경, DetailPage Component생성
]

export const MainCategoryList: React.FC = () => {
  const sidebarIdx: number = 10
  const sideImgUrl: string = './mainIcons/10.jpeg'

  return (
    <div className="main-category-list">
      <div className="category-text-wrap">
        <div className="category-time-text">
          <span role="img" aria-label="clock">
            🕙
          </span>
          배달시간 16~20분 예상??
        </div>
        <div className="Dividing-line">|</div>
        <div className="category-deadline-text">24시까지 주문 가능</div>
      </div>
      <ul className="category-wrap">
        {categoryimgUrlList.map((url: string, idx: number) => (
          <MainCategoryItem id={idx} url={url} key={idx} />
        ))}
        <Link to="side">
          <img className="category-item" data-id={sidebarIdx} src={sideImgUrl} alt="cat" />
        </Link>
      </ul>
    </div>
  )
}
