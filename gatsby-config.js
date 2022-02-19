const { createProxyMiddleware } = require('http-proxy-middleware')
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

if (!process.env.GATSBY_API_URL) {
  throw new Error('You need to add the .env.(development|production) file!!')
}

module.exports = {
  developMiddleware: (app) => {
    app.use(
      '/api',
      createProxyMiddleware({
        target: process.env.GATSBY_API_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      })
    )
  },
  siteMetadata: {
    title: `Matt Thorning`,
    description: `Software developer.`,
    author: `Matt Thorning`,
    siteUrl: `https://matt-thorning.dev`,
    menuItems: [
      { title: 'home', slug: '/', order: 1 },
      { title: 'blog', slug: '/blog', order: 20 },
    ],
  },
  plugins: [
    'gatsby-plugin-dark-mode',
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          components: 'src/components',
          utils: 'src/utils',
          layouts: 'src/layouts',
          pages: 'src/pages',
          mdx: 'src/mdx-components',
        },
        extensions: ['js'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown`,
        name: 'markdown',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Matt Thorning`,
        short_name: `MT`,
        start_url: `/`,
        background_color: `#218bf8`,
        theme_color: `#218bf8`,
        display: `standalone`,
        icon: `src/images/logo.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              isIconAfterHeader: true,
              elements: [`h2`],
            },
          },
          `gatsby-remark-emoji-unicode`,
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 960,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://matt-thorning.dev`,
        stripQueryString: true,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['JetBrains Mono', 'Montserrat'],
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
            {
              allMdx(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    body
                    frontmatter {
                      title
		      slug
                      date
                    }
                  }
                }
              }
            }
          `,
            output: '/rss.xml',
            title: 'matt-thorning.dev RSS Feed',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-anchor-links',
      options: {
        stripHash: true,
        offset: -44,
      },
    },
  ],
}
