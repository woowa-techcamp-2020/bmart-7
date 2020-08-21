import React from 'react'
import './style.scss'

const tmpPrweiewList = [
  'https://media.vlpt.us/images/blair/post/3cdc6b33-1028-477b-97b5-e4c846fdc36b/1.png',
  'https://media.vlpt.us/images/blair/post/15e86c94-e647-4f1a-800d-eb5ce55d4163/2.png',
  'https://media.vlpt.us/images/blair/post/261524d8-74ad-4a59-b69b-1b8e9de83d5f/3.png',
  'https://media.vlpt.us/images/blair/post/9a47f104-6352-44b3-80c6-10b787e93e1e/4.png',
]

export const PreviewContainer: React.FC = () => {
  const clickPreviewItem = (e: any) => {
    // todo:클릭시 해당 페이지 이동
    console.log(e.target)
  }

  return (
    <div className="preview-container">
      <div className="preview-header-section">
        <div className="preview-header-left">
          <div className="now-buy">지금 사면 ⚡</div>
          <div className="surprise-sale">번쩍 할인</div>
        </div>
        <div className="preview-header-right">
          <div className="more-view">더보기 ›</div>
        </div>
      </div>

      <div className="preview-body-section">
        <ul className="preview-list-wrap">
          {tmpPrweiewList.map((url: string, idx: number) => (
            <li className="product-small-item">
              <img data-id={idx} src={url} alt="preview" onClick={clickPreviewItem} />
            </li>
          ))}
        </ul>

        <div className="product-big-item">product{/* 범수님이 작업하신 product */}</div>
      </div>
    </div>
  )
}
