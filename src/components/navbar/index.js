import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import * as styles from './styles'
import ThemeToggle from '../theme-toggle'

const Menu = ({ data }) => {
  const items = [
    ...data.site.siteMetadata.menuItems,
    ...data.allMdx.edges.map(({ node: { frontmatter } }) => frontmatter),
  ]

  return (
    <ul css={styles.menu}>
      {items.map(({ title, slug }) => (
        <li>
          <a href={slug}>{title}</a>
        </li>
      ))}
    </ul>
  )
}
export default function Navbar() {
  return (
    <StaticQuery
      query={graphql`
        query NavbarQuery {
          allMdx(filter: { frontmatter: { type: { eq: "page" } } }) {
            edges {
              node {
                frontmatter {
                  title
                  slug
                }
              }
            }
          }
          site {
            siteMetadata {
              menuItems {
                title
                slug
              }
            }
          }
        }
      `}
      render={(data) => (
        <nav css={styles.nav}>
          <Menu data={data} />
          <div css={styles.themeToggle}>
            <ThemeToggle />
          </div>
        </nav>
      )}
    />
  )
}
