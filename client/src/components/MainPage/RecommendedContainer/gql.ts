import gql from 'graphql-tag'

export const GET_RECOMMENDED = gql`
  query($categoryId: Int!, $offset: Int!, $limit: Int!) {
    getRecommended(categoryId: $categoryId, offset: $offset, limit: $limit) {
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
