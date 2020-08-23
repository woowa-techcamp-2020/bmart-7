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

export const GET_PRODUCTS = gql`
  query($input: ProductFilterInput) {
    getProducts(input: $input) {
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
