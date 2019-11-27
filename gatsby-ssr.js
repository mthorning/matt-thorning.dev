import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import { theme, global } from './src/styles'

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      {element}
    </ThemeProvider>
  )
}
