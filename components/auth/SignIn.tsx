import React, {useContext, useState} from 'react'
import {NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native'
import {resetPassword, signInUser} from '../../services/user'
import __ from '../../misc/localisation'
import {TextInput, Button, View} from '../Themed'
import {ErrorCodes} from '../../misc/ErrorCodes'
import useMessage from '../../hooks/useMessage'
import {styles} from '../../styles/styles'
import {AuthContext} from './authContext'
import {SignUpState} from '../../screens/AuthenticationScreen'

export default function SignIn() {
  const {
    setLoading,
    isLoading,
    form: {email, password},
    handleChange,
    setState,
  } = useContext(AuthContext)

  const handleSubmit = () => {
    setLoading(true)
    signInUser({email, password})
      .catch(error => {
        console.debug(error)
        switch (error.code) {
          case ErrorCodes.AuthWrongPassword:
            setWrongPasswordSubmit(wrongPasswordSubmit + 1)
            if (wrongPasswordSubmit > 2) {
              showMessage(__.AUTH.PASSWORD_FORGOTTEN_Q, 'error')
              setShowPasswordReset(true)
            } else {
              showMessage(__.AUTH.PASSWORD_WRONG, 'error')
            }
            break
          case ErrorCodes.AuthTooManyRequests:
            showMessage(__.AUTH.TOO_MANY_REQUESTS, 'error')
            break
          case ErrorCodes.AuthUserNotFound:
            setShowSignUpButton(true)
            showMessage(__.AUTH.USER_NOT_FOUND, 'error')
            break
          default:
            showMessage(__.SOMETHING_WENT_WRONG, 'error')
            console.error(error)
        }
      })
      .finally(() => setLoading(false))
  }

  const [showMessage, _, Message] = useMessage()

  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const [showSignUpButton, setShowSignUpButton] = useState(false)

  const [wrongPasswordSubmit, setWrongPasswordSubmit] = useState(0)

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    // @ts-ignore
    if ((e as KeyboardEvent).key === 'Enter') {
      handleSubmit()
    }
  }

  const handlePasswordReset = () => {
    setLoading(true)
    resetPassword(email)
      .then(() => {
        showMessage(__.AUTH.PASSWORD_CHECK_MAIL)
      })
      .catch(e => {
        console.debug(e)
        showMessage(__.SOMETHING_WENT_WRONG)
      })
      .finally(() => setLoading(false))
  }

  const isFormComplete = email.length > 0 && password.length > 0

  // TODO: Improve interface for showSignUpButton case. Also, rethink names for showSignUpButton and showPasswordReset

  return (
    <>
      <TextInput
        placeholder={__.AUTH.EMAIL}
        value={email}
        onChangeText={handleChange('email')}
        style={{marginBottom: 12}}
      />
      <TextInput
        autoFocus
        placeholder={__.AUTH.PASSWORD}
        value={password}
        onChangeText={handleChange('password')}
        secureTextEntry
        style={{marginBottom: 12}}
        onKeyPress={handleKeyPress}
      />
      {showSignUpButton && (
        <Button
          onPress={() => setState(SignUpState.New)}
          status={isLoading ? 'neutral' : 'primary'}
          disabled={isLoading}
          style={{marginBottom: 12, marginRight: 12}}
        >
          {__.AUTH.SIGN_UP}
        </Button>
      )}
      {showPasswordReset && (
        <Button
          onPress={handlePasswordReset}
          status={isLoading ? 'neutral' : 'error'}
          disabled={isLoading}
          style={{marginBottom: 12, marginRight: 12}}
        >
          {__.AUTH.RESET_PASSWORD}
        </Button>
      )}
      <Message style={{marginBottom: 12}} />
      <View style={styles.buttonContainer}>
        <Button
          // TODO: Clear form on cancel?
          onPress={() => setState(SignUpState.Start)}
          status='neutral'
          style={{marginRight: 12}}
        >
          {__.CANCEL}
        </Button>
        <Button
          onPress={handleSubmit}
          status={isLoading || !isFormComplete ? 'neutral' : 'primary'}
          disabled={isLoading || !isFormComplete}
        >
          {__.AUTH.SIGN_IN}
        </Button>
      </View>
    </>
  )
}
