import gql from 'graphql-tag'

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
    }
  }
`

export const GET_MAIN_CATEGORIES = gql`
  query($isMain: Boolean) {
    getMainCategories(isMain: $isMain) {
      id
      title
      isMain
      imageUrl
    }
  }
`
