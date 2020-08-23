import gql from 'graphql-tag'

export const GET_FAVORITES = gql`
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
  }
`
