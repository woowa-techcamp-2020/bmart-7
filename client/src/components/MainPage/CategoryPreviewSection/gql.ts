import gql from 'graphql-tag'

export const GET_MAIN_CATEGORIES = gql`
  query {
    getMainCategories {
      id
      title
    }
  }
`
