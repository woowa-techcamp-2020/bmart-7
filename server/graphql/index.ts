import { loadFilesSync, mergeTypeDefs, mergeResolvers, makeExecutableSchema } from 'graphql-tools'
import path from 'path'
import { userResolver } from './user/user-resolver'
import { categoryResolver } from './category/category-resolver'
import { productResolver } from './product/product-resolver'

const allTypes = loadFilesSync(path.join(__dirname, '/**/*.graphql'))
const resolvers = mergeResolvers([userResolver, categoryResolver, productResolver])

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs: mergeTypeDefs(allTypes),
})
