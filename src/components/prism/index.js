import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import darkTheme from 'prism-react-renderer/themes/vsDark'
import { InView } from 'react-intersection-observer'
import lightTheme from 'prism-react-renderer/themes/github'
import { css } from '@emotion/react'
import { useTheme } from 'utils'
import { OptionsToggle, usePrismOptions } from './options'
import Line from './Line'

export * from './options'

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

  const { wrapText, showDiff } = usePrismOptions()
  const hasDiffLines = children.match(/^[+-]\s/gm)

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
  const [className, options] = splitClass(props.className, props.metastring)

  const matches = className.match(/language-(?<lang>.*)/)
  const lang = matches && matches.groups && matches.groups.lang

  const { theme } = useTheme()

  return (
    <InView>
      {({ inView, ref }) => (
        <div ref={ref}>
          {inView ? (
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
                  <pre
                    className={className}
                    css={css`
                      ${style}
                      border-radius: 10px;
                      padding: 12px 0 12px;
                      ${textOverflow}
                    `}
                  >
                    <div
                      css={css`
                        display: flex;
                        justify-content: flex-end;
                        align-items: baseline;
                        margin-bottom: 12px;
                        padding: 0 4px;
                        color: var(--color);
                      `}
                    >
                      {hasDiffLines && (
                        <OptionsToggle
                          text="Show Diff"
                          optionKey="showDiff"
                          condition={hasDiffLines}
                        />
                      )}
                      <OptionsToggle text="Wrap Text" optionKey="wrapText" />
                    </div>
                    {tokens.map((line, key) => {
                      let lineNumber
                      if (options && options.hasOwnProperty('numberLines')) {
                        lineNumber =
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
                )
              }}
            </Highlight>
          ) : null}
        </div>
      )}
    </InView>
  )
}
