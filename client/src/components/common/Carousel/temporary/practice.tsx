import React, { useState, useRef, useEffect } from 'react'
import './style.scss'
import { FiArrowLeftCircle } from 'react-icons/fi'
import { FiArrowRightCircle } from 'react-icons/fi'

const imgArr: Array<string> = [
  './images/carousel1.png',
  './images/carousel2.png',
  './images/carousel3.png',
  './images/carousel4.png',
]

export const MyCarousel: React.FC = () => {
  const slides = imgArr.length + 1
  const imageBox = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(1)
  console.log(currentSlide)
  // const [goFirst, setgoFirst] = useState(true)

  const clickLRightBtn = () => {
    if (currentSlide < 5) {
      setCurrentSlide(currentSlide + 1)
    } else {
      imageBox.current.style.transform = `translateX(-100%)`
      setCurrentSlide(1)
    }
  }

  const clickLeftBtn = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1)
    } else {
      imageBox.current.style.transform = `translateX(0%)`
      setCurrentSlide(4)
    }
  }

  useEffect(() => {
    if (currentSlide < 5) {
      imageBox.current.style.transition = 'all 1s ease-in-out'
      imageBox.current.style.transform = `translateX(-${currentSlide}00%)`
    } else if (currentSlide > 1) {
      imageBox.current.style.transition = 'all 1s ease-in-out'
      imageBox.current.style.transform = `translateX(+${currentSlide}00%)`
    }
  }, [currentSlide])

  // useEffect(() => {
  //   setCurrentSlide(0)
  // }, [goFirst])

  // setInterval(() => {
  //   clickLRightBtn()
  //   if (currentSlide === imgUrlArr.length + 1) {
  //     setCurrentSlide(0)
  //   } else {
  //     setCurrentSlide(currentSlide + 1)
  //   }
  //   // todo: 5가되면 0으로 돌아가게
  // }, 2000)

  return (
    <div className="carousel">
      <div className="image-box" ref={imageBox}>
        <img src={imgArr[3]} alt="loading..." loading="eager" />
        {imgArr.map((url: string, idx: number) => (
          <img key={idx} src={url} alt="loading..." loading="eager" />
        ))}
        <img src={imgArr[0]} alt="loading..." loading="eager" />
      </div>

      <FiArrowLeftCircle className="left-arrow-btn" onClick={clickLeftBtn} />
      <FiArrowRightCircle className="right-arrow-btn" onClick={clickLRightBtn} />
      {/* <div className="dots">
        <div className={`num ${currentSlide === 1 || 5 ? 'cur' : ''}`}>1</div>
        <div className={`num ${currentSlide === 2 ? 'cur' : ''}`}>2</div>
        <div className={`num ${currentSlide === 3 ? 'cur' : ''}`}>3</div>
        <div className={`num ${currentSlide === 4 || 0 ? 'cur' : ''}`}>4</div>
      </div> */}
    </div>
  )
}

// todo : 시간고려, 마지막에서 바로 첫슬라이드 넘어가기 고려
