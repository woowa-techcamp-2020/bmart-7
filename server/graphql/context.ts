import { PrismaClient } from '@prisma/client'
import prisma from '../prisma'
import { Request } from 'express'
import { ApolloError } from 'apollo-server-express'
import { decodeJwt } from '../utils/jwt'

export interface Context {
  prisma: PrismaClient
  req: Request
}

export function createContext({ req }: { req: Request }): Context {
  return { prisma, req }
}

export async function checkAuth(userId: number, context: Context): Promise<boolean> {
  const splitted = context.req.headers.authorization.split('-')

  if (splitted[0] === 'guest') {
    return true
  }

  const userInfo = await decodeJwt(context.req.headers.authorization)
  if (userInfo.id !== userId) {
    throw new ApolloError('Authorization Error', 'AUTH')
  }
  return true
}
