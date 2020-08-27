import gql from 'graphql-tag'

export const GET_INIT_DATA = gql`
  query($userId: Int!) {
    getUserFavorites(id: $userId) {
      id
      product {
        id
        title
        originPrice
        salePrice
        salePercent
        amount
        mainImage
      }
    }
    getUserCartItems(id: $userId) {
      id
      count
      product {
        id
        title
        originPrice
        salePrice
        salePercent
        amount
        mainImage
        bannerImage
      }
    }
  }
`

export const GET_USER = gql`
  query {
    initAuthUser {
      id
      userId
    }
  }
`
