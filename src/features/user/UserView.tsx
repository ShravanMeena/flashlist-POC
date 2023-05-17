import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { fetchUsers } from './userSlice'
import { Text, View } from 'react-native'

export const UserView = () => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  return (
    <View>
      <Text>List of Users</Text>
      {user.loading && <View><Text>Loading...</Text></View>}
      {!user.loading && user.error ? <View><Text>
        Error: {user.error}</Text></View> : <Text></Text>}
      {!user.loading && user.users.length ? (
        <View>
          {user.users.map(user => (
            <Text key={user.id}>{user.name}</Text>
          ))}
        </View>
      ) : <Text></Text>}
    </View>
  )
}
