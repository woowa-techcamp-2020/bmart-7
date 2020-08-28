import React, { useState, useRef } from 'react'
import './style.scss'
import { GET_SECTIONS } from './gql'
import { useQuery } from 'react-apollo'
import { Divider } from '@/components/common/Divider'
import { SubCategoryContainer } from './SubCategoryContainer'
import { Redirect } from 'react-router-dom'

export const CategoryContainer: React.FC = () => {
  const [mainTitleId, setMainTitleId] = useState(0)

  const clickMainTitle = (mainId) => {
    if (mainId === -1) {
      return
    }
    setMainTitleId(mainId)
    if (mainTitleId === mainId) {
      setMainTitleId(0)
    } else {
      setMainTitleId(mainId)
    }
  }

  const { loading, error, data } = useQuery(GET_SECTIONS, {
    fetchPolicy: 'cache-and-network',
  })
  if (loading) return <></>
  if (error) return <Redirect to="/" />

  data.getSections.map((special) => {
    if (special.mainCategories.length % 2 === 1) {
      special.mainCategories.push({
        id: -1,
        categories: [],
      })
    }
  })

  return (
    <div id="category-container">
      {data.getSections.map((special, idx) => (
        <React.Fragment key={idx}>
          <div className="special-wrap">
            <div className="special-title-wrap">
              <header className="special-title" key={special.id}>
                {special.title}
              </header>
            </div>
            <ul className="main-category-wrap">
              {special.mainCategories.map((main, idx) => (
                <React.Fragment key={main.id}>
                  <div className="main-category-title-wrap">
                    <li
                      className={`title ${mainTitleId === main.id ? 'clicked' : 'unclicked'}`}
                      onClick={() => clickMainTitle(main.id)}
                    >
                      {main.title}
                    </li>
                  </div>
                  {idx % 2 === 1 ? (
                    <>
                      <SubCategoryContainer
                        mainId={special.mainCategories[idx - 1].id}
                        isShow={special.mainCategories[idx - 1].id === mainTitleId}
                        subCategories={special.mainCategories[idx - 1].categories}
                        key={`category-${idx - 1}`}
                      />
                      <SubCategoryContainer
                        mainId={main.id}
                        isShow={main.id === mainTitleId}
                        subCategories={main.categories}
                        key={`category-${idx}`}
                      />
                    </>
                  ) : null}
                </React.Fragment>
              ))}
            </ul>
          </div>
          <Divider />
        </React.Fragment>
      ))}
    </div>
  )
}
