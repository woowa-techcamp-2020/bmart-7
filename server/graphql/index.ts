import { loadFilesSync, mergeTypeDefs, mergeResolvers, makeExecutableSchema } from 'graphql-tools'
import path from 'path'
import { userResolver } from './user/user-resolver'
import { cartResolver } from './cart/cart-resolver'
import { categoryResolver } from './category/category-resolver'
import { productResolver } from './product/product-resolver'
import { orderResolver } from './order/order-resolver'

const allTypes = loadFilesSync(path.join(__dirname, '/**/*.graphql'))
const resolvers = mergeResolvers([
  userResolver,
  cartResolver,
  categoryResolver,
  productResolver,
  orderResolver,
])

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs: mergeTypeDefs(allTypes),
})
