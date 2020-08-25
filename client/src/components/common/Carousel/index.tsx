import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import './style.scss'

const imgUrlArr: Array<string> = [
  'https://media.vlpt.us/images/blair/post/83bc5185-50cd-4814-8d68-77ae5f56e3c3/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-08-21%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.33.49.png',
  'https://menu.mt.co.kr/moneyweek/thumb/2020/04/13/06/2020041315148091718_1.jpg',
  'https://photo.jtbc.joins.com/news/2018/01/22/20180122172000506.jpg',
  'https://menu.mt.co.kr/moneyweek/thumb/2020/04/09/06/2020040910318013214_1.jpg',
]

export const SlickCarousel: React.FC = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slideToShow: 1,
    arrowa: true,
    slideToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    className: 'slides',
    arrow: false,
  }
  return (
    <div className="slick-carousel">
      <Slider className="images" {...settings}>
        {imgUrlArr.map((url: string, idx: number) => (
          <img key={idx} width="100%" src={url} alt="cat" loading="eager" />
        ))}
      </Slider>
    </div>
  )
}
