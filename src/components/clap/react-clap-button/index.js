import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'
import ClapWrap from './components/ClapWrap'
import ClapIcon from './components/ClapIcon'
import ClapButton from './components/ClapButton'
import ClapCount from './components/ClapCount'
import ClapCountTotal from './components/ClapCountTotal'
import mojs from 'mo-js'

const defaultTheme = {
  textColor: 'rgba(0, 0, 0, 0.2)',
  secondaryColor: '#fc4445',
  bg: '#fff',
  size: 70,
}

const Clap = class extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    countTotal: PropTypes.number.isRequired,
    incrementCount: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isClicked: false,
      isHover: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const tlDuration = 300
    const triangleBurst = new mojs.Burst({
      parent: '#clap',
      radius: { 50: 95 },
      count: 5,
      angle: 30,
      children: {
        shape: 'polygon',
        radius: { 6: 0 },
        scale: 1,
        stroke: 'rgba(211,84,0 ,0.5)',
        strokeWidth: 2,
        angle: 210,
        delay: 30,
        speed: 0.2,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: tlDuration,
      },
    })

    const circleBurst = new mojs.Burst({
      parent: '#clap',
      radius: { 50: 75 },
      angle: 25,
      duration: tlDuration,
      children: {
        shape: 'circle',
        fill: 'rgba(149,165,166 ,0.5)',
        delay: 30,
        speed: 0.2,
        radius: { 3: 0 },
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      },
    })

    const countAnimation = new mojs.Html({
      el: '#clap--count',
      isShowStart: false,
      isShowEnd: true,
      y: { 0: -30 },
      opacity: { 0: 1 },
      duration: tlDuration,
    }).then({
      opacity: { 1: 0 },
      y: -80,
      delay: tlDuration / 2,
    })

    const opacityStart = this.props.count > 0 ? 1 : 0

    const countTotalAnimation = new mojs.Html({
      el: '#clap--count-total',
      isShowStart: false,
      isShowEnd: true,
      opacity: { [opacityStart]: 1 },
      delay: (3 * tlDuration) / 2,
      duration: tlDuration,
      y: { 0: -3 },
    })

    const scaleButton = new mojs.Html({
      el: '#clap',
      duration: tlDuration,
      scale: { 1.3: 1 },
      easing: mojs.easing.out,
    })

    const clap = document.getElementById('clap')
    clap.style.transform = 'scale(1, 1)'
    this.animationTimeline = new mojs.Timeline()
    this.animationTimeline.add([
      countAnimation,
      countTotalAnimation,
      scaleButton,
      circleBurst,
      triangleBurst,
    ])
  }

  getTheme() {
    const { theme = {} } = this.props
    return Object.assign({}, defaultTheme, theme)
  }

  handleClick() {
    this.animationTimeline.replay()
    this.props.incrementCount()

    this.setState({ isClicked: true })
  }

  render() {
    const { isClicked, isHover } = this.state
    const { count, countTotal, iconComponent: ClapIcon } = this.props

    return (
      <ThemeProvider theme={this.getTheme()}>
        <ClapWrap isClicked={isClicked}>
          <ClapButton
            id="clap"
            onClick={this.handleClick}
            onMouseEnter={e => this.setState({ isHover: true })}
            onMouseLeave={e => this.setState({ isHover: false })}
            isHover={isHover && count === 0}
          >
            <ClapIcon id="clap--icon" isClicked={isClicked} />
            <ClapCount id="clap--count">+{count}</ClapCount>
            <ClapCountTotal id="clap--count-total">
              {Number(countTotal).toLocaleString()}
            </ClapCountTotal>
          </ClapButton>
        </ClapWrap>
      </ThemeProvider>
    )
  }
}

Clap.defaultProps = {
  countTotal: 0,
  count: 0,
  isClicked: false,
  iconComponent: ClapIcon,
}

export default Clap
