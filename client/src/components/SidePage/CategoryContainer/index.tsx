import React, { useState, useRef } from 'react'
import './style.scss'
import { GET_SECTIONS } from './gql'
import { useQuery } from 'react-apollo'
// import mockdata from './mock.json'
import { Divider } from '@/components/common/Divider'
import { SubCategoryContainer } from './SubCategoryContainer'
import { Redirect } from 'react-router-dom'

export const CategoryContainer: React.FC = () => {
  const [subCategoryList, setSubCategoryList] = useState(false)

  const clickMainTitle = (e) => {
    if (subCategoryList) {
      setSubCategoryList(false)
    } else {
      setSubCategoryList(true)
    }
  }

  const { loading, error, data } = useQuery(GET_SECTIONS, {
    fetchPolicy: 'cache-and-network',
  })
  if (loading) return <></>
  if (error) return <Redirect to="/" />
  console.log(data)

  return (
    <div id="category-container">
      {data.getSections.map((special, idx) => (
        <React.Fragment key={idx}>
          <div className="special-wrap">
            <div className="special-title-wrap">
              <header className="special-title" key={idx}>
                {special.title}
              </header>
            </div>
            <ul className="main-category-wrap">
              {special.mainCategories.map((main, idx) => (
                <div className="main-category-title-wrap" onClick={clickMainTitle}>
                  <li className="title main-title" key={idx} data-mainId={main.id}>
                    {main.title}
                  </li>
                  <div className="sub-category-title-wrap">
                    {subCategoryList ? (
                      <SubCategoryContainer
                        mainId={main.id}
                        subCategories={main.categories}
                        key={idx}
                      />
                    ) : null}
                  </div>
                </div>
              ))}
            </ul>
          </div>
          <Divider />
        </React.Fragment>
      ))}
    </div>
  )
}
