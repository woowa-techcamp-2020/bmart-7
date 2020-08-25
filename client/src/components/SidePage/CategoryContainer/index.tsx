import React, { useState, useRef } from 'react'
import './style.scss'
import mockdata from './mock.json'
import { Divider } from '@/components/common/Divider'
import { SubCategoryContainer } from './SubCategoryContainer'

export const CategoryContainer: React.FC = () => {
  const [subCategoryList, setSubCategoryList] = useState(false)

  const clickMainTitle = (e) => {
    if (subCategoryList) {
      setSubCategoryList(false)
    } else {
      setSubCategoryList(true)
    }
  }
  return (
    <div id="category-container">
      {mockdata.data.getSections.map((special, idx) => (
        <>
          <div className="special-wrap">
            <div className="special-title-wrap">
              <header className="special-title" key={idx}>
                {special.title}
              </header>
            </div>
            <ul className="main-category-wrap">
              {special.mainCategories.map((main, idx) => (
                <div className="main-category-title-wrap" onClick={clickMainTitle}>
                  <li className="title main-title" key={idx}>
                    {main.title}
                  </li>
                  <div className="sub-category-title-wrap">
                    {subCategoryList ? (
                      <SubCategoryContainer subCategories={main.categories} key={idx} />
                    ) : null}
                  </div>
                </div>
              ))}
            </ul>
          </div>
          <Divider />
        </>
      ))}
    </div>
  )
}
