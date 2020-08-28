import { Context } from '../context'
import { ProductWhereUniqueInput, ProductOrderByInput } from '@prisma/client'

export const productResolver = {
  Query: {
    getProduct,
    getProducts,
    getRecommended,
    getSearchProducts,
    getMultipleProducts,
  },
}

async function getProduct(parent, args: ProductWhereUniqueInput, context: Context) {
  const { id } = args
  return await context.prisma.product.findOne({
    where: {
      id,
    },
  })
}

type ProductFilterInput = {
  categoryId?: number
  mainCategoryId?: number
  sectionId?: number
  searchQuery?: string
  sortBy?: string
  isAscending?: boolean
  limit?: number
}

type ProductMultipleFilterInput = {
  categoryIdList: number[]
  limit?: number
}

async function getMultipleProducts(
  parent,
  args: { input: ProductMultipleFilterInput },
  context: Context
) {
  const categoryList = await context.prisma.mainCategory.findMany()
  const categoryIdList = categoryList.map((category) => category.id)
  const { limit } = args.input
  return await context.prisma.product.findMany({
    include: {
      category: {
        include: {
          mainCategory: true,
        },
      },
    },
    where: {
      isMain: 1,
      category: {
        mainCategoryId: {
          in: categoryIdList,
        },
      },
    },
    orderBy: {
      categoryId: 'asc',
    },
    take: limit,
  })
}

async function getProducts(parent, args: { input: ProductFilterInput }, context: Context) {
  const {
    categoryId,
    mainCategoryId,
    sectionId,
    searchQuery,
    sortBy,
    isAscending,
    limit,
  } = args.input

  const searchCondition = {
    contains: searchQuery ? searchQuery : '',
  }

  const sortCondition: ProductOrderByInput = { id: 'asc' }
  if (sortBy) {
    delete sortCondition.id
    sortCondition[sortBy] = isAscending ? 'asc' : 'desc'
  }

  if (categoryId) {
    return await context.prisma.product.findMany({
      where: {
        categoryId: categoryId,
        title: searchCondition,
      },
      orderBy: sortCondition,
      take: limit,
    })
  } else if (mainCategoryId) {
    return await context.prisma.product.findMany({
      where: {
        category: {
          mainCategoryId,
        },
        title: searchCondition,
      },
      orderBy: sortCondition,
      take: limit,
    })
  } else if (sectionId) {
    return await context.prisma.product.findMany({
      where: {
        category: {
          mainCategory: {
            sectionId,
          },
        },
        title: searchCondition,
      },
      orderBy: sortCondition,
      take: limit,
    })
  } else {
    return await context.prisma.product.findMany({
      where: {
        title: searchCondition,
      },
      orderBy: sortCondition,
      take: limit,
    })
  }
}

async function getRecommended(parent, args, context: Context) {
  const { sectionId, limit, offset } = args

  return await context.prisma.product.findMany({
    where: {
      category: {
        mainCategory: {
          sectionId,
        },
      },
    },
    take: limit,
  })
}

async function getSearchProducts(parent, args: { searchInput: string }, context: Context) {
  const { searchInput } = args

  return await context.prisma.product.findMany({
    where: {
      title: {
        contains: searchInput,
      },
    },
  })
}
