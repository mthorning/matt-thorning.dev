const path = require('path')
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
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
  const posts = result.data.allMdx.edges
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
