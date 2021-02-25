import React, { useMemo } from 'react'
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

  const lineDiffType = useMemo(() => {
    const lineContent = line
      .map((l) => l.content)
      .join('')
      .trim()

    return lineContent.startsWith('-')
      ? 'removed'
      : lineContent.startsWith('+')
      ? 'added'
      : null
  }, [line])

  // Add the bg color to the row if it is a diff
  const style = useMemo(
    () => css`
      width: fit-content;
      padding: 0 12px 0 12px;
      ${lineDiffType === 'removed'
        ? showDiff
          ? 'background: #cc353561;'
          : 'display: none;'
        : ''}
      ${lineDiffType === 'added' &&
      showDiff &&
      `
        background: #13bf1359;
    `}
      .hideIfNotDiff {
        display: ${showDiff ? 'inline' : 'none'};
      }
    `,
    [lineDiffType, showDiff]
  )

  const lineToRender = ((lineDiffType, line) => {
    const idx = line.findIndex(
      ({ content, types }) =>
        content === '-' || (content === '+' && types.push('hideIfNotDiff'))
    )

    switch (true) {
      case !lineDiffType:
        return [
          {
            types: ['plain', 'hideIfNotDiff'],
            content: '  ',
          },
          ...line,
        ]
      case !!lineDiffType:
        return [
          ...line.slice(0, idx + 1),
          { types: ['plain', 'hideIfNotDiff'], content: ' ' },
          ...line.slice(idx + 1),
        ]
      default:
        return line
    }
  })(lineDiffType, line)

  return (
    <div {...rest} css={style}>
      {options && options.numberLines && <LineNumber {...{ lineNumber }} />}
      {lineToRender.map((token, key) => {
        const lineProps = getTokenProps({ token, key })
        // This makes the plus/minus symbol red/green
        if (key < 2 && lineProps.children === '-' && lineDiffType === 'removed')
          lineProps.style = { fontWeight: 'bold', color: 'red' }
        if (key < 2 && lineProps.children === '+' && lineDiffType === 'added')
          lineProps.style = { fontWeight: 'bold', color: 'green' }

        return <span {...lineProps} />
      })}
    </div>
  )
}
