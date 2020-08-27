import { Context, checkAuth } from '../context'
import { ApolloError } from 'apollo-server-express'
import { CartItemWhereInput } from '@prisma/client'

export const cartResolver = {
  Query: {
    getUserCartItems,
  },
  Mutation: {
    insertCartItem,
    putCartItemCount,
    deleteCartItems,
  },
}

async function getUserCartItems(parent, args: { id: number }, context: Context) {
  const { id } = args
  await checkAuth(id, context)

  return await context.prisma.cartItem.findMany({
    where: {
      user: {
        id,
      },
    },
    include: {
      product: true,
    },
  })
}

type CartItemInput = {
  productId: number
  userId: number
}

async function insertCartItem(parent, args: { input: CartItemInput }, context: Context) {
  const { productId, userId } = args.input

  await checkAuth(userId, context)
  const cartItems = await checkExist({ productId, userId }, context)

  if (cartItems.length > 0) {
    throw new ApolloError('Already Exist CartItem', 'DUPLICATE')
  }

  return await context.prisma.cartItem.create({
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

type CartItemCountInput = {
  id: number
  count: number
}

async function putCartItemCount(parent, args: { input: CartItemCountInput }, context: Context) {
  const { id, count } = args.input

  const cartItems = await checkExist({ id }, context)
  await checkAuth(cartItems[0].userId, context)

  return await context.prisma.cartItem.update({
    where: {
      id,
    },
    data: {
      count,
    },
  })
}

async function deleteCartItems(parent, args: { idList: number[] }, context: Context) {
  const { idList } = args

  for (const id of idList) {
    const cartItems = await checkExist({ id }, context)
    await checkAuth(cartItems[0].userId, context)
  }

  const result = await context.prisma.cartItem.deleteMany({
    where: {
      id: {
        in: idList,
      },
    },
  })
  return result.count
}

async function checkExist(where: CartItemWhereInput, context: Context) {
  const cartItems = await context.prisma.cartItem.findMany({
    where,
  })
  if (!cartItems) {
    throw new ApolloError('No Cart Item', 'NOT_FOUND')
  }
  return cartItems
}
