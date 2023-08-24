import { StatusBar, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants'

const DynamicStatusBar = ({color}:any) => {
  return (
    <View>
      <StatusBar
        backgroundColor={color?color:Colors.DEFAULT_BLACK}
        barStyle={'light-content'}
      />
    </View>
  )
}

export default DynamicStatusBar
