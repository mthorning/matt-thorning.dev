import React, { useEffect, useState } from 'react'
import { css } from '@emotion/core'
import { a11yButton } from 'utils'

const switchStyle = checked => css`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    transition: all 0.3s;
    cursor: pointer;
  }
  &::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: var(--secondaryColor);
    top: 1px;
    left: ${checked ? '20px' : '1px'};
    transition: all 0.3s;
  }
`

export default function Toggle({ onToggle, initialChecked }) {
  const [checked, setChecked] = useState(initialChecked)

  const clickHandler = () => setChecked(c => !c)

  useEffect(() => onToggle(checked), [checked])

  return <div {...a11yButton(clickHandler)} css={switchStyle(checked)}></div>
}

Toggle.defaultProps = {
  onToggle: () => {},
}
