import gql from 'graphql-tag'

export const GET_PRODUCT = gql`
  query($id: Int!) {
    getProduct(id: $id) {
      id
      title
      description
      originPrice
      salePrice
      salePercent
      mainImage
      bannerImage
    }
  }
`
