import React, {useState} from 'react'
import __ from '../misc/localisation'
import {Text, View} from '../components/Themed'
import AuthStart from '../components/auth/AuthStart'
import SignIn from '../components/auth/SignIn'
import SignUp from '../components/auth/SignUp'
import {styles} from '../styles/styles'
import {AuthContext, initialAuthForm} from '../components/auth/authContext'

export enum SignUpState {
  Start = 'Start',
  New = 'New',
  Registered = 'Registered',
}

export default function AuthenticationScreen() {
  const [state, setState] = useState(SignUpState.Start)
  const [isLoading, setLoading] = useState(false)
  const [form, setForm] = useState(initialAuthForm)

  const handleChange = (key: keyof typeof initialAuthForm) => (text: string) =>
    setForm({...form, [key]: text})

  let Body = () => <></>
  switch (state) {
    case SignUpState.Start:
      Body = AuthStart
      break
    case SignUpState.Registered:
      Body = SignIn
      break
    case SignUpState.New:
      Body = SignUp
      break
    default:
      Body = AuthStart
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setLoading,
        setState,
        form,
        setForm,
        handleChange,
      }}
    >
      <View style={styles.page}>
        <View style={styles.contentContainer}>
          <Text style={{fontSize: 20, marginBottom: 20}}>
            {__.WELCOME_TO_BOILERPLATE}
          </Text>
          <Body />
        </View>
      </View>
    </AuthContext.Provider>
  )
}
