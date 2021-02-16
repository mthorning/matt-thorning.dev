import { useState, useEffect, useMemo } from 'react'
import { useDatabase } from 'utils'

export function useClaps(slug) {
  const reference = slug.replace(/^\/blog/, '')
  const [clapQueue, setClapQueue] = useState(0)
  const [claps, clapSetter] = useState(0)
  const database = useDatabase()
  const development = process.env.NODE_ENV === 'development'

  const clapRef = useMemo(
    () =>
      database && database.ref(`${development ? 'test' : 'claps'}${reference}`),
    [database, development, reference]
  )

  useEffect(() => {
    if (database) {
      clapRef.on('value', function (snapshot) {
        const claps = snapshot.val()
        if (claps) {
          clapSetter(claps)
        }
      })
    }
    return () => clapRef && clapRef.off()
  }, [clapRef, database])

  useEffect(() => {
    if (database && clapQueue > 0) {
      clapRef.set(clapQueue)
      setClapQueue(0)
    }
  }, [clapRef, database, clapQueue])

  function setClaps(claps) {
    setClapQueue(claps)
  }

  return [claps, setClaps]
}
