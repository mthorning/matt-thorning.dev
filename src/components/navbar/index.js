import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { wrapper, innerWrapper, themeToggle, titleWrapper } from './style'
import ThemeToggle from '../theme-toggle'

const Menu = ({ data }) => {
  const items = [
    ...data.site.siteMetadata.menuItems,
    ...data.allMdx.edges.map(({ node: { frontmatter } }) => frontmatter),
  ]

  return (
    <ul>
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
        <div css={wrapper}>
          <div css={innerWrapper}>
            <Menu data={data} />
            <div css={themeToggle}>
              <ThemeToggle />
            </div>
            <div css={titleWrapper}></div>
          </div>
        </div>
      )}
    />
  )
}
