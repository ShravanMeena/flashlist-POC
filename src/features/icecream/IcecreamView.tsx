import React from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { ordered, restocked } from './icecreamSlice'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

export const IcecreamView = () => {
  const [value, setValue] = React.useState(1)
  const numOfIcecreams = useAppSelector(state => state.icecream.numOfIcecreams)
  const dispatch = useAppDispatch()
  return (
    <View>
      <Text>Number of ice creams - {numOfIcecreams}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "pink"
        }} onPress={() => dispatch(ordered())}>
        <Text>
          Order Ice cream
        </Text>
      </TouchableOpacity>
      {/* <TextInput
      textContentType="telephoneNumber"
        type='number'
        value={value}
        onChange={e => setValue(parseInt(e))}
      /> */}
      <TouchableOpacity style={{
        backgroundColor: "blue"
      }} onPress={() => dispatch(restocked(10))}>
        <Text>
          Restock Ice creams
        </Text>
      </TouchableOpacity>
    </View>
  )
}
