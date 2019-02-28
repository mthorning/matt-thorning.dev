import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import theme from './src/theme'
import('prismjs/themes/prism-tomorrow.css')
import('layouts/main.css')
import('prismjs/plugins/line-numbers/prism-line-numbers.css')

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>
}
