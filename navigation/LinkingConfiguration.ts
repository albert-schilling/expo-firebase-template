/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import {LinkingOptions} from '@react-navigation/native'
import * as Linking from 'expo-linking'

import {RootStackParamList} from '../types'

const prefix = Linking.createURL('/')

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix, 'http://localhost:19006'],
  config: {
    screens: {
      Root: {
        screens: {
          Diaries: 'diaries',
          Profile: 'profile',
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
}

export default linking
