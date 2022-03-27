import React, {Dispatch, SetStateAction} from 'react'
import __ from '../../misc/localisation'
import {SignUpState} from '../../screens/AuthenticationScreen'

export const initialAuthForm = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  timesWrongPassword: 0,
}

type TAuthContextType = {
  isLoading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  setState: Dispatch<SetStateAction<SignUpState>>
  form: typeof initialAuthForm
  setForm: Dispatch<SetStateAction<typeof initialAuthForm>>
  handleChange: (key: keyof typeof initialAuthForm) => (text: string) => void
}

const initialAuthContext = {
  isLoading: false,
  setLoading: () => {},
  setState: () => {},
  handleChange: key => {
    return () => {}
  },
  setForm: () => {},
  form: {} as typeof initialAuthForm,
} as TAuthContextType

export const AuthContext =
  React.createContext<TAuthContextType>(initialAuthContext)
