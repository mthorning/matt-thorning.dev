import React from 'react'
import { ThemeProvider, Global } from '@emotion/react'
import { theme, global } from './src/styles'

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      {element}
    </ThemeProvider>
  )
}
