import { useCallback } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'

const GET_CLAPS = gql`
  query($articleId: ID!) {
    claps(articleId: $articleId)
  }
`
const ADD_CLAPS = gql`
  mutation($articleId: ID!, $claps: Int!) {
    addClaps(articleId: $articleId, claps: $claps)
  }
`

export function useClaps(articleId) {
  const { data } = useQuery(GET_CLAPS, { variables: { articleId } })
  const claps = data?.claps
  const [mutator] = useMutation(ADD_CLAPS)

  const addClaps = useCallback(
    (claps) => {
      mutator({
        variables: {
          articleId,
          claps,
        },
        update(cache, { data: { claps } }) {
          cache.modify({
            fields: {
              claps() {
                return claps
              },
              articles(existingArticles = []) {
                const updatedArticles = existingArticles.edges.map((article) =>
                  article.articleId === articleId
                    ? { ...article, claps }
                    : article
                )
                return [updatedArticles]
              },
            },
          })
        },
      })
    },
    [mutator, articleId]
  )
  return [claps, addClaps]
}
