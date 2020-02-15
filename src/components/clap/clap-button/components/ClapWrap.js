import React from 'react'
import styled from '@emotion/styled'

const Wrap = styled.div`
  display: inline-block;
  position: relative;
  z-index: 1;
`

const ClapWrapChildren = styled.div`
  position: relative;
  z-index: 2;
`

export default class ClapWrap extends React.Component {
  render () {
    const { children } = this.props
    return (
      <Wrap>
        <ClapWrapChildren>{children}</ClapWrapChildren>
      </Wrap>
    )
  }
}
