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
  const {
    line,
    options,
    lineNumber,
    getTokenProps,
    showDiff,
    isIntersecting,
    ...rest
  } = props

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
      ${lineDiffType === 'removed' &&
      `
        background: #cc353561;
    `}
      ${lineDiffType === 'added' &&
      showDiff &&
      `
        background: #13bf1359;
    `}
    `,
    [lineDiffType, showDiff]
  )

  if (lineDiffType === 'removed' && !showDiff) return null

  // Add 2 spaces to start of lines without symbols
  const lineToRender = ((showDiff, lineDiffType, line, isIntersecting) => {
    if (!isIntersecting) return line
    const idx = line.findIndex(
      ({ content }) => content === '-' || content === '+'
    )

    switch (true) {
      case showDiff && !lineDiffType:
        return [
          {
            types: ['plain'],
            content: '  ',
          },
          ...line,
        ]
      case showDiff && !!lineDiffType:
        return [
          ...line.slice(0, idx + 1),
          { types: ['plain'], content: ' ' },
          ...line.slice(idx + 1),
        ]
      case !showDiff && !!lineDiffType:
        return [...line.slice(2)]
      default:
        return line
    }
  })(showDiff, lineDiffType, line, isIntersecting)

  return (
    <div {...rest} css={style}>
      {options && options.numberLines && <LineNumber {...{ lineNumber }} />}
      {lineToRender.map((token, key) => {
        const lineProps = getTokenProps({ token, key })
        if (isIntersecting) {
          // This makes the plus/minus symbol red/green
          if (
            key < 2 &&
            lineProps.children === '-' &&
            lineDiffType === 'removed'
          )
            lineProps.style = { fontWeight: 'bold', color: 'red' }
          if (
            key < 2 &&
            lineProps.children === '+' &&
            lineDiffType === 'added' &&
            showDiff
          )
            lineProps.style = { fontWeight: 'bold', color: 'green' }
        }

        return <span {...lineProps} />
      })}
    </div>
  )
}
