import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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

const db = firebase.firestore()
export const jollof = db.collection('temp')
export { db }
export default firebase
