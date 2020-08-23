import { Context } from '../context'
import { ProductWhereUniqueInput, ProductOrderByInput } from '@prisma/client'

export const productResolver = {
  Query: {
    getProduct,
    getProducts,
    getRecommended,
    getSearchProducts,
    getPreviewProducts,
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
  const { categoryId, limit, offset } = args
  return await context.prisma.product.findMany({
    skip: offset,
    take: limit,
    where: {
      categoryId,
      isMain: 1,
    },
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

async function getPreviewProducts(parent, args, context: Context) {
  return await context.prisma.product.findMany({
    take: 4,
  })
}
