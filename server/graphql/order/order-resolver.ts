import { Context, checkAuth } from '../context'
import { ApolloError } from 'apollo-server-express'

export const orderResolver = {
  Query: {
    getUserOrders,
  },
  Mutation: {
    insertOrder,
  },
}

async function getUserOrders(parent, args: { id: number }, context: Context) {
  const { id } = args
  await checkAuth(id, context)

  return await context.prisma.order.findMany({
    where: {
      user: {
        id,
      },
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  })
}

type CartItemType = {
  id: number
  count: number
  product: {
    id: number
  }
}

type OrderInput = {
  userId: number
  cartItemIds: number[]
}

async function insertOrder(parent, args: { input: OrderInput }, context: Context) {
  const { userId, cartItemIds } = args.input

  await checkAuth(userId, context)

  const order = await context.prisma.order.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })

  const createOrderItems = cartItemIds.map(async (cartItemId) => {
    const cartItem = await context.prisma.cartItem.findOne({
      where: {
        id: cartItemId,
      },
      include: {
        product: true,
      },
    })

    await context.prisma.orderItem.create({
      data: {
        count: cartItem.count,
        order: {
          connect: {
            id: order.id,
          },
        },
        product: {
          connect: {
            id: cartItem.product.id,
          },
        },
      },
    })

    await context.prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    })
  })

  await Promise.all(createOrderItems)

  return await context.prisma.order.findOne({
    where: {
      id: order.id,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  })
}
