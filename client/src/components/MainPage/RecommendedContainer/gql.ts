import gql from 'graphql-tag'

export const GET_RECOMMENDED = gql`
  query($sectionId: Int!, $offset: Int!, $limit: Int!) {
    getRecommended(sectionId: $sectionId, offset: $offset, limit: $limit) {
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
