import gql from 'graphql-tag'

export const PUT_CART_ITME_COUNT = gql`
  mutation($input: CartItemCountInput) {
    putCartItemCount(input: $input) {
      id
      count
    }
  }
`

export const DELETE_CART_ITEM = gql`
  mutation($idList: [Int!]!) {
    deleteCartItems(idList: $idList)
  }
`
