import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const config = {
  apiKey: '',
  authDomain: 'datahorror-b9cd4.firebaseapp.com',
  databaseURL: 'https://datahorror-b9cd4.firebaseio.com',
  projectId: 'datahorror',
  storageBucket: 'datahorror.appspot.com',
  messagingSenderId: '397665529422',
  appId: '1:397665529422:web:6513fea38be3162f5ddd1f',
  measurementId: 'G-HZTY5VT7M0',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
