import { Context } from '../context'
import { ApolloError } from 'apollo-server-express'

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

  const isExist =
    (await context.prisma.cartItem.count({
      where: {
        productId,
        userId,
      },
    })) > 0

  if (isExist) {
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

  const result = await context.prisma.cartItem.deleteMany({
    where: {
      id: {
        in: idList,
      },
    },
  })
  console.log(result)
  return result.count
}
