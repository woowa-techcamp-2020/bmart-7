import React, { useState, useEffect } from 'react'
import './style.scss'

interface IProps {
  resetHandler: () => void
}
const menuList = ['짜장면', '탕수육', '김치찌개', '치킨']

export const RandomRecommend: React.FC<IProps> = (props) => {
  const { resetHandler } = props
  const [menu, setMenu] = useState('암거나')
  let idxList = [0, 1, 2, 3]
  const getRandomIdx = (length) => {
    return Math.floor((Math.random() * 10) % length)
  }
  useEffect(() => {
    menuList.forEach((menu, idx) => {
      const randomIdx = idxList[getRandomIdx(idxList.length)]
      idxList = [...idxList].filter((idx) => {
        return randomIdx !== idx
      })
      setTimeout(() => {
        setMenu(menuList[randomIdx])
      }, (400 + idx * 100) * idx)
    })
    setTimeout(() => {
      resetHandler()
    }, 2500)
  }, [])

  return (
    <div className="recommend-container">
      <span className="menu">{menu}</span> 땡겨요
    </div>
  )
}
