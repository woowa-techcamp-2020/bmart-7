import gql from 'graphql-tag'

export const INSERT_ORDER = gql`
  mutation($input: OrderInput!) {
    insertOrder(input: $input) {
      id
    }
  }
`
