---
path: '/css-in-js-2'
date: '2019-03-02T10:00:00'
title: 'CSS in JS (part 2)'
tags: ['javascript', 'css', 'tooling']
---

In my [last blog post](/css-in-js) I wrote about how I had started using [Emotion](https://github.com/emotion-js/emotion) instead of Sass. I initially started off by using Emotion's framework-agnostic package, I have now switched to using the version which they created specifically for use with React.

This version allows you to apply styles to your elements through a `css` prop instead of the `className` prop. To enable your project to do this you need to make some changes to you Babel settings.

## Babel
There are two methods available. The quickest way is to import Emotion's `jsx` function at the top of your file and include a [JSX Pragma](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#pragma) on the line above.
```jsx
/** @jsx jsx */
import { jsx } from '@emotion/core'
```

The pragma (which is the bit in comments) tells Babel to use Emotion's `jsx` function in place of React's _createElement_. With these lines in your imports you will be able to use the `css` prop anywhere in your file that you may have previously used `className`. This is a good solution if you just want to try it out or if you don't have access to your Babel settings, it is a bit of a pain having to do this in every file though so if possible I recommend adding it to your _.babelrc_ or _babel.config.js_ like so:
```json
{
  "presets": ["@emotion/babel-preset-css-prop"]
}
```

If you're using Gatsby like I am for this site there is a [plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-emotion/) you can use. Once you've set up the Babel preset you no longer need to include the pragma or import the `jsx` function at the top of your files, every component in you codebase will now be able to use the `css` prop.

## The css prop

The `css` prop accepts your styles in several ways which gives you some added flexibility when writing your components. It will accept object styles:
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
Unlike with the `css` function in the framework-agnostic version, _this_ `css` function does not return a computed class name string, it returns an object which Emotion understands and as such can be composed with other emotion based styles.

You can also pass an array of styles to the `css` prop. The styles are applied left-to-right with any duplicated styles being overridden:
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
This is pretty cool because it means you can apply styles dynamically:

