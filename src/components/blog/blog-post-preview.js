import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { orangeLink } from 'constants'
import { BlogInfo } from 'components/blog'
import { css } from '@emotion/core'
import { TagDisplay } from 'components/tags'

const propTypes = {
  post: PropTypes.object.isRequired,
}

function BlogPostPreview({ post }) {
  return (
    <div>
      <BlogInfo
        css={css`
          margin-bottom: 20px;
        `}
        post={post}
      >
        <h1>
          <Link css={orangeLink} to={post.frontmatter.path}>
            {post.frontmatter.title}
          </Link>
        </h1>
      </BlogInfo>
      <TagDisplay tags={post.frontmatter.tags} />
      <p>{post.excerpt}</p>
    </div>
  )
}

BlogPostPreview.propTypes = propTypes
export default BlogPostPreview
