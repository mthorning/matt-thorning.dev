import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'

const shockwave = () => keyframes`
0%{
     box-shadow:0 0
 }
 70%{
     box-shadow:0 0 5px 10px rgba(255,255,255,0)
 }
 100%{
     box-shadow:0 0 0 0 rgba(255,255,255,0)
 }
`

const ClapButton = styled.button`
  position: relative;
  outline: 1px solid transparent;
  border-radius: 50%;
  transition: border 0.1s ease-in;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: 50%;
  }

  &:hover {
    cursor: pointer;
  }

  ${props =>
    props.isHover &&
    css`
      &::after {
        animation: ${shockwave()} 2s infinite;
      }
    `}

  ${({ theme: { size } }) => css`
    width: ${size}px;
    height: ${size}px;
    background: var(--bg);
    border: 1px solid var(--color);

    &::after {
      width: ${size - 1}px;
      height: ${size - 1}px;
      border-color: var(--color);
      color: var(--color);
      fill: var(--secondaryColor);
    }

    &:hover,
    &:focus {
      #clap--icon {
        fill: var(--linkHover);
      }
    }
  `}
`

export default ClapButton
