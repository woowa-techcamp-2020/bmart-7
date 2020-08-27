import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import './style.scss'

const imgUrlArr: Array<string> = [
  './images/banner1.gif',
  './images/banner2.gif',
  './images/banner3.gif',
  './images/banner4.gif',
  './images/banner5.gif',
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
