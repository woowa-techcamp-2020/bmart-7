import React, { useState, useRef, useEffect } from 'react'
import { GET_MAIN_CATEGORIES } from './gql'
import { useQuery } from 'react-apollo'
import { CategoryPreview } from '../CategoryPreview'
import { CategoryPreviewHeader } from '../CategoryPreviewHeader'
import './style.scss'
import { makeIntersectionObserver, fetchQuery } from '@/utils/index'
import { Divider } from '@/components/common'

const firstCategoryId = 17

const threshold = 0.1
const rootMargin = '0.1px'

const makeHeaderIntersectionObserver = (setCurrentCategoryId) => {
  return new IntersectionObserver(
    (entries, observer) => {
      entries.map((entry) => {
        if (!entry.isIntersecting) {
          return
        }
        const target = entry.target
        const categoryId = Number(target.attributes.getNamedItem('data-main-category-id').value)
        setCurrentCategoryId(categoryId)
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0.1px',
    }
  )
}

export const CategoryPreviewSection: React.FC = () => {
  const [currentCateogryId, setCurrentCategoryId] = useState(firstCategoryId)
  const [mainCategoryList, setMainCategories] = useState([])
  const containerRef = useRef()

  const fetchMainCategories = async () => {
    const { getMainCategories } = await fetchQuery({ query: GET_MAIN_CATEGORIES })
    setMainCategories(getMainCategories)
  }

  const observer = makeHeaderIntersectionObserver(setCurrentCategoryId)
  const [io] = useState(observer)
  const [containerIo] = useState(makeIntersectionObserver(fetchMainCategories))

  const changeCategory = (categoryId) => {
    setCurrentCategoryId(categoryId)
  }
  useEffect(() => {
    containerIo.observe(containerRef.current)
  }, [])

  return (
    <div className="category-preview-section" ref={containerRef}>
      <CategoryPreviewHeader
        mainCategoryList={mainCategoryList}
        currentCategoryId={currentCateogryId}
        changeCategory={changeCategory}
      />
      {mainCategoryList.map((category, idx) => {
        const { title, id } = category
        return (
          <div key={id}>
            {idx !== 0 ? <Divider /> : null}
            <CategoryPreview id={`catgory-${id}`} title={title} mainCategoryId={id} io={io} />
          </div>
        )
      })}
    </div>
  )
}
