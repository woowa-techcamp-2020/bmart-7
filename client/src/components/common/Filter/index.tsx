import React, { useRef, useState } from 'react'
import './style.scss'
import { FaCheck } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'

export type Condition = {
  sortBy: string | null
  isAscending: boolean
}

type FilterItem = {
  title: string
  condition: Condition
}

const filterList: FilterItem[] = [
  {
    title: '기본 정렬순',
    condition: {
      sortBy: null,
      isAscending: false,
    },
  },
  {
    title: '인기 상품순',
    condition: {
      sortBy: 'hit',
      isAscending: false,
    },
  },
  {
    title: '금액 높은순',
    condition: {
      sortBy: 'salePrice',
      isAscending: false,
    },
  },
  {
    title: '금액 낮은순',
    condition: {
      sortBy: 'salePrice',
      isAscending: true,
    },
  },
  {
    title: '신규 상품순',
    condition: {
      sortBy: 'createdAt',
      isAscending: false,
    },
  },
  {
    title: '할인율 순',
    condition: {
      sortBy: 'salePercent',
      isAscending: false,
    },
  },
]

let filterIndex = 0

export type FilterProps = {
  setCondition: React.Dispatch<React.SetStateAction<Condition>>
}

export const Filter: React.FC<FilterProps> = (props) => {
  const { setCondition } = props

  const filterContainerElement = useRef(null)
  const [isHidden, setIsHidden] = useState(true)

  console.log('load', filterIndex)
  const changeCondition = (index: number) => {
    filterIndex = index
    toggleFilterContainer()
    setCondition(filterList[index].condition)
  }

  const toggleFilterContainer = () => {
    console.log(filterIndex, isHidden)
    if (isHidden) {
      document.body.classList.add('stop-scroll')
      filterContainerElement.current.style.top = `${window.scrollY}px`
      setIsHidden(false)
      return
    }
    document.body.classList.remove('stop-scroll')
    setIsHidden(true)
  }
  const currentFilter = filterList[filterIndex]

  return (
    <div className="filter">
      <div className="title-wrapper" onClick={toggleFilterContainer}>
        <div className="title">{currentFilter.title}</div>
        <IoIosArrowDown className="down-arrow-icon" />
      </div>
      <div className={'filter-menu' + (isHidden ? ' hidden' : '')} ref={filterContainerElement}>
        <div className="filter-container">
          <div className="header">
            <div className="title">정렬</div>
            <div className="close-btn" onClick={toggleFilterContainer}>
              닫기
            </div>
          </div>
          {filterList.map((filterItem, index) => (
            <div
              className={'condition-wrapper' + (index === filterIndex ? ' active' : '')}
              key={index}
            >
              <div className="title" onClick={() => changeCondition(index)}>
                {filterItem.title}
              </div>
              <FaCheck className="check-icon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
