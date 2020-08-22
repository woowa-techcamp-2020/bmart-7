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
    products: boolean
  }
}

async function getMainCategory(parent, args: MainCategoryInput, context: Context) {
  const findCondition: FindOneMainCategoryArgs = {
    where: {
      id: args.input.id,
    },
  }

  if (args.input.categories) {
    findCondition.include = { categories: true }

    if (args.input.products) {
      findCondition.include.categories = {
        include: {
          products: true,
        },
      }
    }
  }

  return await context.prisma.mainCategory.findOne(findCondition)
}
