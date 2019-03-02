import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { BlogInfo } from 'components/blog'

const propTypes = {
  post: PropTypes.object.isRequired,
}

function BlogPostPreview({ post }) {
  return (
    <div css={{ marginTop: '40px' }}>
      <BlogInfo post={post}>
        <h1>
          <Link css={theme => theme.orangeLink} to={post.frontmatter.path}>
            {post.frontmatter.title}
          </Link>
        </h1>
      </BlogInfo>
      <p>{post.excerpt}</p>
    </div>
  )
}

BlogPostPreview.propTypes = propTypes
export default BlogPostPreview
