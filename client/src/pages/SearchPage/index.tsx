import React, { useState, useEffect } from 'react'
import './style.scss'
import { RouteProps } from 'react-router'
import { IoMdClose } from 'react-icons/io'
import { Divider } from '@/components/common'
import { client } from '@/ApolloClient'
import { GET_PRODUCTS } from './gql'
import { Header } from './Header'
import { SearchHeader } from '@/components/common'
import { Link } from 'react-router-dom'
import { getItem, setItem, removeItem } from './utils'
const limit = 5

const useDebounce = (fn: Function, timeout: number) => {
  const [timeoutId, setTimeoutId] = useState(null)
  return (...args: any) => {
    if (timeoutId) clearTimeout(timeoutId)
    const newTimeoutId = setTimeout(() => {
      fn(...args)
    }, timeout)
    setTimeoutId(newTimeoutId)
  }
}

export const SearchPage: React.FC<RouteProps> = (props) => {
  const { history } = props
  const state = history.location.state
  const [keyword, setKeyword] = useState('')
  const [resultList, setResultList] = useState([])
  // const [timeOut, setTimeOut] = useState(null)

  useEffect(() => {
    state ? setKeyword(state.query) : setKeyword('')
  }, [state])

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

  const debounceQuery = useDebounce((value) => {
    if (!value.length) return setResultList([])
    fetchQuery(value)
  }, 100)
  const inputHandler = (e) => {
    const value = e.target.value
    setKeyword(value)
    debounceQuery(value)
  }
  const searchHandler = (input?) => {
    const state = input || keyword
    if (!previousKeywords.includes(state)) {
      const updatedKeywords = [state, ...previousKeywords]
      setItem(updatedKeywords)
    }
    history.push(`/search`, {
      query: state,
    })
    history.push(`/search/result/${state}`)
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
      <SearchHeader
        keyword={keyword}
        result={false}
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
              <span onClick={() => searchHandler(keyword)}>{keyword}</span>
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
