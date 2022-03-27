/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from 'react'
import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
  Button as DefaultButton,
  Pressable,
  PressableProps as DefaultPressableProps,
  ViewStyle,
} from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'

export function useThemeColor(
  props: {light?: string; dark?: string},
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme()
  const colorFromProps = props[theme]

  if (colorFromProps) {
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}

export function useThemeColors() {
  const theme = useColorScheme()
  return Colors[theme]
}

type ThemeProps = {
  lightColor?: string
  darkColor?: string
  status?: TStatus
}

export type TStatus = 'success' | 'warning' | 'error' | 'neutral' | 'primary'

export type TextProps = ThemeProps & DefaultText['props']
export type TextInputProps = ThemeProps & DefaultTextInput['props']
export type ViewProps = ThemeProps & DefaultView['props']
export type ButtonProps = ThemeProps & DefaultButton['props']
export type PressableProps = ThemeProps & DefaultPressableProps

export function Text(props: TextProps) {
  const {style, lightColor, darkColor, ...otherProps} = props
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text')

  return <DefaultText style={[{color}, style]} {...otherProps} />
}

export function View(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background'
  )

  return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />
}

export function TextInput(props: TextInputProps) {
  const {style, lightColor, darkColor, ...otherProps} = props
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text')
  const placeholderColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'text'
  )
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'neutral'
  )

  return (
    <DefaultTextInput
      placeholderTextColor={placeholderColor}
      style={[
        {paddingHorizontal: 12, paddingVertical: 8, color, backgroundColor},
        style,
      ]}
      {...otherProps}
    />
  )
}

export function Button(props: PressableProps) {
  const {
    lightColor,
    darkColor,
    children,
    status = 'primary',
    style: _style,
    ...otherProps
  } = props
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    status
  )
  const color = useThemeColor({}, 'text')

  const style =
    _style instanceof Function
      ? _style
      : {
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor,
          ...(_style as ViewStyle),
        }

  return (
    <Pressable style={style} {...otherProps}>
      <Text
        style={{
          color,
        }}
      >
        {children}
      </Text>
    </Pressable>
  )
}
