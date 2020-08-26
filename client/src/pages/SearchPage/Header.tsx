import React, { FormEvent } from 'react'
import './style.scss'
import { GrSearch } from 'react-icons/gr'
import { FiArrowLeft, FiMenu } from 'react-icons/fi'
import { AiFillCloseCircle } from 'react-icons/ai'

interface IProps {
  keyword: string
  clickBackHandler: () => void
  inputHandler: (e: FormEvent<HTMLElement>) => void
  keyUpHandler: (e: FormEvent<HTMLElement>) => void
  deleteHandler: (_: any) => void
  searchHandler: (_: any) => void
}

export const Header: React.FC<IProps> = (props) => {
  const {
    keyword,
    inputHandler,
    keyUpHandler,
    deleteHandler,
    searchHandler,
    clickBackHandler,
  } = props
  const classHidden = keyword.length ? '' : 'hidden'

  return (
    <header id="header">
      <div className="left-side row">
        <FiArrowLeft className="back-btn icon" onClick={clickBackHandler} />
      </div>
      <div className="center-side row">
        <input
          type="text"
          placeholder="어떤 상품을 찾으시나요?"
          value={keyword}
          onChange={inputHandler}
          onKeyUp={keyUpHandler}
          autoFocus
        />
      </div>
      <div className="right-side row">
        <AiFillCloseCircle className={`icon ${classHidden}`} onClick={deleteHandler} />
        <GrSearch className="search-btn icon" onClick={searchHandler} />
      </div>
    </header>
  )
}
