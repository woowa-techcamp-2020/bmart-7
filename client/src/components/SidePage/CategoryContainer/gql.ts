import gql from 'graphql-tag'

export const GET_SECTIONS = gql`
  query {
    getSections {
      title
      mainCategories {
        title
        id
        categories {
          title
          id
        }
      }
    }
  }
`
