import gql from 'graphql-tag'

export const GET_MAIN_CATEGORIES = gql`
  query($input: MainCategoryInclude) {
    getMainCategories(input: $input) {
      id
      title
    }
  }
`
