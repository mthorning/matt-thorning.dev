import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import { css } from '@emotion/core'

function LineNumber({ lineNumber }) {
  const style = css`
    display: inline-block;
    width: 30px;
    font-size: 15px;
    color: rgb(120, 120, 120);
  `
  return <span css={style}>{lineNumber}</span>
}

function Line(props) {
  const { line, options, lineNumber, getTokenProps, ...rest } = props

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
    width: fit-content;
    padding: 0 12px 0 12px;
    ${diff === 'removed' &&
      `
        .token {
            color: #c24848 !important;
        }
        background: #250606;
    `}
    ${diff === 'added' &&
      `
        background: #13bf1359;
        box-shadow: 4px 4px 1px #000;

    `}
  `

  return (
    <div {...rest} css={style}>
      {options && options.numberLines && <LineNumber {...{ lineNumber }} />}
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

// Meta becomes options
function getMeta(classParts, metastring) {
  // If no space between lang and { numberLines }
  if (classParts.length === 2) {
    const metaParts = `${classParts[1]}${metastring}`.split(':')
    return { [metaParts[0]]: metaParts[1].replace('}', '') }
  }
  // If metastring but not className
  if (metastring) {
    const metaParts = metastring
      .replace('{', '')
      .replace('}', '')
      .split(':')
      .map(s => s.trim())
    return { [metaParts[0]]: metaParts[1] }
  }
  return []
}

// splits the language from the options object
function splitClass(classname, metastring) {
  if (classname === undefined) return ['']
  const classParts = classname.split('{')
  const className = classParts[0]
  const meta = getMeta(classParts, metastring)

  return [className, meta]
}

export default function Prism({ children: { props } }) {
  const { children } = props
  const [className, options] = splitClass(props.className, props.metastring)

  const matches = className.match(/language-(?<lang>.*)/)
  const lang = matches && matches.groups && matches.groups.lang

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children}
      language={lang ? lang : undefined}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        // This removes the empty line at the bottom
        tokens = tokens.slice(0, tokens.length - 1)
        return (
          <pre
            className={className}
            css={[
              style,
              css`
                border-radius: 10px;
                padding: 12px 0 12px;
                overflow-y: auto;
              `,
            ]}
          >
            {tokens.map((line, key) => {
              let lineNumber
              if (options && options.hasOwnProperty('numberLines')) {
                lineNumber =
                  // Quite proud of this!
                  // eg. value is either 'true' or '4'
                  // Number('4') == 4 || 4 == '4'
                  // Number('true') === 'NaN' || 'NaN' != 'true'

                  // eslint-disable-next-line
                  Number(options.numberLines) == options.numberLines
                    ? key + Number(options.numberLines)
                    : key + 1
              }
              return (
                <Line
                  {...{
                    ...getLineProps({ line, key }),
                    lineNumber,
                    getTokenProps,
                    line,
                    options,
                  }}
                />
              )
            })}
          </pre>
        )
      }}
    </Highlight>
  )
}
