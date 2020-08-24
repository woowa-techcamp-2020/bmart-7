import React from 'react'
import './style.scss'
import mockdata from './mock.json'
import { Divider } from '@/components/common/Divider'

export const CategoryContainer: React.FC = () => {
  return (
    <div id="category-container">
      {mockdata.data.getSections.map((special) => (
        <>
          <div className="special-wrap">
            <div className="special-title-wrap">
              <header className="special-title">{special.title}</header>
            </div>
            <ul className="main-category-list">
              {special.mainCategories.map((main) => (
                <li className="main-title">{main.title}</li>
              ))}
            </ul>
          </div>
          <Divider />
        </>
      ))}
    </div>
  )
}
