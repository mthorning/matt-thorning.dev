import React from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { gql } from '@apollo/client'

export default function useApolloClient({ query }) {
  const [data, setData] = React.useState({})
  const client = React.useMemo(
    () =>
      new ApolloClient({
        uri: `${window.location.origin}/api/graphql`,
        cache: new InMemoryCache(),
        headers: {
          'UI-Environment': 'development',
        },
      }),
    []
  )

  React.useEffect(() => {
    if (query) {
      client
        .query({
          query: gql`
            ${query}
          `,
        })
        .then(({ data }) => setData(data))
        .catch((err) => console.error(err))
    }
  }, [client, query])

  return { client, data, gql }
}
