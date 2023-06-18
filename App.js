import config from './config';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';
import NoNetwork from './noNetwork';
import { registerForPushNotificationsAsync, } from './pushNotifications';

// This function is called when the webview sends a message to the app
async function handleMessage(event) {
  const data = event.nativeEvent.data;

  if (data == 'ask_notification_permisssions') {
    await registerForPushNotificationsAsync()
      .then((token) => this.webref.injectJavaScript(`window.postMessage({ type: 'push_token', token: '${token}' }, '*')`));
  }
}

export default function App() {
  const [networkConnected, setNetworkConnected] = useState(false);

  // check for network connection
  useEffect(() => {
    NetInfo.fetch().then(state => {
      setNetworkConnected(state.isConnected);
    });
  }, []);

  if (!networkConnected) {
    return <NoNetwork {...config.noNetworkScreen} statusBarStyle={config.statusBar.contentStyle} />
  }

  return (
    <View style={{ flex: 1, backgroundColor: config.statusBar.backgroundColor }}>
      <WebView
        userAgent={config.customUserAgent}
        ref={(r) => (this.webref = r)}
        style={{ flex: 1, backgroundColor: config.statusBar.backgroundColor, marginTop: Constants.statusBarHeight }}
        source={{ uri: config.url }}
        onMessage={handleMessage}
      />
      <StatusBar style={config.statusBar.contentStyle} backgroundColor={config.statusBar.backgroundColor} />
    </View>
  );
}
