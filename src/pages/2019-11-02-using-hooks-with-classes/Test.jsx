import React, { useState } from 'react'

export default function() {
  const [value, setValue] = useState(0)
  return (
    <>
      HELLO!
      <button onClick={() => setValue(v => v + 1)}>{value}</button>
    </>
  )
}
