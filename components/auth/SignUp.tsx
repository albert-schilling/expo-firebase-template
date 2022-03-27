import React, {useContext} from 'react'
import {NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native'
import {addUser, signUpUser} from '../../services/user'
import __ from '../../misc/localisation'
import {TextInput, Button, View} from '../Themed'
import useMessage from '../../hooks/useMessage'
import {styles} from '../../styles/styles'
import {AuthContext} from './authContext'
import {useDispatch} from 'react-redux'
import {setUser} from '../../store/reducer/userSlice'
import {SignUpState} from '../../screens/AuthenticationScreen'

export default function SignUp() {
  const dispatch = useDispatch()
  const {
    isLoading,
    setLoading,
    form: {firstName, lastName, email, password, confirmPassword},
    handleChange,
    setState,
  } = useContext(AuthContext)

  const [showMessage, _, Message] = useMessage()

  const handleSubmit = () => {
    setLoading(true)
    signUpUser({email: email, password: password})
      .then(res => {
        if (res instanceof Error) {
          throw res
        } else {
          dispatch(
            setUser({
              metadata: {...res.user?.metadata},
              additionalUserInfo: {
                ...res.additionalUserInfo,
              },
              firstName,
              lastName,
            })
          )
          addUser({
            firstName,
            lastName,
            ...res,
          })
        }
      })
      .catch(e => {
        showMessage(__.SOMETHING_WENT_WRONG, 'error')
        // TODO: Check which specific errors might occur and handle these gracefully.
        console.debug(e)
      })
      .finally(() => setLoading(false))
  }

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    // @ts-ignore
    if ((e as KeyboardEvent).key === 'Enter' && isFormComplete) {
      handleSubmit()
    }
  }

  const isFormComplete =
    firstName.length > 0 &&
    lastName.length > 0 &&
    password.length > 0 &&
    password === confirmPassword &&
    email.length > 0

  return (
    <>
      <TextInput
        placeholder={__.AUTH.EMAIL}
        value={email}
        onChangeText={handleChange('email')}
        style={{marginBottom: 12}}
      />
      <TextInput
        placeholder={__.AUTH.PASSWORD}
        autoFocus
        value={password}
        onChangeText={handleChange('password')}
        secureTextEntry
        style={{marginBottom: 12}}
      />
      <TextInput
        placeholder={__.AUTH.PASSWORD_CONFIRM}
        value={confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        secureTextEntry
        style={{marginBottom: 12}}
      />
      <TextInput
        placeholder={__.USER.FIRST_NAME}
        value={firstName}
        onChangeText={handleChange('firstName')}
        style={{marginBottom: 12}}
      />
      <TextInput
        placeholder={__.USER.LAST_NAME}
        value={lastName}
        onChangeText={handleChange('lastName')}
        style={{marginBottom: 12}}
        onKeyPress={handleKeyPress}
      />
      <Message style={{marginBottom: 12}} />
      <View style={styles.buttonContainer}>
        <Button
          // TODO: Clear form on cancel?
          onPress={() => setState(SignUpState.Start)}
          status={'neutral'}
          style={{marginRight: 12}}
        >
          {__.CANCEL}
        </Button>
        <Button
          onPress={handleSubmit}
          status={isLoading && !isFormComplete ? 'neutral' : 'primary'}
          disabled={!isFormComplete}
        >
          {__.AUTH.SIGN_UP}
        </Button>
      </View>
    </>
  )
}
