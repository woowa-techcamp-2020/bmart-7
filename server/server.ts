import express from 'express'
import logger from 'morgan'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './graphql'
import { createContext } from './graphql/context'
import userRouter from './router'
import dotenv from 'dotenv'
import path from 'path'

if (process.env.NODE_ENV === 'prod') {
  dotenv.config({ path: path.join(__dirname, './.env.prod') })
} else if (process.env.NODE_ENV === 'dev') {
  dotenv.config({ path: path.join(__dirname, './.env.dev') })
} else {
  throw new Error('process.env.NODE_ENV를 설정하지 않았습니다!')
}

const app = express()
app.use(express.static(path.join(__dirname, '../client/build')))
declare global {
  namespace Express {
    export interface Request {
      githubUser?: {
        id: number
        login: string
        email?: string
      }
      user?: {
        id: number
        userId: string
        email?: string
      }
    }
  }
}
app.use(logger('dev'))
app.use(userRouter)

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
  debug: process.env.NODE_ENV === 'dev',
})

apolloServer.applyMiddleware({ app })

app.get('*', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../client/build/') })
})

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
)
