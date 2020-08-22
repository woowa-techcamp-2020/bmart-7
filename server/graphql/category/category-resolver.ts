import { Context } from '../context'
import { FindManyMainCategoryArgs } from '@prisma/client'

export const categoryResolver = {
  Query: {
    getSections,
    getMainCategories,
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

type MainCategoryInput = {
  input: {
    categories: boolean
    products: boolean
  }
}

async function getMainCategories(parent, args: MainCategoryInput, context: Context) {
  const includeCondition: FindManyMainCategoryArgs = {}

  if (args.input.categories) {
    includeCondition.include = { categories: true }

    if (args.input.products) {
      includeCondition.include.categories = {
        include: {
          products: true,
        },
      }
    }
  }

  return await context.prisma.mainCategory.findMany(includeCondition)
}
