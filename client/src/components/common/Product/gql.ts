import gql from 'graphql-tag'

export const INSERT_FAVORITES = gql`
  mutation($input: FavoriteInput!) {
    insertFavorite(input: $input) {
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

export const DELETE_FAVORITES = gql`
  mutation($favoriteId: Int!) {
    deleteFavorite(id: $favoriteId) {
      id
    }
  }
`
