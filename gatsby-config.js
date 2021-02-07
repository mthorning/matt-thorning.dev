module.exports = {
  siteMetadata: {
    title: `Matt Thorning`,
    description: `Software developer.`,
    author: `Matt Thorning`,
    siteUrl: `https://blog.matt-thorning.dev`,
    menuItems: [
      { title: 'home', slug: '/' },
      { title: 'blog', slug: '/blog' },
    ],
  },
  plugins: [
    'gatsby-plugin-dark-mode',
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-emotion`,
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
        background_color: `#f82122`,
        theme_color: `#f82122`,
        display: `standalone`,
        icon: `src/images/logo.png`,
      },
    },
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
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-K2MBXCX',
        includeInDevelopment: false,
        defaultDataLayer: { platform: 'gatsby' },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-133286805-1',
        head: false,
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://blog.matt-thorning.dev`,
        stripQueryString: true,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Fira Code'],
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
