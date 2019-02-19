export default function() {
  function fetch(response, delay) {
    return new Promise(resolve => {
      setTimeout(() => resolve(response), delay * 1000)
    })
  }

  const stopwatch = (() => {
    let start, end
    return {
      start() {
        start = Date.now()
      },
      stop() {
        end = Date.now()
        return (end - start) / 1000
      },
    }
  })()

  function testCaseOne() {
    return new Promise(resolve => {
      // const output = document.querySelector('#one')
      // output.innerHTML = 'Running testCaseOne...'
      const responses = []
      stopwatch.start()
      fetch('three', 3)
        .then(res => responses.push(res))
        .then(() => fetch('two', 2))
        .then(res => responses.push(res))
        .then(() => fetch('one', 1))
        .then(res => responses.push(res))
        .then(() => {
          const time = stopwatch.stop()
          // output.innerHTML = `${responses.join(' ')} (time = ${time}s)`
          resolve()
        })
    })
  }

  function testCaseTwo() {
    return new Promise(async resolve => {
      // const output = document.querySelector('#two')
      // output.innerHTML = 'Running testCaseTwo...'
      stopwatch.start()
      const first = await fetch('three', 3)
      const second = await fetch('two', 2)
      const third = await fetch('one', 1)
      const time = stopwatch.stop()
      // output.innerHTML = `${first} ${second} ${third} (time = ${time}s)`
      resolve()
    })
  }

  function testCaseThree() {
    return new Promise(resolve => {
      // const output = document.querySelector('#three')
      // output.innerHTML = 'Running testCaseThree...'
      const responses = []
      stopwatch.start()
      new Promise(resolve => {
        function check() {
          if (responses.length > 2) resolve(responses)
        }
        fetch('three', 3).then(res => {
          responses.push(res)
          check()
        })
        fetch('two', 2).then(res => {
          responses.push(res)
          check()
        })
        fetch('one', 1).then(res => {
          responses.push(res)
          check()
        })
      }).then(values => {
        const time = stopwatch.stop()
        // output.innerHTML = `${values.join(' ')} (time = ${time}s)`
        resolve()
      })
    })
  }

  function testCaseFour() {
    return new Promise(resolve => {
      // const output = document.querySelector('#four')
      // output.innerHTML = 'Running testCaseFour...'
      const responses = []
      stopwatch.start()
      responses.push(fetch('three', 3))
      responses.push(fetch('two', 2))
      responses.push(fetch('one', 1))
      Promise.all(responses).then(values => {
        const time = stopwatch.stop()
        // output.innerHTML = `${values.join(' ')} (time = ${time}s)`
        resolve()
      })
    })
  }

  return (async function() {
    await testCaseOne()
    await testCaseTwo()
    await testCaseThree()
    await testCaseFour()
  })()
}