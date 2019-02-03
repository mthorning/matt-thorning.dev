---
path: '/promises'
date: '2019-02-03T10:00'
title: 'Promises, Promises'
---

Unlike many other languages, JavaScript is single-threaded which means it can only do one thing at a time. We often need to get data from other sources, be it from a database, server or the user and I'm sure you can imagine how bad our applications would be if we had to pause the execution of our program every time whilst we were waiting. Promises solve this problem for us, we request some data from wherever we're getting it from and we set the actions which we want to run once the data is returned; when the data returns, the actions are run. This leaves our single-thread free to carry on with other tasks.

Until quite recently it was necessary to use a third-party library for promises (jQuery's _Deferred_ was the most popular) but since ES6 they have been native to JS. Here's the basic pattern:
```javascript
const promise = new Promise(resolve =>
    setTimeout(() => resolve('I waited for 2 seconds'), 2000)
)

promise.then(message => console.log(message))
// I waited for 2 seconds
```
First we create a new `promise` object from the `Promise` constructor. This takes a function as an argument which is called with a function to execute when you want the promise to be resolved. I have just used a `setTimeout` in this example to keep things simple but you would ordinarily make calls to an API or query a database here.

After that we can use Promise's `then` method to execute something when the promise is resolved.

---

## Error handling

So that's how you use promises... As long as nothing goes wrong! With the above code there is nothing in place to handle the potential outcome of the API returning an error status. Fortunately, handling errors is pretty straightforward:
```javascript
const promise = new Promise((resolve, reject) =>
    setTimeout(() => {
        const chaos = Math.random()
        if(chaos > 0.5) {
            reject('Too much chaos!')
        } else {
            resolve('I waited for 2 seconds')
        }
    }, 2000)
)

promise.then(
    message => console.log(message),
    errorMessage => console.error(errorMessage)
)
```
The function called in the `Promise` constructor is actually called with two callback functions; the second being one for rejecting the promise. In much the same way, `then` also accepts a second callback to run if the promise is rejected.

## Promise chaining

It is possible to chain `then` functions after a promise. This is also a good place to introduce you to `catch`. When chaining it is usually the case that you will only use `then` for resolved promises, a `catch` can be added to the end of the chain to catch an error thrown from any point preceding it.

Here we will get our promise from another source, I quite often use [Axios](https://github.com/axios/axios) to make HTTP requests. Their API is really simple, to make a GET request you just write `axios.get('api/endpoint/url')` which returns a promise that resolves when the data is returned from the server.
```javascript
axios.get('api/endpoint/url')
    .then(response =>
        saveData(response)
        axios.get('api/endpoint/url2')
    )
    .then(response2 =>
        saveData(reponse2)
    )
    .catch(error =>
        handleError(error)
    )
```
Here we save the data from the first API response then make another. If an error is thrown anywhere in this chain it will be caught by the `catch` function. There is also a `finally` function which can be added to the chain, it's pretty handy for spinners:
```javascript
showSpinner()
axios.get('api/endpoint/url')
    .then(response =>
        saveData(response)
        axios.get('api/endpoint/url2')
    )
    .then(response2 =>
        saveData(reponse2)
    )
    .catch(error =>
        handleError(error)
    )
    .finally(() =>
        hideSpiner()
    )
```

---

## Async/await

There is now a cleaner way than chaining `then` functions on a promise. The above could be written using async/await like so:
```javascript
async function getData() {
    const data1 = await axios.get('api/endpoint/url')
    saveData(data1)
    const data2 = await axios.get('api/endpoint/url2')
    saveData(data2)
}
```

We add the `async` keyword to the function declaration and then just put `await` in front of the assignment of any promise where we want the execution to pause until the promise is resolved.

Unfortunately, error handling with async/await is not as clean as before and the only way (that I know of!) to achieve the same level of error handling as above is to wrap everything in a `try/catch` block:
```javascript
async function getData() {
    try {
        const data1 = await axios.get('api/endpoint/url')
        saveData(data1)
        const data2 = await axios.get('api/endpoint/url2')
        saveData(data2)
    } catch(error) {
        handleError(error)
    }
}
```

---

## Promises for speed

The examples above do not take full advantage of the asynchronous 

<iframe width="100%" height="300" src="//jsfiddle.net/matthewthorning/95y2bv1k/125/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>