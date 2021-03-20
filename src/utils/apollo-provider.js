import React from 'react'
import {
  ApolloProvider as Provider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'

let client
if (typeof window !== 'undefined') {
  client = new ApolloClient({
    uri: `${window.location.origin}/api/graphql`,
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
}

export function ApolloProvider({ children }) {
  return <Provider client={client}>{children}</Provider>
}
