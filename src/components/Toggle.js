import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { a11yButton } from 'utils'

const toggle = (checked, transitionSpeed) => css`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  box-shadow: inset 1px 1px 4px #6e6e6e;
  background-color: #a5a3a3;
  border-radius: 20px;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #808080;
    background: linear-gradient(0.35turn, #808080, #d2d8cd, #808080);
    box-shadow: 1px 1px 4px #000;
    top: 2px;
    left: ${checked ? '20px' : '1px'};
    transition: all ${transitionSpeed}ms;
  }
`
export const ControlledToggle = ({
  clickHandler,
  checked,
  transitionSpeed,
}) => (
  <div {...a11yButton(clickHandler)} css={toggle(checked, transitionSpeed)} />
)

export default function Toggle({ onToggle, initialChecked, transitionSpeed }) {
  const [checked, setChecked] = useState(initialChecked)

  const clickHandler = () => setChecked((c) => !c)

  useEffect(() => onToggle(checked), [onToggle, checked])

  return <ControlledToggle {...{ clickHandler, checked, transitionSpeed }} />
}

ControlledToggle.defaultProps = {
  transitionSpeed: 500,
}
