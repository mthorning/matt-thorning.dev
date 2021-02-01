import React from 'react'
import { useLocation } from '@reach/router'
import { StaticQuery, graphql } from 'gatsby'
import DesktopMenu from './desktop-menu'
import MobileMenu from './mobile-menu'

export default function Navbar({ className }) {
  const { pathname } = useLocation()
  const pathRegex = new RegExp(`^/${pathname.split('/')[1]}(/.*)?$`)

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
      render={(data) => {
        const menuItems = [
          ...data.site.siteMetadata.menuItems,
          ...data.allMdx.edges.map(({ node: { frontmatter } }) => frontmatter),
        ]
        return <MobileMenu {...{ menuItems, pathRegex, className }} />
      }}
    />
  )
}
