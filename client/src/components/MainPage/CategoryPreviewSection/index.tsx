import React, { useState, useRef, useEffect } from 'react'
import { GET_MAIN_CATEGORIES, GET_MULTIPLE_PRODUCTS } from './gql'
import { CategoryPreview } from '../CategoryPreview'
import { CategoryPreviewHeader } from '../CategoryPreviewHeader'
import './style.scss'
import { makeIntersectionObserver, fetchQuery } from '@/utils/index'
import { Divider } from '@/components/common'
import { client } from '@/ApolloClient'

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
  const observer = makeHeaderIntersectionObserver(setCurrentCategoryId)
  const [io] = useState(observer)
  const [srcLoading, setSrcLoading] = useState(false)
  const [containerIo] = useState(makeIntersectionObserver(() => setSrcLoading(true)))
  const [mainCategoryList, setMainCategories] = useState([])
  const [multipleProducts, setMultipleProducts] = useState([])
  const containerRef = useRef()

  const changeCategory = (categoryId) => {
    setCurrentCategoryId(categoryId)
  }

  const fetchCategories = async () => {
    const {
      data: { getMainCategories },
    } = await client.query({ query: GET_MAIN_CATEGORIES, fetchPolicy: 'cache-first' })
    setMainCategories(getMainCategories)
  }
  useEffect(() => {
    fetchCategories()
    fetchMutipleProducts()
  }, [])

  const fetchMutipleProducts = async () => {
    const { getMultipleProducts } = await fetchQuery({
      query: GET_MULTIPLE_PRODUCTS,
      variables: {
        input: {
          limit: 100,
        },
      },
    })
    setMultipleProducts(getMultipleProducts)
  }

  if (containerRef.current) containerIo.observe(containerRef.current)

  return (
    <div className="category-preview-section" ref={containerRef}>
      <CategoryPreviewHeader
        mainCategoryList={mainCategoryList}
        currentCategoryId={currentCateogryId}
        changeCategory={changeCategory}
      />
      {mainCategoryList.map(({ id }, idx) => {
        const producList = multipleProducts.filter((product) => {
          return id === product.category.mainCategory.id
        })
        return (
          <CategoryPreview
            id={`catgory-${id}`}
            io={io}
            title={mainCategoryList[idx].title}
            mainCategoryId={id}
            srcLoading={srcLoading}
            productList={producList}
          />
        )
      })}
    </div>
  )
}
