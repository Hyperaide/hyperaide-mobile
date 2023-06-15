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
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
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

export default function App() {
  const { url, statusbar_background_color, statusbar_content_style } = config;
  const [pushToken, setPushToken] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setPushToken(token));
  }, []);

  const webViewInjectedJavaScript = `
      // Intercept requests and append the push token as a query parameter
      const originalFetch = fetch;
      fetch = function(input, init) {
        if (typeof input === 'string') {
          const url = new URL(input);
          url.searchParams.append('push_token', ${JSON.stringify(pushToken)});
          input = url.toString();
        }
        return originalFetch(input, init);
      };
      true;
    `;

  const handleMessage = async (event) => {
    const data = event.nativeEvent.data;

    if (data == 'ask_notification_permisssions') {
      const token = await Notifications.requestPermissionsAsync();

      if (token) {
        this.webref.injectJavaScript(`window.postMessage({ type: 'push_token', token: '${token}' }, '*')`);
      }
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: statusbar_background_color }}>
      <WebView
        ref={(r) => (this.webref = r)}
        style={{ flex: 1, backgroundColor: statusbar_background_color, marginTop: Constants.statusBarHeight }}
        source={{ uri: `${url}?push_token=${pushToken}` }}
        injectedJavaScript={webViewInjectedJavaScript}
        onMessage={handleMessage}
      />
      <StatusBar style={statusbar_content_style} backgroundColor={statusbar_background_color} />
    </View>
  );
}
