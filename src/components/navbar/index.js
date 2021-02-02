import React, { useState, useMemo, useEffect } from 'react'
import { useLocation } from '@reach/router'
import { StaticQuery, graphql } from 'gatsby'
import DesktopMenu from './desktop-menu'
import MobileMenu from './mobile-menu'

function useRightMenu() {
  const [showMobile, setShowMobile] = useState(false)

  const onMediaQueryChange = ({ matches }) => setShowMobile(matches)
  const win = typeof window === 'undefined' ? undefined : window

  const mediaQuery = useMemo(() => {
    const mq = win && win.matchMedia('(max-width: 800px)')
    if (mq) {
      onMediaQueryChange(mq)
      mq.addListener(onMediaQueryChange)
    }
    return mq
  }, [win])

  if (showMobile) return (props) => <MobileMenu {...props} />
  return (props) => <DesktopMenu {...props} />
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
