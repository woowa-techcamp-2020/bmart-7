import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import { FiArrowLeft, FiMenu } from 'react-icons/fi'
import { GrSearch } from 'react-icons/gr'

type HeaderProps = {
  title: ReactElement
  isShowSearch?: boolean
  isShowMenu?: boolean
  history
}

export const Header: React.FC<HeaderProps> = ({
  title,
  isShowSearch = true,
  isShowMenu = true,
  history,
}) => {
  return (
    <>
      <header id="header">
        <div className="left-side row">
          <FiArrowLeft className="back-btn icon" onClick={history.goBack} />
        </div>
        <div className="center-side row">{title}</div>
        <div className="right-side row">
          {isShowSearch ? (
            <Link to="/search">
              <GrSearch className="search-btn icon" />
            </Link>
          ) : null}
          {isShowMenu ? (
            <Link to="/side">
              <FiMenu className="menu-btn icon" />
            </Link>
          ) : null}
        </div>
      </header>
      <div id="header-buffer"></div>
    </>
  )
}
