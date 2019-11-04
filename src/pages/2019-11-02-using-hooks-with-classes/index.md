---
slug: '/using-hooks-with-classes'
date: '2019-11-02T17:00:00'
title: 'Using React Hooks with Class Components'
tags: ['javascript', 'react', 'frontend']
---

Writing hooks is fun and they're a great way of creating reusable chunks of logic which can be easily used across multiple components. The only downside to them is that they only work with functional components. If you have a codebase which was written before hooks then either you opt to rewrite all of your components as functions (this might not make you very popular!) or you need to be able to make any hooks you write work with _all_ of your components.

In this post I would like to share a couple of techniques which can be used to inject the data from a hook into a class, they are known as "render props" and "higher order components".

## Render Props
"Render props" is the name given to a technique where a function is passed as a prop to a component (typically called 'render', hence the name) which is called with some state that is then accessible to the components returned by the function. Here's a quick example to make things clearer than whatever that sentence meant:

```js
function SayHello(props) {
  const helloTo = 'Code';
  return props.render(helloTo);
}

function Greet() {
  return (
    <SayHello render={helloTo => (
      <p>Hello {helloTo}</p>
    )} />
  );
}
```
The `SayHello` component has a function passed to it which returns a `<p>` tag with the innerHTML set to `"Hello Code"`. Using the technique this way has always felt a bit strange to me though, and since you can use any prop you like (it doesn't have to be `render`), I usually opt to use the `children` prop which allows us to rewrite the above like this:

```js
function Greet() {
  return (
    <SayHello> 
      {helloTo => (
        <p>Hello {helloTo}</p>
      )} 
    <SayHello />
  );
}
```
Now the `SayHello` component opens and closes around the other markup and I feel a little bit happier! It's entirely a matter of preference which method you choose, no way is more right than the other.

Let's now make use of this technique to use the state from a hook in class component. First I'll write the component as I would like to have used it; **this won't work!**
```js
class ShowApiData extends React.Component {
  render() {
    // This doesn't work:
    const [data, error, loading] = useApiData('/api/results');
    
    if(loading) {
      return <Spinner />;
    }

    if(error) {
      return <ErrorPage error={error} />
    }

    return <Table data={data} />;
  }
}
```

Instead we need to create a new component which _can_ use our hook and then use that in the `ShowApiData` component:

```js
function ProvideApiData({ children }) {
    const [data, error, loading] = useApiData('/api/results');
    return children({ data, error, loading });
}

class ShowApiData extends React.Component {
  render() {
    return (
      <ProvideApiData>
        {({ data, error, loading }) => {
          if(loading) {
            return <Spinner />;
          }
       
          if(error) {
            return <ErrorPage error={error} />
          }
       
          return <Table data={data} />;
        }}
      </ProvideApiData>
    ); 
  }
}
```
This works in the same as way as our examples above, by including the new `ProvideApiData` component and passing a function which returns the logic we were first attempting to return from render, we can now provide the state that we want from the `useApiData` hook. I like to leave the new component in situ above the original component for readability but if you need to use it in a lot of places then it makes sense to keep it with the hook itself as a named export.

## Higher Order Components
The main problem with the render props method is that everything needs to happen in the render method of your class. This can be a bit limiting if, say, you want something to happen when a button is pressed or in one of the lifecycle hooks. Higher Order Components are more flexible than render props, they are described as an advanced React technique but I think this makes them sound more confusing than they are. 

A Higher Order Component is a function which you call with a component as an argument. This function returns a new component which wraps the component you passed in, your original component is now the child of the new component. The new component can perform some functionality, hold some state or own some methods which can all be passed to the original component as props. Let's start with a simple one again before using it with a hook:

```js
function withHello(Component) {
  return function() {
    const helloTo = 'Code';
    return <Component helloTo={helloTo} />;
  }
}

function Greet({ helloTo }) {
  return (
      <p>Hello {helloTo}</p>
  );
}

export default withHello(Greet);
```
This time I have included the export in the example because this is normally where I would wrap the component. The `Greet` component is passed to `withHello` which returns a new component with `Greet` as it's child with the `helloTo` variable passed down to it as a prop.

