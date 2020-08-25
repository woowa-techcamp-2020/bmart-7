import { client } from '@/ApolloClient'

export const fetchQuery = async ({ query, variables = {} }) => {
  const { data } = await client.query({
    query,
    variables,
    fetchPolicy: 'cache-first',
  })
  return data
}
