import { Context } from '../context'
import { FindOneMainCategoryArgs } from '@prisma/client'

export const categoryResolver = {
  Query: {
    getSections,
    getMainCategories,
    getMainCategory,
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

async function getMainCategories(parent, args, context: Context) {
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
