/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome} from '@expo/vector-icons'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import * as React from 'react'
import {ColorSchemeName} from 'react-native'
import Colors from '../constants/Colors'
import useAuthentication, {AuthState} from '../hooks/useAuthentication'
import useColorScheme from '../hooks/useColorScheme'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import Diaries from '../screens/Diaries'
import Profile from '../screens/Profile'
import {RootStackParamList, RootTabParamList} from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import StartUpScreen from '../screens/StartUpScreen'
import AuthenticationScreen from '../screens/AuthenticationScreen'
import {Text} from '../components/Themed'
import __ from '../misc/localisation'

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      fallback={<Text>{__.LOADING}</Text>}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  const state = useAuthentication()

  if (state === AuthState.Unknown) {
    return <StartUpScreen />
  }
  return (
    <Stack.Navigator>
      {state === AuthState.SignedIn && (
        <>
          <Stack.Screen
            name='Root'
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name='NotFound'
            component={NotFoundScreen}
            options={{headerShown: false}}
          />
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen name='Modal' component={ModalScreen} />
          </Stack.Group>
        </>
      )}
      {state === AuthState.NotSignedIn && (
        <Stack.Screen name='Authentication' component={AuthenticationScreen} />
      )}
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName='Diaries'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name='Diaries'
        component={Diaries}
        options={{
          headerShown: false,
          title: 'Diaries',
          tabBarIcon: ({color}) => <TabBarIcon name='book' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Profile'
        component={Profile}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({color}) => (
            <TabBarIcon name='user-circle' color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={30} {...props} />
}
