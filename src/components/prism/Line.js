import React, { useLayoutEffect } from 'react'
import { css } from '@emotion/react'

function LineNumber({ lineNumber }) {
  const style = css`
    display: inline-block;
    width: 25px;
    font-size: 15px;
    color: rgb(120, 120, 120);
  `
  return <span css={style}>{lineNumber}</span>
}

export default function Line(props) {
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
