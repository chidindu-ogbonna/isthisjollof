import firebase from 'firebase/app'
import 'firebase/auth'

import store from '@/store'

const config = {
  apiKey: 'AIzaSyB1M3Weqb9XapVvHHpRhWl8E78xZiEv0KM',
  authDomain: 't-ogbonna.firebaseapp.com',
  databaseURL: 'https://t-ogbonna.firebaseio.com',
  projectId: 't-ogbonna',
  storageBucket: 't-ogbonna.appspot.com',
  messagingSenderId: '778756627613',
  appId: '1:778756627613:web:c0624c0ead0b30990dc874'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

// Lazy load firestore with async import is important for performance
let asyncFirestore = null
export const firestore = () => {
  if (!asyncFirestore) {
    asyncFirestore = import(/* webpackChunkName: "chunk-firestore" */ 'firebase/firestore').then(
      () => {
        firebase.firestore().enablePersistence({ synchronizeTabs: true })
        return firebase.firestore()
      }
    )
  }
  return asyncFirestore
}

firebase.auth().onAuthStateChanged(user => {
  store.dispatch('authentication/login', user)
})

export default firebase
