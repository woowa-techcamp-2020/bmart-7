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
        bannerImage
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

export const INSERT_CART_ITEM = gql`
  mutation($input: CartItemInput) {
    insertCartItem(input: $input) {
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

export const PUT_CART_ITEM_COUNT = gql`
  mutation($input: CartItemCountInput) {
    putCartItemCount(input: $input) {
      id
      count
    }
  }
`
