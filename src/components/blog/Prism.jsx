import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import { css } from '@emotion/core'

function Line(props) {
  const { line, getTokenProps, ...rest } = props

  // lineContent is only used to work out if it is
  // a diff line.
  const lineContent = line
    .map(l => l.content)
    .join('')
    .trim()

  const diff = lineContent.startsWith('-')
    ? 'removed'
    : lineContent.startsWith('+')
    ? 'added'
    : null

  // Add the bg color to the row if it is a diff
  const style = css`
    padding: 0 12px 0 12px;
    ${diff === 'removed' && 'background: #e11d1d29;'}
    ${diff === 'added' && 'background: #3c933c4a;'}
  `

  return (
    <div {...rest} css={style}>
      {line.map((token, key) => {
        const lineProps = getTokenProps({ token, key })

        // This makes the plus/minus symbol red/green
        if (key === 1 && diff === 'removed')
          lineProps.style = { fontWeight: 'bold', color: 'red' }
        if (key === 1 && diff === 'added')
          lineProps.style = { fontWeight: 'bold', color: 'green' }

        return <span {...lineProps} />
      })}
    </div>
  )
}

export default function Prism({ children: { props } }) {
  const { className = '', children, metastring } = props
  const matches = className.match(/language-(?<lang>.*)/)
  const lang = matches && matches.groups && matches.groups.lang
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children}
      //FIXME
      language={lang && lang !== '{' ? matches.groups.lang : ''}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <pre
            className={className}
            css={[
              style,
              css`
                border-radius: 10px;
                padding: 12px 0 12px;
              `,
            ]}
          >
            {tokens.map((line, key) => {
              // This removes the empty line at the bottom
              if (line.length === 1) return null
              return (
                <Line
                  {...{ ...getLineProps({ line, key }), getTokenProps, line }}
                />
              )
            })}
          </pre>
        )
      }}
    </Highlight>
  )
}
