import React from 'react';
import { View, Text, StatusBar } from 'react-native';

export default function NoNetwork(props) {
  return (
    < View style={{ flex: 1, backgroundColor: props.backgroundColor }
    }>
      <View>
        <Text style={{ textAlign: 'center', marginTop: "50%", color: props.textColor, fontSize: 16 }}>{props.message}</Text>
      </View>
      <StatusBar style={props.statusBarStyle} backgroundColor={props.backgroundColor} />
    </View >
  )
}
