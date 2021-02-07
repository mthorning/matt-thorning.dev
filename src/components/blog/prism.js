import React, { useState } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import darkTheme from 'prism-react-renderer/themes/vsDark'
import lightTheme from 'prism-react-renderer/themes/github'
import { css } from '@emotion/react'
import { useTheme } from 'utils'
import Toggle from '../Toggle'

function ToggleThing({ onToggle, initialChecked, text }) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        margin: 0 8px;
      `}
    >
      <em
        css={css`
          font-size: 17px;
          margin-right: 5px;
        `}
      >
        {text}
      </em>
      <Toggle {...{ onToggle, initialChecked }} />
    </div>
  )
}

function LineNumber({ lineNumber }) {
  const style = css`
    display: inline-block;
    width: 25px;
    font-size: 15px;
    color: rgb(120, 120, 120);
  `
  return <span css={style}>{lineNumber}</span>
}

function Line(props) {
  const { line, options, lineNumber, getTokenProps, showDiff, ...rest } = props

  // lineContent is only used to work out if it is
  // a diff line.
  const lineContent = line
    .map((l) => l.content)
    .join('')
    .trim()

  const lineDiffType = lineContent.startsWith('-')
    ? 'removed'
    : lineContent.startsWith('+')
    ? 'added'
    : null

  // Add the bg color to the row if it is a diff
  const style = css`
    width: fit-content;
    padding: 0 12px 0 12px;
    ${lineDiffType === 'removed' &&
    `
        background: #cc353561;
    `}
    ${lineDiffType === 'added' &&
    showDiff &&
    `
        background: #13bf1359;
    `}
  `
  // Only show removed lines in diffs
  if (lineDiffType === 'removed' && !showDiff) return null

  const idx = line.findIndex(
    ({ content }) => content === '-' || content === '+'
  )

  // Add 2 spaces to start of lines without symbols
  const lineToRender =
    showDiff && !lineDiffType
      ? [
          {
            types: ['plain'],
            content: '  ',
          },
          ...line,
        ]
      : showDiff && !!lineDiffType
      ? [
          ...line.slice(0, idx + 1),
          { types: ['plain'], content: ' ' },
          ...line.slice(idx + 1),
        ]
      : !showDiff && !!lineDiffType
      ? [...line.slice(2)]
      : line

  return (
    <div {...rest} css={style}>
      {options && options.numberLines && <LineNumber {...{ lineNumber }} />}
      {lineToRender.map((token, key) => {
        const lineProps = getTokenProps({ token, key })

        // This makes the plus/minus symbol red/green
        if (key < 2 && lineProps.children === '-' && lineDiffType === 'removed')
          lineProps.style = { fontWeight: 'bold', color: 'red' }
        if (
          key < 2 &&
          lineProps.children === '+' &&
          lineDiffType === 'added' &&
          showDiff
        )
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
      .map((s) => s.trim())
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

  const [wrapText, setWrapText] = useState(true)
  const textOverflow = css`
    ${wrapText
      ? `
    word-break: break-all;
    white-space: pre-wrap;
    `
      : `
    overflow-x: scroll;
    `}
  `
  const hasDiffLines = children.match(/^[+-]\s/gm)
  const [showDiff, setShowDiff] = useState(hasDiffLines)
  const [className, options] = splitClass(props.className, props.metastring)

  const matches = className.match(/language-(?<lang>.*)/)
  const lang = matches && matches.groups && matches.groups.lang

  const { theme } = useTheme()

  return (
    <Highlight
      {...defaultProps}
      theme={theme === 'light' ? lightTheme : darkTheme}
      code={children}
      language={lang ? lang : undefined}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        // This removes the empty line at the bottom
        tokens = tokens.slice(0, tokens.length - 1)
        return (
          <>
            <div
              css={css`
                display: flex;
                justify-content: flex-end;
                align-items: baseline;
                margin-bottom: -10px;
              `}
            >
              {hasDiffLines && (
                <ToggleThing
                  initialChecked
                  onToggle={(checked) => setShowDiff(hasDiffLines && checked)}
                  text="Show Diff"
                />
              )}
              <ToggleThing
                initialChecked
                onToggle={setWrapText}
                text="Wrap Text"
              />
            </div>
            <pre
              className={className}
              css={css`
                ${style}
                border-radius: 10px;
                padding: 12px 0 12px;
                ${textOverflow}
              `}
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
                      showDiff,
                      getTokenProps,
                      line,
                      options,
                    }}
                  />
                )
              })}
            </pre>
          </>
        )
      }}
    </Highlight>
  )
}
