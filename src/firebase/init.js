import firebase from 'firebase'
import 'firebase/firestore'
// import { firebaseApp } from '@firebase/app-types'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDn5OEnH9-LUK5xkzZrdrukjVN1myZU_Nk',
  authDomain: 'user-info-ee17c.firebaseapp.com',
  databaseURL: 'https://user-info-ee17c.firebaseio.com',
  projectId: 'user-info-ee17c',
  storageBucket: '',
  messagingSenderId: '609732864643'
}
const firebaseApp = firebase.initializeApp(config)
firebaseApp.firestore().settings({ timestampsInSnapshots: true })
export default firebaseApp.firestore()
