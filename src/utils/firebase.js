import { useEffect, useState } from 'react'

const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
}

let firebaseInstance
function getFirebase(firebase) {
  if (firebaseInstance) {
    return firebaseInstance
  }

  firebase.initializeApp(config)
  firebaseInstance = firebase

  return firebase
}

export function useDatabase() {
  const [db, setDb] = useState(null)

  useEffect(() => {
    if (db === null) {
      const lazyApp = import('firebase/app')
      const lazyDatabase = import('firebase/database')

      Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
        setDb(getFirebase(firebase).database())
      })
    }
  }, [])

  return db
}
