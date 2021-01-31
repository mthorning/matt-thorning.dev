import React from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import { StaticQuery, graphql } from 'gatsby'
import * as styles from './styles'

const Menu = ({ data }) => {
  const { pathname } = useLocation()
  const re = new RegExp(`^\\/${pathname.split('/')[1]}(\/.*)?$`)

  const items = [
    ...data.site.siteMetadata.menuItems,
    ...data.allMdx.edges.map(({ node: { frontmatter } }) => frontmatter),
  ]
  return (
    <ul css={styles.menu}>
      {items.map(({ title, slug }) => (
        <li key={slug}>
          {(() => console.log(pathname, slug, re, re.test(slug)))()}
          <Link className={re.test(slug) ? 'active' : ''} to={slug}>
            {title}
          </Link>
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
        </nav>
      )}
    />
  )
}
