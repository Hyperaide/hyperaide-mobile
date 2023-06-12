import config from './config';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

export default function App() {
  const { url, statusbar_background_color, statusbar_content_style } = config;

  return (
    <View style={{ flex: 1, backgroundColor: statusbar_background_color }}>
      <WebView
        style={{ flex: 1, backgroundColor: statusbar_background_color, marginTop: Constants.statusBarHeight }}
        source={{ uri: url }}
      />
      <StatusBar style={statusbar_content_style} backgroundColor={statusbar_background_color} />
    </View>
  );
}
