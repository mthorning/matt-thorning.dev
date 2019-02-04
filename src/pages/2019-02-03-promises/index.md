---
path: '/promises'
date: '2019-02-03T10:00'
title: 'Promises, Promises'
---

Unlike a lot of other languages, JavaScript is single-threaded which means it can only process one command at a time. We often need to get data from other sources, be it from a database, server or the user and I'm sure you can imagine how bad our applications would be if we had to pause the execution of our program each time we were waiting. Promises solve this problem for us, we request some data from wherever we're getting it from and we set the actions which we want to run once the data is returned. This leaves our single-thread free to carry on with other tasks.

Until quite recently it was necessary to use a third-party library for promises (jQuery's _Deferred_ was the most popular) but since ES6 they have been native to JS. Here's the basic pattern:
```javascript
const promise = new Promise(resolve =>
  setTimeout(() => resolve('I waited for 2 seconds'), 2000)
)

promise.then(message => console.log(message))
// I waited for 2 seconds
```
First we create a new `promise` object from the `Promise` constructor. This takes a function as an argument which is called with a function to execute when you want the promise to be resolved. I have just used a `setTimeout` in this example to keep things simple but you would normally make calls to an API or query a database (in [Node](https://nodejs.org/)) here. After that we can use Promise's `then` method to execute something when the promise is resolved.

---

## Error handling

So that's how you use promises... As long as nothing goes wrong! With the above code there isn't anything in place to handle the potential outcome of the API returning an error status. Fortunately, handling errors is pretty straightforward:
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
The function called in the `Promise` constructor is actually called with two callback functions; the second being one for rejecting the promise. In much the same way, `then` also accepts a second callback which executes if the promise is rejected.

---

## Promise chaining

It is possible to chain `then` functions after a promise. This is also a good place to introduce you to `catch`. When chaining, it is usually the case that you will only use `then` for resolved promises, a `catch` can be added to the end of the chain to catch an error thrown from any point preceding it.

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
Here we call our imaginary `saveData` function with the response from the first API call, then make another request to a different endpoint. If an error is thrown anywhere in this chain it will be caught by the `catch` function which passes the error object to another imaginary function - `handleError`.

Promise also has a `finally` method which can be added to the chain, it's pretty handy for spinners!
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

There is now (since ES2017) a cleaner way than chaining `then` functions on a promise. The above could be written using async/await like so:
```javascript
async function getData() {
  const data1 = await axios.get('api/endpoint/url')
  saveData(data1)
  const data2 = await axios.get('api/endpoint/url2')
  saveData(data2)
}
```

We prepend the `async` keyword to the function declaration and then use `await` anywhere we want to pause execution to wait for a promise to resolve.

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

There is a problem with the way I have written the examples above. Unless we need to wait for the result of the first call so that we can use the data in the response to make the second call, this is a very inefficient of programming. I can illustrate this with some code.

First, let's create a mock HTTP GET method:
```javascript
function get(response, delay) {
  return new Promise(resolve => {
      setTimeout(() => resolve(response), delay * 1000)
  })
}
```
We can call this function with the response we wish to be returned and the delay. We also need to be able to time the test cases we're going to write so let's make a stopwatch:
```javascript
const stopwatch = (() => {
  let start, end
  return {
    start() {
      start = Date.now()
    },
    stop() {
      end = Date.now()
      return (end - start) / 1000
    }
  }
})()
```
I've used a closure here, if you're not clued up on closures then you should check out my post about them [here](/using-closure). Next, we'll recreate the functions from above:
```javascript
const testCases = {
	one() {
    return new Promise(resolve => {
      const responses = []
      get('three', 3)
        .then(res => responses.push(res))
        .then(() => get('two', 2))
        .then(res => responses.push(res))
        .then(() => get('one', 1))
        .then(res => responses.push(res))
        .then(() => {
          const output =responses.join(' ')
          resolve(output)
        })
    })
  },

	two() {
    return new Promise(async resolve => {
      const first = await get('three', 3)
      const second = await get('two', 2)
      const third = await get('one', 1)
      const output = `${first} ${second} ${third}`
      resolve(output)
    })
  }
}
```
Hopefully you can recognise the code from earlier, here we are making three `get` requests instead of two. `testCases.one` pushes all of the data into an array whereas `testCases.two` uses `await` to wait for the data before assigning them to variables. Notice that we create a `new Promise` and then make the `get` request within which returns a promise each time. When we have received all of our data we resolve our 'master' promise. So now, all that remains to do is add the code which runs these tests:
```javascript
async function runTest(testCase) {
	let result, time;
  stopwatch.start()
  result = await testCases[testCase]()
  time = stopwatch.stop()
  console.log('Result: %s, Time: %s seconds', result, time)
}
```
This function is called with the name of the test we want to run, it starts the stopwatch and then runs the test. When the test's promise is resolved the stopwatch is stopped and the results are logged to the console. Let's run our tests:
```javascript
runTest('one') // Result: three two one, Time: 6.003 seconds
runTest('two') // Result: three two one, Time: 6.004 seconds
```
So you can see that both of our functions took 6 seconds to run, this is the sum of the delays that we set due to waiting for the response each time. We hae written our functions synchronously; each line is executed in order and will wait for its turn to run. We can instead play to JavaScript's strengths and write our code asynchronously. We'll add a third test to our `testCases` object:
```javascript
three() {
    return new Promise(resolve => {
    	const responses = []

      function check() {
      	if(responses.length > 2) {
      		resolve(responses.join(' '))
      	}
      }

      get('three', 3).then(res => {
      	responses.push(res)
      	check()
      })
      get('two', 2).then(res => {
      	responses.push(res)
      	check()
      })
      get('one', 1).then(res => {
      	responses.push(res)
      	check()
      })
  	})
  }
```
There's a bit more going on with this function. First we initialise our `responses` array, then we've added a function called `check`. Following that we make our three `get` requests as before, only this time we call `check` each time one resolves which looks at the length of our `responses` array and, when our array contains the three responses, it resolves our 'master' promise. Let's see how it does:
```javascript
runTest('one') // Result: one two three, Time: 3.002 seconds
```
Half the time, and you can see that the order of our responses has changed, our code is running asynchronously!

PROMISE STATES - PENDING, RESOLVED, REJECTED