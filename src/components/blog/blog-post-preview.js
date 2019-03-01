import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { BlogInfo } from 'components/blog'
import { TagDisplay } from 'components/tags'

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
      <TagDisplay tags={post.frontmatter.tags} />
      <p>{post.excerpt}</p>
    </div>
  )
}

BlogPostPreview.propTypes = propTypes
export default BlogPostPreview
