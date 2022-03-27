import React from 'react'
import {StyleSheet, ViewStyle} from 'react-native'
import {View, Text, useThemeColor, TStatus} from './Themed'
import __ from '../misc/localisation'

export default function Tag({
  text,
  status = 'success',
  style,
}: {
  text: string
  status?: TStatus
  style?: ViewStyle
}) {
  const color = useThemeColor({}, status)
  return (
    <View
      style={{
        ...styles.controlContainer,
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: color,
        ...style,
      }}
    >
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  text: {
    margin: 4,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 4,
    padding: 4,
    borderWidth: 2,
    borderStyle: 'solid',
  },
})
