---
slug: '/react-object-components'
date: '2019-08-14T21:00:00'
title: 'React Object Components'
tags: ['javascript', 'react']
---

With the release of React Hooks I have seen a lot of posts comparing class components to function components. Function components are nothing new in React, however it was not possible before version 16.8.0 to create a stateful component with access to lifecycle hooks using only a function. Or was it?

Call me a pedant (many people already do!) but when we talk about class components we are actually (technically) talking about components created by functions. In this post I would like to use React to demonstrate what is actually happening when we write a class in JavaScript.

## Classes vs Functions

First, I would like to very briefly show how, what are commonly referred to as function and class components, relate to one another. Here's a simple component written as a class:
```js
class Hello extends React.Component {
  render() {
    return <p>Hello!</p>
  }
}
```
And here it is written as a function:
```js
function Hello() {
  return <p>Hello!</p>
}
```
Function components are just the render method from classes. Because of this they were never previously able to hold their own state or perform any side effects at points during their lifecycle. Since React 16.8.0 it has been possible to create stateful function component thanks to hooks, making it possible to write a component like this:
```js
class Hello extends React.Component {
  
  state = {
    sayHello: false
  }

  componentDidMount = () => {
    fetch('greet')
      .then(response => response.json())
      .then(data => this.setState({ sayHello: data.sayHello });
  }

  render = () => {
    const { sayHello } = this.state;
    const { name } = this.props;

    return sayHello ? <p>{`Hello ${name}!`}</p> : null;
  }
}
```
As a function like this:
```js
function Hello({ name }) {

  const [sayHello, setSayHello] = useState(false);

  useEffect(() => {
    fetch('greet')
      .then(response => response.json())
      .then(data => setSayHello(data.sayHello));
  }, []);

  return sayHello ? <p>{`Hello ${name}!`}</p> : null;
}
```
The purpose of this article isn't to get into arguing that one is better than the other, there are hundreds of posts on that topic already! The reason for showing the two components above is so that we can be clear about what React actually does with them.

In the case of the class component, React creates an instance of the class using the `new` keyword:
```js
const instance = new Component(props);
```
This instance is an object; when we say a component is a class, what we actually mean is that it is an object. This new object component has the different lifecycle methods (render, componentDidMount, etc.) which React calls at the correct times.

With a function component, React just calls it like an ordinary function and it returns either HTML markup or more React components. The lifecycle methods now need to be imported so that they can be used in the component and they work entirely based on the order in which they are called, this is why you can only call hooks at the top level of the component and they can't be called conditionally.

## Classes __are__ Functions
JavaScript doesn't have classes. I know it looks like it has classes, we've just written two! But under-the-hood JavaScript is not a class-based language, it is prototype-based. Classes were added with the ECMAScript 2015 specification (also referred to as ES6) and are just a cleaner syntax for existing functionality.

Let's have a go at rewriting a React class component without using the class syntax. Here is the component which we are going to recreate:
```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  }
  render() {
    const { count } = this.state;
    return (
      <>
        <button onClick={this.handleClick}>+1</button>
        <p>{count}</p>
      </>
    );
  }
}
```
This renders a button which increments a counter when clicked, it's a classic! The first thing we need to create is the constructor function, this will perform the same actions that the `constructor` method in our class performs apart from the call to `super` because that's a class-only thing.
```js
function Counter(props) {
this.state = {
  count: 0
}
this.handleClick = this.handleClick.bind(this);
}
```
This is the function which React will call with the `new` keyword. When a function is called with `new`, a new object is created, and the `this` context is bound to it. 

Next, we need to find a home for the `render` and `handleClick` methods and for that we need to talk about the prototype chain.

## The Prototype Chain

JavaScript allows inheritence of properties and methods between objects through something know as the prototype chain. Every object has a link to another object called its prototype. 

When you call a method or access a property on an object, JavaScript first checks for the property on the object itself. If it can't find it there then it checks the object's prototype, if it still can't find it then it checks the prototype's prototype and so on up the chain until it either finds it or runs out of prototypes to check.

Nearly all objects in JavaScript are instances of `Object`; this is how you have access to methods such as `toString` and `hasOwnProperty` on all objects. The chain ends when an object is reached with `null` as its prototype, this is normally at `Object`.

Let's try to make things clearer with an example.

```js
const parentObject = { name: 'parent' };
const childObject = Object.create(parentObject, { name: { value: 'child' } });
console.log(childObject);
```
First we create `parentObject`. Because we haven't specified otherwise, this object will be linked to `Object`. Next we use `Object.create` to create a new object using `parentObject` as its prototype. Notice that `Object.create` is only available from `Object` itself, it is not on `Object.prototype` so it is not available on instances of `Object`.

Now, when we use `console.log` to print our `childObject` we should see:
[image of {name: 'child', \_\_proto__]



FOR KEEPS:
```
Object.setPrototypeOf(Counter.prototype, React.Component.prototype);
Counter.prototype.render = function() {
  const { count } = this.state;
  return (
    <>
      <button onClick={this.handleClick}>+1</button>
      <p>{count}</p>
    </>
  );
},
Counter.prototype.handleClick = function () {
  const { count } = this.state;
  this.setState({ count: count + 1 });
}

```
