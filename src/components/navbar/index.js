import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { useLocation } from '@reach/router'
import { StaticQuery, graphql } from 'gatsby'
import DesktopMenu from './desktop-menu'
import MobileMenu from './mobile-menu'

const queryString = '(max-width: 800px)'

function useRightMenu() {
  const [showMobile, setShowMobile] = useState(false)

  const onMediaQueryChange = ({ matches }) => setShowMobile(matches)
  const win = typeof window === 'undefined' ? undefined : window

  useEffect(() => {
    const mq = win && win.matchMedia(queryString)
    if (mq) {
      onMediaQueryChange(mq)
      mq.addEventListener('change', onMediaQueryChange)
    }
    return () => mq.removeEventListener('change', onMediaQueryChange)
  }, [win])

  if (showMobile) return (props) => <MobileMenu {...props} />
  return (props) => (
    <DesktopMenu
      css={css`
        @media ${queryString} {
          display: none;
        }
      `}
      {...props}
    />
  )
}

export default function Navbar({ className }) {
  const { pathname } = useLocation()
  const pathRegex = new RegExp(`^/${pathname.split('/')[1]}(/.*)?$`)

  const Menu = useRightMenu()

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

        return <Menu {...{ menuItems, pathRegex, className }} />
      }}
    />
  )
}
