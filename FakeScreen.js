import { View, Text, Button } from 'react-native'
import React from 'react'

export default function FakeScreen({ navigation }) {
    return (
        <View>
            <Button title="MAIN" onPress={() => navigation.navigate("AppFlashlist")} />
            <Text>FakeScreen</Text>
        </View>
    )
}