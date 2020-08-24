import gql from 'graphql-tag'

export const GET_MAIN_CATEGORY = gql`
  query($categoryInput: MainCategoryInput, $productInput: ProductFilterInput) {
    getMainCategory(input: $categoryInput) {
      title
      categories {
        id
        title
      }
    }
    getProducts(input: $productInput) {
      id
      title
      originPrice
      salePrice
      salePercent
      isMain
      amount
      mainImage
    }
  }
`
