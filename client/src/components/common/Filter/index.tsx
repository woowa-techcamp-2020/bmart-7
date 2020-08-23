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
  isActive: boolean
  condition: Condition
}

const filterListDefault: FilterItem[] = [
  {
    title: '기본 정렬순',
    isActive: true,
    condition: {
      sortBy: null,
      isAscending: false,
    },
  },
  {
    title: '인기 상품순',
    isActive: false,
    condition: {
      sortBy: 'hit',
      isAscending: false,
    },
  },
  {
    title: '금액 높은순',
    isActive: false,
    condition: {
      sortBy: 'salePrice',
      isAscending: false,
    },
  },
  {
    title: '금액 낮은순',
    isActive: false,
    condition: {
      sortBy: 'salePrice',
      isAscending: true,
    },
  },
  {
    title: '신규 상품순',
    isActive: false,
    condition: {
      sortBy: 'createdAt',
      isAscending: false,
    },
  },
  {
    title: '할인율 순',
    isActive: false,
    condition: {
      sortBy: 'salePercent',
      isAscending: false,
    },
  },
]

export type FilterProps = {
  setCondition: React.Dispatch<React.SetStateAction<Condition>>
}

export const Filter: React.FC<FilterProps> = (props) => {
  const { setCondition } = props
  const filterContainerElement = useRef(null)
  const [filterList, setFilterList] = useState(filterListDefault)

  const changeCondition = (condition: Condition) => {
    const newFilterList = [...filterList]
    const prevCondition = newFilterList.find((filterItem) => filterItem.isActive)
    prevCondition.isActive = false
    const newCondition = newFilterList.find((filterItem) => filterItem.condition === condition)
    newCondition.isActive = true
    setFilterList(newFilterList)
    setCondition(condition)
  }

  const toggleFilterContainer = () => {
    if (filterContainerElement.current.classList.contains('hidden')) {
      document.body.classList.add('stop-scroll')
      filterContainerElement.current.classList.remove('hidden')
      return
    }
    document.body.classList.remove('stop-scroll')
    filterContainerElement.current.classList.add('hidden')
  }
  const currentFilter = filterList.find((filterItem) => filterItem.isActive)

  return (
    <div className="filter">
      <div className="title-wrapper" onClick={toggleFilterContainer}>
        <div className="title">{currentFilter.title}</div>
        <IoIosArrowDown className="down-arrow-icon" />
      </div>
      <div className="filter-menu hidden" ref={filterContainerElement}>
        <div className="filter-container">
          <div className="header">
            <div className="title">정렬</div>
            <div className="close-btn" onClick={toggleFilterContainer}>
              닫기
            </div>
          </div>
          {filterList.map((filterItem, index) => (
            <div className={'condition-wrapper' + (filterItem.isActive ? ' active' : '')}>
              <div
                className="title"
                onClick={() => changeCondition(filterItem.condition)}
                key={index}
              >
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
