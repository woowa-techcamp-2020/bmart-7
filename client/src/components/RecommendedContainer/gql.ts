import gql from 'graphql-tag'

export const GET_RECOMMENDED = ({ categoryId, offset, limit }) => gql`
  query {
    getRecommended(categoryId: ${categoryId}, offset: ${offset}, limit: ${limit}) {
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
