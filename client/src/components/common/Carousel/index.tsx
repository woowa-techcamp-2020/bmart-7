import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import './style.scss'

const imgUrlArr: Array<string> = [
  'https://lh3.googleusercontent.com/proxy/uamYJBhUo06Ke0OeQS3chx6_oz61FGl0wQwleDmXJcjieEJOQYyis3fIXoR85cke8pXuvXBCcw3QUKVBcVozV7bK8Wlm_0SIwNLbOMOeDwjCx0m1aP-byq3OCgOmvL2dotpTajJNs5CExyEzyMNHr6BSAm7BwdbKqJgdIIH3jA6xKsIh8GuLRqLk_DUV8O6CQAfQsYr0hU0n0KBAP5sAYsszVrsjqUHpRmcwO74Ze2vL0Jr5tLtuAsPPs35eIB6JycwbFdtckfKQyhB-fPRPDItAPW6Q28NKEHutGEuV3l-JN4xSckwI5pE9eT7cfk233U6mwGXW3_dZMjGdvAilIKVDYsYhIMNc-Sy2WhdfqOoaxPL_pU0DUCa2eZbtrJ6YuEmwGA',
  'https://photo.jtbc.joins.com/news/2018/01/22/20180122172000506.jpg',
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
    className: 'slides',
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
