import gql from 'graphql-tag'

export const GET_PRODUCTS = gql`
  query($id: Int!, $input: ProductFilterInput) {
    getCategory(id: $id) {
      title
    }
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
