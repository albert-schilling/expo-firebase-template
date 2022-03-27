const words = {
  WELCOME_TO_BOILERPLATE: 'Welcome to the Expo and Firebase Boilerplate',
  PROFILE: 'Profile',
  CANCEL: 'Cancel',
  LOADING: 'loading ...',
  NAVIGATION: {
    PATH_TO_NOWHERE: 'Oops, this path leads to no where.',
    TAKE_ME_BACK: 'Take me back.',
  },
  SOMETHING_WENT_WRONG:
    'Sorry, but something went wrong ...\nPlease, try again later.',
  AUTH: {
    EMAIL: 'Email',
    EMAIL_IN_USE: `Sorry, but a user with this email is already signed up.\n 
      If this is your address, try to sign in with your password instead.`,
    EMAIL_INVALID: 'Email is invalid.',
    EMAIL_MISSING: 'Please, type in a valid email.',
    GET_STARTED: 'Get started',
    PASSWORD: 'Password',
    PASSWORD_CHECK_MAIL:
      'Please, check your mail inbox to reset your password.',
    PASSWORD_CONFIRM: 'Confirm Password',
    PASSWORD_FORGOTTEN_Q: 'Forgot your password?',
    PASSWORD_TOO_SHORT: 'Your password should at least contain 6 digits.',
    PASSWORD_WRONG: 'Wrong Password. Please, try again.',
    RESET_PASSWORD: 'Reset password',
    SIGN_IN: 'Sign in',
    SIGN_OUT: 'Sign out',
    SIGN_UP: 'Sign up',
    SIGNED_IN_SUCCESSFULLY: 'Successfully signed in.',
    TOO_MANY_REQUESTS:
      'Access to this account has been temporarily disabled due to many failed login attempts. Please, try again later.',
    USER_NOT_FOUND: 'No account with this user exists.',
  },
  USER: {
    FIRST_NAME: 'First Name',
    LAST_NAME: 'Last Name',
    SHOW_PROFILE_OF: (name: string) => `Show ${name}'s profile`,
  },
}

const __ = () => words

export default __()
