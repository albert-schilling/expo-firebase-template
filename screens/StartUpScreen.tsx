import * as React from 'react'
import __ from '../misc/localisation'
import {StyleSheet} from 'react-native'
import {View, Text} from '../components/Themed'

export default function StartUpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{__.WELCOME_TO_BOILERPLATE}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    maxWidth: 200,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
