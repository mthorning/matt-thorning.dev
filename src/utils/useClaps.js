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
  const variables = { articleId }
  const { data } = useQuery(GET_CLAPS, { variables })
  const claps = data?.claps
  const [mutator] = useMutation(ADD_CLAPS)

  const addClaps = (claps) => {
    mutator({
      variables: {
        ...variables,
        claps,
      },
      update(cache, { data: { claps } }) {
        cache.modify({
          fields: {
            claps() {
              return claps
            },
          },
        })
      },
    })
  }
  return [claps, addClaps]
}
