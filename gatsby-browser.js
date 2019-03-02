import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import { theme, global } from './src/styles'
import('prismjs/themes/prism-tomorrow.css')
import('prismjs/plugins/line-numbers/prism-line-numbers.css')

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      {element}
    </ThemeProvider>
  )
}
