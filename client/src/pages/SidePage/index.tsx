import React from 'react'
import './style.scss'
import { SideMenuHeader } from '@/components/SidePage/SideMenuHeader'
import { CategoryContainer } from '@/components/SidePage/CategoryContainer'
import { Divider } from '@/components/common/Divider'
import { Footer } from '@/components/MainPage/Footer'

export const SidePage: React.FC = () => {
  return (
    <div id="side-page">
      <SideMenuHeader />
      <Divider />
      <CategoryContainer />
      <Footer />
    </div>
  )
}
