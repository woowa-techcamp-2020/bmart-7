import React, { useState } from 'react'
import { GET_MAIN_CATEGORIES } from './gql'
import { useQuery } from 'react-apollo'
import { CategoryPreview } from '../CategoryPreview'
import { CategoryPreviewHeader } from '../CategoryPreviewHeader/'
import './style.scss'

const firstCategoryId = 17

const makeIntersectionObserver = (setCurrentCategoryId) => {
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

  const observer = makeIntersectionObserver(setCurrentCategoryId)
  const [io] = useState(observer)

  const changeCategory = (categoryId) => {
    setCurrentCategoryId(categoryId)
  }

  const { loading, error, data } = useQuery(GET_MAIN_CATEGORIES, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const mainCategoryList = data.getMainCategories

  return (
    <div className="category-preview-section">
      <CategoryPreviewHeader
        mainCategoryList={mainCategoryList}
        currentCategoryId={currentCateogryId}
        changeCategory={changeCategory}
      />
      {mainCategoryList.map((category, idx) => {
        const { title, id } = category
        return (
          <CategoryPreview
            id={`catgory-${id}`}
            title={title}
            mainCategoryId={id}
            key={id}
            io={io}
          />
        )
      })}
    </div>
  )
}
