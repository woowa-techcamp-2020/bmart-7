import React from 'react'
// import './style.scss'
import { SideMenuHeader } from '@/components/SidePage/SideMenuHeader'
import { CategoryContainer } from '@/components/SidePage/CategoryContainer'

export const SidePage: React.FC = () => {
  return (
    <div id="main-page">
      <SideMenuHeader></SideMenuHeader>
      <CategoryContainer></CategoryContainer>
    </div>
  )
}
