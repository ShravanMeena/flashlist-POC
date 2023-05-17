
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function MagicButton({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}