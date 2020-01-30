import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyCh1mLGAY7eW8xQFp2GC0IhxstWI-11nYg',
  authDomain: 'fanfare-pos.firebaseapp.com',
  databaseURL: 'https://fanfare-pos.firebaseio.com',
  projectId: 'fanfare-pos',
  storageBucket: 'fanfare-pos.appspot.com',
  messagingSenderId: '802311092129',
  appId: '1:802311092129:web:a8cf0ea51635d149e9bde0'
}

firebase.initializeApp(config)
