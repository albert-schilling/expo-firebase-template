import {useEffect, useState} from 'react'
import {authentication} from '../services/firebase'
import {getUser} from '../services/user'
import {useDispatch} from 'react-redux'
import {resetUser, setUser} from '../store/reducer/userSlice'

export enum AuthState {
  Unknown = 'Unknown',
  SignedIn = 'SignedIn',
  NotSignedIn = 'NotSignedIn',
}

export default function useAuthentication(): AuthState {
  const dispatch = useDispatch()
  const [authState, setAuthState] = useState<AuthState>(AuthState.Unknown)
  useEffect(() => {
    const unsubscribeFromAuthentication = authentication.onAuthStateChanged(
      async user => {
        if (user) {
          console.debug('User signed in.')
          setAuthState(AuthState.SignedIn)
          // TODO: Use react query here?
          getUser(user.uid).then(userData => {
            if (userData) {
              dispatch(setUser({loggedIn: true, ...userData}))
            } else {
              console.error('User does not exist in db.')
            }
          })
        } else {
          console.debug('User is not signed in or just signed out.')
          dispatch(resetUser())
          setAuthState(AuthState.NotSignedIn)
        }
      }
    )
    return () => {
      console.debug('unsubscribeFromAuthentication')
      unsubscribeFromAuthentication()
    }
  }, [])

  return authState
}
