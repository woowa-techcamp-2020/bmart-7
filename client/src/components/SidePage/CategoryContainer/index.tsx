import React from 'react'
import './style.scss'
import mockdata from './mock.json'

export const CategoryContainer: React.FC = () => {
  return (
    <div id="category-container">
      {mockdata.data.getSections.map((special) => (
        <div className="special-wrap">
          <header className="special-title">{special.title}</header>
          <ul className="category-list">
            {special.mainCategories.map((main) => (
              <li className="main-title">{main.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
