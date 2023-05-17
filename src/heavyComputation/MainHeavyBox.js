import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

export default function MainHeavyBox() {
  useEffect(() => {
    for (let index = 0; index < 10000; index++) {
      console.log(index);
    }
  }, [])

  return (<>
    <TouchableOpacity
      onPress={() => alert("clicked")}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
      }}>
      <Text style={{
        fontSize: 40,
        color: "red"
      }}>Heavy😡</Text>
      <Text style={{
        fontSize: 40,
        color: "red"
      }}>Computation</Text>

    </TouchableOpacity>
  </>

  )
}