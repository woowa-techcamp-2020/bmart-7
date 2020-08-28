import gql from 'graphql-tag'

export const GET_USER_ORDERS = gql`
  query($id: Int!) {
    getUserOrders(id: $id) {
      id
      orderItems {
        id
        count
        product {
          id
          title
          salePrice
        }
      }
    }
  }
`
