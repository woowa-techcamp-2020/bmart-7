import gql from 'graphql-tag'

export const GET_MAIN_CATEGORIES = gql`
  query {
    getMainCategories {
      id
      title
    }
  }
`
export const GET_MULTIPLE_PRODUCTS = gql`
  query($input: ProductMultipleFilterInput) {
    getMultipleProducts(input: $input) {
      id
      title
      originPrice
      salePrice
      salePercent
      category {
        mainCategory {
          id
        }
      }
      amount
      mainImage
    }
  }
`
