import { Context } from '../context'
import { CategoryWhereUniqueInput } from '@prisma/client'

export const categoryResolver = {
  Query: {
    getSections,
    getMainCategories,
    getMainCategory,
    getCategory,
  },
}

async function getSections(parent, args, context: Context) {
  return await context.prisma.section.findMany({
    include: {
      mainCategories: {
        include: {
          categories: true,
        },
      },
    },
  })
}

async function getMainCategories(parent, args: { isMain: boolean }, context: Context) {
  const isMain = args.isMain ? 1 : 0

  if (isMain)
    return await context.prisma.mainCategory.findMany({
      where: {
        isMain,
      },
    })

  return await context.prisma.mainCategory.findMany()
}

type MainCategoryInput = {
  input: {
    id: number
    categories: boolean
  }
}

async function getMainCategory(parent, args: MainCategoryInput, context: Context) {
  const { id, categories } = args.input

  return await context.prisma.mainCategory.findOne({
    where: {
      id,
    },
    include: {
      categories,
    },
  })
}

async function getCategory(parent, args: CategoryWhereUniqueInput, context: Context) {
  const id = args.id
  return await context.prisma.category.findOne({
    where: {
      id,
    },
  })
}
