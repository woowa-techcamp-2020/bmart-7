import React, { useState } from 'react'
import './style.scss'
import { RouteProps } from 'react-router'
import { IoMdClose } from 'react-icons/io'
import { Divider } from '@/components/common'
import { client } from '@/ApolloClient'
import { GET_PRODUCTS } from './gql'
import { Header } from './Header'
import { Link } from 'react-router-dom'
import { getItem, setItem, removeItem } from './utils'
const limit = 5
export const SearchPage: React.FC<RouteProps> = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const [resultList, setResultList] = useState([])
  // const [timeOut, setTimeOut] = useState(0)
  const item = getItem()
  const previousKeywords = item ? item : []
  const [keywordRecords, setKeywordRecords] = useState(previousKeywords)

  const fetchQuery = async (inputKeyword: string) => {
    const {
      data: { getProducts },
    } = await client.query({
      query: GET_PRODUCTS,
      variables: {
        input: {
          searchQuery: inputKeyword,
          sortBy: null,
          isAscending: false,
          limit,
        },
      },
      fetchPolicy: 'cache-first',
    })
    setResultList(getProducts)
  }

  const inputHandler = (e) => {
    const value = e.target.value
    setKeyword(value)
    fetchQuery(value)
    // if (!timeOut) {
    //   const newTimeOut = window.setTimeout(() => {
    //     setTimeOut(null)
    //     fetchQuery(value)
    //   }, 66)
    //   setTimeOut(newTimeOut)
    // }
  }

  const searchHandler = () => {
    const updatedKeywords = [keyword, ...previousKeywords]
    setItem(updatedKeywords)
    history.push(`/search/result/${keyword}`)
  }
  const deleteHandler = () => {
    setKeyword('')
    setResultList([])
  }
  const keyUpHandler = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      return searchHandler()
    }
  }
  const deleteRecordHandler = (index) => {
    const deletedRecords = [...keywordRecords].filter((keyword, idx) => {
      return index !== idx
    })
    setItem(deletedRecords)
    setKeywordRecords(deletedRecords)
  }

  const deleteAllRecordHandler = () => {
    removeItem()
    setKeywordRecords([])
  }

  const classHidden = keyword.length ? '' : 'hidden'
  return (
    <div className="search-page">
      <Header
        keyword={keyword}
        inputHandler={inputHandler}
        keyUpHandler={keyUpHandler}
        deleteHandler={deleteHandler}
        searchHandler={searchHandler}
        clickBackHandler={history.goBack}
      />
      <div id="header-buffer"></div>
      <Divider />
      <ul className="result-list">
        {resultList.map((result, idx) => (
          <li key={idx}>{result.title}</li>
        ))}
      </ul>
      <h3>최근 검색어</h3>
      <ul className="record-list">
        {keywordRecords.map((keyword, idx) => {
          return (
            <li key={idx}>
              <Link to={`/search/result/${keyword}`}>{keyword}</Link>
              <IoMdClose className="close-button" onClick={() => deleteRecordHandler(idx)} />
            </li>
          )
        })}
      </ul>
      {keywordRecords.length ? (
        <div className="delete-all-button">
          <input type="button" value="전체삭제" onClick={deleteAllRecordHandler} />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
