import config from './config';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Linking from "expo-linking";

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus === 'denied') {
      Linking.openSettings();
    }
    else if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    else if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

async function handleMessage(event) {
  const data = event.nativeEvent.data;

  if (data == 'ask_notification_permisssions') {
    await registerForPushNotificationsAsync()
      .then((token) => this.webref.injectJavaScript(`window.postMessage({ type: 'push_token', token: '${token}' }, '*')`));
  }
}

export default function App() {
  const { url, statusbar_background_color, statusbar_content_style } = config;

  return (
    <View style={{ flex: 1, backgroundColor: statusbar_background_color }}>
      <WebView
        ref={(r) => (this.webref = r)}
        style={{ flex: 1, backgroundColor: statusbar_background_color, marginTop: Constants.statusBarHeight }}
        source={{ uri: url }}
        onMessage={handleMessage}
      />
      <StatusBar style={statusbar_content_style} backgroundColor={statusbar_background_color} />
    </View>
  );
}
