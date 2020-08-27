import React from 'react'
import './style.scss'
import { RouteProps } from 'react-router'
import { SideMenuHeader } from '@/components/SidePage/SideMenuHeader'
import { CategoryContainer } from '@/components/SidePage/CategoryContainer'
import { Divider } from '@/components/common/Divider'
import { Footer } from '@/components/MainPage/Footer'
import { Header } from '@/components/common'

export const SidePage: React.FC<RouteProps> = ({ history }) => {
  return (
    <div id="side-page">
      <Header title={<h1></h1>} isShowSearch={false} isShowMenu={false} history={history} />
      <SideMenuHeader />
      <Divider />
      <CategoryContainer />
      <div className="footer-buffer">
        <Footer />
      </div>
    </div>
  )
}
