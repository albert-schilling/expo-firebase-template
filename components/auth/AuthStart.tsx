import React, {useContext} from 'react'
import {NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native'
import {checkEmail} from '../../services/user'
import __ from '../../misc/localisation'
import {TextInput, Button} from '../Themed'
import {ErrorCodes} from '../../misc/ErrorCodes'
import useMessage from '../../hooks/useMessage'
import {AuthContext} from './authContext'
import {SignUpState} from '../../screens/AuthenticationScreen'

export default function AuthStart() {
  const {
    isLoading,
    setLoading,
    form: {email},
    handleChange,
    setState,
  } = useContext(AuthContext)

  const [showMessage, resetMessage, Message] = useMessage()

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
    // @ts-ignore
  ) => (event as KeyboardEvent).key === 'Enter' && handleSubmit()

  const handleSubmit = () => {
    setLoading(true)
    checkEmail(email)
      .then(res => {
        resetMessage()
        res.length
          ? setState(SignUpState.Registered)
          : setState(SignUpState.New)
      })
      .catch(error => {
        console.debug(error)
        switch (error.code) {
          case ErrorCodes.AuthInvalidMail:
            showMessage(__.AUTH.EMAIL_INVALID, 'error')
            break
          default:
            showMessage(__.SOMETHING_WENT_WRONG, 'error')
        }
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <TextInput
        autoFocus
        placeholder={__.AUTH.EMAIL}
        value={email}
        onChangeText={handleChange('email')}
        style={{height: 40, width: 200, marginBottom: 12}}
        onKeyPress={handleKeyPress}
      />
      <Message style={{marginBottom: 12}} />
      <Button
        onPress={
          Boolean(email.length)
            ? handleSubmit
            : () => showMessage(__.AUTH.EMAIL_MISSING, 'warning')
        }
        status={isLoading ? 'neutral' : 'primary'}
        disabled={isLoading}
      >
        {__.AUTH.GET_STARTED}
      </Button>
    </>
  )
}
