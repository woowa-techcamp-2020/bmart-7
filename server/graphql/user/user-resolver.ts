import { Context, checkAuth } from '../context'
import {
  UserWhereUniqueInput,
  UserCreateInput,
  FavoriteWhereUniqueInput,
  FavoriteWhereInput,
} from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
import { decodeJwt } from '../../utils/jwt'

export const userResolver = {
  Query: {
    initAuthUser,
    getUserById,
    getUserFavorites,
  },
  Mutation: {
    insertUser,
    insertFavorite,
    deleteFavorite,
  },
}

async function initAuthUser(parent, args, context: Context) {
  const userInfo = await decodeJwt(context.req.headers.authorization)

  return await context.prisma.user.findOne({
    where: {
      id: userInfo.id,
    },
  })
}

async function getUserById(parent, args: UserWhereUniqueInput, context: Context) {
  const id = args.id

  await checkAuth(id, context)

  return await context.prisma.user.findOne({
    where: {
      id: id,
    },
  })
}

async function getUserFavorites(parent, args: UserWhereUniqueInput, context: Context) {
  const id = args.id
  await checkAuth(id, context)

  return await context.prisma.user
    .findOne({
      where: {
        id,
      },
    })
    .favorites({
      include: {
        product: true,
      },
    })
}

async function insertUser(parent, args: { input: UserCreateInput }, context: Context) {
  const { id, userId, email, phone, address } = { ...args.input }

  return await context.prisma.user.create({
    data: {
      id,
      userId,
      email,
      phone,
      address,
    },
  })
}

async function insertFavorite(parent, args: { input: FavoriteWhereUniqueInput }, context: Context) {
  const { userId, productId } = { ...args.input }
  await checkAuth(userId, context)

  const favorites = await checkExist({ productId, userId }, context)

  if (favorites.length > 0) {
    throw new ApolloError('Already Exist Favorite', 'DUPLICATE')
  }

  return await context.prisma.favorite.create({
    data: {
      product: {
        connect: {
          id: productId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      product: true,
    },
  })
}

async function deleteFavorite(parent, args: FavoriteWhereUniqueInput, context: Context) {
  const id = args.id

  const favorites = await checkExist({ id }, context)
  await checkAuth(favorites[0].userId, context)

  return await context.prisma.favorite.delete({
    where: {
      id,
    },
  })
}

async function checkExist(where: FavoriteWhereInput, context: Context) {
  const favorites = await context.prisma.favorite.findMany({
    where,
  })
  if (!favorites) {
    throw new ApolloError('No Favorite', 'NOT_FOUND')
  }
  return favorites
}
