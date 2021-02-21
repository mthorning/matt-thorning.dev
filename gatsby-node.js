const path = require('path')
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
            frontmatter {
              title
              slug
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
