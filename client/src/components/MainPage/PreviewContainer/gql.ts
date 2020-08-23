import gql from 'graphql-tag'

export const GET_PREVIEW_PRODUCTS = gql`
  query {
    getPreviewProducts {
      id
      title
      originPrice
      salePrice
      salePercent
      amount
      mainImage
      bannerImage
    }
  }
`
