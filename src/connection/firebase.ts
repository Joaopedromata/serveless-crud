import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAwWVyOx2MuCtQ56frsm0jXd7cpf6DPg7g',
  authDomain: 'serveless-crud.firebaseapp.com',
  projectId: 'serveless-crud',
  storageBucket: 'serveless-crud.appspot.com',
  messagingSenderId: '1002395515659',
  appId: '1:1002395515659:web:e33ae0c5d9a2a2f82e400e'
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()

export default firebase
