import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import './style.scss'

const imgUrlArr: Array<string> = [
  'https://media.vlpt.us/images/blair/post/83bc5185-50cd-4814-8d68-77ae5f56e3c3/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-08-21%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.33.49.png',
  'https://lh3.googleusercontent.com/proxy/Kqky1_PiTX-HWge7pZFXHvdcCq-Uz73JYQJyE9hO5vstcbEz7Pc3SgZdz9aNzHHkK1YSpoXmqGPhbJQJEjtpVVJiILipB2VfizxwJr4zyJKnTFgUMupP_HFtVvmVUXhVinvlXaH9_Z4B1mmDJrDj9tDRDYG6HvJYAT2vPTODoufQIfBqQBdIRLrG6RUZQrYh8fDKnFryIWY64CpeMrj_MnePuO_yt6OBdpjxu7gbpdNPh6IXqmM_lW70ycMYkeziZNhVeOH7oQDIeCsjjdqfFxMn0Qfr46KOmMoLzUKsq4A-veiEkhgvGmVcMsXdREeqikHgWWvRlGzQprBT3gyaJcDktKWRqI3rREL8O1G9H4XxYXk0V5bpX2CbsQ4ZODLMPK8BoA',
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
          <img key={idx} width="100%" src={url} alt="cat" />
        ))}
      </Slider>
    </div>
  )
}
