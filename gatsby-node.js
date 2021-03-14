const path = require('path')
const { gql, GraphQLClient } = require('graphql-request')
require('dotenv').config()

const gqlClient = new GraphQLClient(`${process.env.GATSBY_API_URL}/graphql`, {
  headers: {
    'UI-Environment': process.env.NODE_ENV,
    Authorization: `Basic ${process.env.API_TOKEN}`,
  },
})

const mutation = gql`
  mutation($data: [UpdateArticle]!) {
    updateArticles(data: $data)
  }
`

async function updateDB(posts) {
  const variables = {
    data: posts.map(({ node: { frontmatter, id: _, ...rest } }) => ({
      id: frontmatter.slug.replace('/blog/', ''),
      ...frontmatter,
      ...rest,
    })),
  }

  return gqlClient.request(mutation, variables).catch((err) => {
    console.error(`Error updating DB: ${err}`)
    process.exit(1)
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      blogPosts: allMdx(
        filter: { frontmatter: { type: { eq: "blog" }${
          process.env.NODE_ENV !== 'development'
            ? ', published: { eq: true }'
            : ''
        } } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
          timeToRead
          excerpt(pruneLength: 250)
            frontmatter {
              title
              slug
              published
              date
              tags
            }
          }
        }
      }
      pages: allMdx(
      filter: { frontmatter: { type: { eq: "page" }${
        process.env.NODE_ENV !== 'development'
          ? ', published: { eq: true }'
          : ''
      } }}) {
        edges {
          node {
            id
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild('  ERROR: Loading "createPages" query')
  }
  const pages = result.data.pages.edges
  const posts = result.data.blogPosts.edges

  const { NODE_ENV, UPDATE_DB } = process.env
  if (NODE_ENV === 'production' || UPDATE_DB) {
    const activity = reporter.activityTimer('Updated Database')
    activity.start()
    await updateDB(posts)
    activity.end()
  }

  pages.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: path.resolve(`src/components/page.js`),
      context: { id: node.id },
    })
  })

  posts.forEach(({ node }, index) => {
    //sorted by desc so these need to be reversed
    const previous =
      index < posts.length - 1
        ? posts[index + 1].node.frontmatter
        : posts[0].node.frontmatter

    const next =
      index > 0
        ? posts[index - 1].node.frontmatter
        : posts[posts.length - 1].node.frontmatter

    createPage({
      path: node.frontmatter.slug,
      component: path.resolve(`src/components/blog/blog-post.js`),
      context: { id: node.id, previous, next },
    })
  })
}
