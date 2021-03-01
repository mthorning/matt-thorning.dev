import React, { useEffect, useState } from 'react'

export default function ClapsPage() {
  const [claps, setClaps] = useState({})
  const [error, setError] = useState('')
  useEffect(() => {
    fetch('/api/claps')
      .then((data) => data.json())
      .then((json) => setClaps(json))
      .catch((error) => setError(error))
  }, [])
  console.log(error)
  return (
    <>
      <pre>{JSON.stringify(claps, null, 2)}</pre>
    </>
  )
}
