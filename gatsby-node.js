const path = require('path')
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/components/blog-post.js`)
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            frontmatter {
              date
              path
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    const posts = result.data.allMarkdownRemark.edges
    posts.forEach((post, i) => {
      //sorted by desc so these need to be reversed
      const previous =
        i < posts.length - 1
          ? posts[i + 1].node.frontmatter
          : posts[0].node.frontmatter

      const next =
        i > 0
          ? posts[i - 1].node.frontmatter
          : posts[posts.length - 1].node.frontmatter

      createPage({
        path: post.node.frontmatter.path,
        component: blogPostTemplate,
        context: { previous, next },
      })
    })
  })
}
