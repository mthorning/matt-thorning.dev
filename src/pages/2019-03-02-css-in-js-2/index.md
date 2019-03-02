---
path: '/css-in-js-2'
date: '2019-03-02T10:00:00'
title: 'CSS in JS (part 2)'
tags: ['javascript', 'css', 'tooling']
---

In my [last blog post](/css-in-js) I wrote about how I had started using [Emotion](https://github.com/emotion-js/emotion) instead of Sass. I initially started off by using Emotion's framework-agnostic package but I have now switched to using the version which they created specifically for use with React because it adds some extra functionality which I liked the look of.

To enable your project to work with this package you need to make some changes to your Babel settings.

## Babel
There are two methods available for making your app work with _@emotion/core_. The quickest way is to import Emotion's `jsx` function at the top of your file and include a [JSX Pragma](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#pragma) on the line above it like so:
```jsx
/** @jsx jsx */
import { jsx } from '@emotion/core'
```

The pragma (which is the bit in comments) tells Babel to use Emotion's `jsx` function in place of React's _createElement_. With these lines in your imports you will be able to use the _css_ prop anywhere in your file that you may have previously used _className_. This is a good solution if you just want to try it out or if you don't have access to your Babel settings, it is a bit of a pain having to do this in every file though so if possible I recommend using the second method which is to add the Babel preset. This is easy to do, just install it with NPM and then include it in your _.babelrc_ or _babel.config.js_:
```json
{
  "presets": ["@emotion/babel-preset-css-prop"]
}
```

If you're using Gatsby, like I am for this site, there is a [plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-emotion/) you can use instead.

Once you've set up the Babel preset you no longer need to include the pragma or import the _jsx_ function at the top of your files, every component in you codebase will now be able to use the _css_ prop.

## The css prop

The _css_ prop accepts your styles in several ways which gives you some added flexibility when writing your components. 

It will accept object styles:
```jsx
const styles = {
  color: 'red',
  marginTop: '10px'
}

export default function HelloCode(props) {
  return <h1 css={styles}>Hello Code</h1>
}
```
And it accepts string styles which have been created with _@emotion/core_'s `css` function:
```jsx
import { css } from '@emotion/core'

const styles = css`
  color: red;
  margin-top: 10px;
`
export default function HelloCode(props) {
  return <h1 css={styles}>Hello Code</h1>
}
```
Unlike with the _css_ function in the framework-agnostic version, _this_ `css` function does not return a computed class name string; it returns an object which Emotion understands 'at a low level' and as such can be composed with other Emotion based styles.

You can also pass an array of styles to the `css` prop. The styles are applied left-to-right with any same rules being overridden:
```jsx
import { css } from '@emotion/core'

const blue = css`
  color: blue;
  margin-top: 10px;
`
const red = css`
  color: red;
`
export default function HelloCode(props) {
  return <h1 css={[blue, red]}>Hello Code</h1>
}
//Text will be red
```
This is great for controlling your styling through the logic of your component in a way that is familiar. In the example below I have used a reducer with React's `useReducer` and `useEffect` hooks to add a class to the component five seconds after the component mounts:
```jsx
import React, { useEffect, useReducer } from 'react'
import { baseStyle, animationStyle } from './style'

export default function Component() {

  const reducer = (state, action) => {
    switch (action.type) {
      case 'addClass':
        return {
          style: [...state.style, action.payload],
        }
      default:
        return state
    }
  }

  const initialState = {
    style: [baseStyle]
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  function animate() {
    setTimeout(() => {
      dispatch({
        type: 'addClass',
        payload: animationStyle,
      })
    }, 5000)
  }

  useEffect(() => {
    animate()
  }, [])

  return <h1 css={state.style}>Hello Code</h1>
}
```
---

## Applying styles across the codebase

I think it's good to keep you CSS styles scoped to your components, when writing React it doesn't make sense for your logic to be modular and your styling to be document-wide (in my opinion). However, it's still important to maintain consistency in the look of your application. Here are two options to help with this.

### The Global component

_@emotion/core_ provides a `Global` component which can be utilised to apply CSS rules globally to your site. It's used like this:
```jsx
import { Global, css } from '@emotion/core'

export default function Component() {
  return (
    <div>
      <Global
        styles={css`
          h1 {
            color: red;
          }
        `}
      />
      <h1>Hello Code</h1>
    </div>
  )
}
```
This is interesting because you can completely change the styling of your site just by rendering a `Global` component. One of React's strengths is that it makes conditionally rendering child components very easy, with the `Global` component you could very easily change the entire look of your site with the push of a button:
```jsx
import React, { useState } from 'react'
import { Global, css } from '@emotion/core'

const nightModeStyle = css`
  body {
    background: black;
  }
  h1 {
    color: white;
  }
`
export default function Component() {
  const [nightMode, setNightMode] = useState(false)

  return (
    <div>
      {nightMode && <Global styles={nightModeStyle} />}
      <button onClick={() => setNightMode(!nightMode)}>Night Mode</button>
      <h1>Hello Code</h1>
    </div>
  )
}
```
Slight disclaimer with this one, I haven't tried it; if you happen to try it and it doesn't work then let me know!

### Theming

With theming you can create a file of colors and settings that you want to use in all of your components. This is great for maintaining a consistent look and makes changing colours for branding a lot easier because you only need to change the values in one place instead of in every component.

If you want to use theming with Emotion then you wil first need to install it with NPM:
```
npm install emotion-theming --save-dev
```
_emotion-theming_ uses React's context API. First you need to wrap all of the components which you want to have access to the values in the `ThemeProvider` which takes your theme settings as a prop:
```jsx
import { render } from 'react-dom'
import App from './app'
import { ThemeProvider } from 'emotion-theming'

const theme = {
  primaryTextColor: 'red'
  h1TopMargin: '10px'
}

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
```
Now, let's take an example from earlier on but this time we'll get the values from the theme:
```jsx
import { css } from '@emotion/core'

const styles = theme => css`
  color: ${theme.primaryTextColor};
  margin-top: ${theme.h1TopMargin};
`
export default function HelloCode(props) {
  return <h1 css={styles}>Hello Code</h1>
}
```
The `css` prop also accepts a function which is called with the `theme` as an argument. because this is a JavaScript object it can be passed around as you would any other object. Here's another example from earlier:
```jsx
import { css } from '@emotion/core'

const blue = theme => css`
  color: blue;
  margin-top: ${theme.h1TopMargin};
`
const red = theme => css`
  color: ${theme.primaryTextColor};
`
export default function HelloCode(props) {
  return (
    <h1 css={theme => (
      [blue, red].map(style => style(theme))
    )}>
      Hello Code
    </h1>
  )
}
//Text will be red
```
Here we are passing the theme object to each function in the array using map. I'm sure you can see how powerful this can be; any `css` prop can very easily be turned into a function with access to everything in your theme object just by prepending it with `theme => `!
