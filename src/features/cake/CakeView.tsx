import { Text, TouchableOpacity, View } from 'react-native'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { ordered, restocked } from './cakeSlice'

export const CakeView = () => {
  const numOfCakes = useAppSelector(state => state.cake.numOfCakes)
  const dispatch = useAppDispatch()
  return (
    <View>
      <Text>Number of cakes - {numOfCakes}</Text>
      <TouchableOpacity style={{
        backgroundColor: "red"
      }} onPress={() => dispatch(ordered())}>
        <Text>Order Cake</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor:"green"
      }} onPress={() => dispatch(restocked(5))}>
        <Text>
          Restock Cakes
        </Text>
      </TouchableOpacity>
    </View>
  )
}
