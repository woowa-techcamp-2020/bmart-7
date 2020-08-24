import React, { useState, useRef, useEffect } from 'react'
import './style.scss'

interface IProps {
  mainCategoryList: []
  currentCategoryId: number
  changeCategory: (categoryId: number) => void
}

interface refObject {
  [key: string]: HTMLElement
}

export const CategoryPreviewHeader: React.FC<IProps> = (props) => {
  const { mainCategoryList, currentCategoryId, changeCategory } = props
  const aRef: refObject = {}

  const headerRef = useRef<HTMLDivElement>()

  useEffect(() => {
    scrollHeader()
  }, [currentCategoryId])

  const onClickHandler = ({ id }) => {
    if (id !== currentCategoryId) changeCategory(id)
  }

  const scrollHeader = () => {
    const $header = headerRef.current
    const $currentCategory = aRef[currentCategoryId]
    const diff =
      $currentCategory.offsetLeft - $header.offsetWidth / 2 + $currentCategory.offsetWidth / 2
    $header.scrollLeft = diff
  }

  return (
    <div className="category-header sticky" ref={headerRef}>
      {mainCategoryList.map(({ title, id }, idx) => {
        return (
          <a
            className={id === currentCategoryId ? 'active' : ''}
            data-category={id}
            href={`#catgory-${id}`}
            key={id}
            onClick={(e) => onClickHandler({ id })}
            ref={(el) => (aRef[id] = el)}
          >
            {title}
          </a>
        )
      })}
    </div>
  )
}
