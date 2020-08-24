import React, { ReactElement } from 'react'
import './style.scss'

type SubHeaderProps = {
  title: string
  filter?: ReactElement
}

export const SubHeader: React.FC<SubHeaderProps> = (props) => {
  const { title, filter } = props
  return (
    <div className="sub-header">
      <div className="title">{title}</div>
      {filter}
    </div>
  )
}
