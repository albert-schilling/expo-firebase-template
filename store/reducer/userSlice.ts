import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'

export type TUserState = {
  loggedIn: boolean
  status?: string
  uid?: string
  displayName?: string
  firstName?: string
  lastName?: string
  email?: string
  emailVerified?: boolean
  additionalUserInfo?: {isNewUser?: boolean; providerId?: string}
  metadata: {
    a?: string
    b?: string
    creationTime?: string
    lastSignInTime?: string
  }
}

export const initialUserState: TUserState = {
  loggedIn: false,
  status: undefined,
  uid: undefined,
  displayName: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  emailVerified: false,
  additionalUserInfo: {isNewUser: undefined, providerId: undefined},
  metadata: {
    a: undefined,
    b: undefined,
    creationTime: undefined,
    lastSignInTime: undefined,
  },
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialUserState,
  reducers: {
    setUser: (state, {payload}: PayloadAction<Partial<TUserState>>) => ({
      ...state,
      ...payload,
    }),
    resetUser: () => initialUserState,
  },
})

export const {setUser, resetUser} = userSlice.actions

export default userSlice.reducer

export const selectUserId = (state: RootState) => state.user.uid
export const selectUser = (state: RootState) => state.user
