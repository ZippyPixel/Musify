import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyA1sksFXie6eGb_b4lW1OUBgIlfWzty-Gg',
  authDomain: 'musify-c1360.firebaseapp.com',
  projectId: 'musify-c1360',
  storageBucket: 'musify-c1360.appspot.com',
  appId: '1:819696994595:web:a9011ad9b4d8a2c460a496'
}

//initializing Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')

export { auth, db, usersCollection, songsCollection, storage }
