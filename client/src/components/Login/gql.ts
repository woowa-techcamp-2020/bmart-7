import gql from 'graphql-tag'

export const INSERT_USER = gql`
  mutation($input: UserInput!) {
    insertUser(input: $input) {
      id
      userId
    }
  }
`
