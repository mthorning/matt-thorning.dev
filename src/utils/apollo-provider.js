import React from 'react'
import {
  ApolloProvider as Provider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'

const uri =
  typeof window !== 'undefined' ? `${window.location.origin}/api/graphql` : ''

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          articles: {
            keyArgs: ['orderBy', 'unpublished', 'selectedTags'],
            merge(existing = {}, incoming) {
              return {
                ...incoming,
                edges: [...(existing?.edges ?? []), ...incoming.edges],
              }
            },
          },
        },
      },
    },
  }),
  headers: {
    'UI-Environment': 'development',
  },
})

export function ApolloProvider({ children }) {
  return <Provider client={client}>{children}</Provider>
}
