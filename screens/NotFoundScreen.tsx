import * as React from 'react'
import {StyleSheet} from 'react-native'
import {Button, Text, View} from '../components/Themed'
import __ from '../misc/localisation'
import {RootStackScreenProps} from '../types'

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<'NotFound'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{__.NAVIGATION.PATH_TO_NOWHERE}</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <Button
        status='neutral'
        onPress={() =>
          navigation.canGoBack()
            ? navigation.goBack()
            : navigation.navigate('Root')
        }
      >
        {__.NAVIGATION.TAKE_ME_BACK}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
