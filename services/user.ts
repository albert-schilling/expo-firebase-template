import {authentication, db} from './firebase'
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth'
import {
  doc,
  DocumentData,
  FirestoreError,
  getDoc,
  setDoc,
} from 'firebase/firestore'

export {
  checkEmail,
  signInUser,
  signUpUser,
  resetPassword,
  signOut,
  getUser,
  addUser,
}

function signInUser({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<UserCredential | Error> {
  return signInWithEmailAndPassword(authentication, email, password)
}

function signUpUser({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<UserCredential | Error> {
  return createUserWithEmailAndPassword(authentication, email, password)
}

function checkEmail(email: string): Promise<string[]> {
  return fetchSignInMethodsForEmail(authentication, email)
}

function resetPassword(email: string): Promise<void> {
  return sendPasswordResetEmail(authentication, email)
}

function signOut(): Promise<void> {
  return authentication.signOut()
}

function getUser(id: string): Promise<DocumentData> {
  const ref = doc(db, 'users', id)
  return getDoc(ref)
    .then(doc => {
      if (doc.exists()) {
        console.debug('User document exists.')
        const data = doc.data()
        if (data) {
          console.debug('User data exists.')
          return data
        } else {
          throw new Error('Document is undefined.')
        }
      } else throw new Error('Document does not exist.')
    })
    .catch((error: FirestoreError) => {
      console.error(error)
      throw error
    })
}

function addUser({
  firstName,
  lastName,
  user,
}: {firstName: string; lastName: string} & UserCredential): void {
  if (user) {
    setDoc(doc(db, 'users', user.uid), {
      firstName,
      lastName,
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      metadata: {
        ...user.metadata,
      },
      providerId: user.providerId,
    })
      .then(() => console.debug('User successfully added to db.'))
      .catch(error => console.error(error))
  } else {
    console.error(new Error('Cannot add user to db. User is null.'))
  }
}
