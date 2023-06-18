# Expo-Starter
Welcome to Expo-Starter, a handy template for a webview Expo app. Let's get you started on the right foot!

### Getting Started
To begin, simply update the `config.js` file with your desired settings. Here's a sample configuration to help you out:
```javascript
export default {
  url: 'https://google.com',
  customUserAgent: null,

  // Status bar settings
  statusBar: {
    backgroundColor: '#ffffff',
    contentStyle: 'dark', // 'light' or 'dark'
  },

  // What the user sees when there is no internet connection
  noNetworkScreen: {
    message: 'No Internet Connection',
    textColor: '#000000',
    backgroundColor: '#ffffff',
  },
}
```

#### Full list of options

| Option              | Description                                                                                                                                                                                                                                                              |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `url`               | The URL of the web page that will be loaded in the WebView.                                                                                                                                                                                                              |
| `customUserAgent`   | The custom user agent string to be used in the WebView. If set to `null`, the default user agent of the device will be used.                                                                                                                                            |
| `statusBar`         | An object containing settings for the status bar.                                                                                                                                                                                                                        |
| `statusBar.backgroundColor` | The background color of the status bar. It can be specified using a hexadecimal color value.                                                                                                                                                                     |
| `statusBar.contentStyle`    | The style of the status bar content. It can be set to `'light'` or `'dark'` to specify light or dark content respectively.                                                                                                                                                   |
| `noNetworkScreen`   | An object defining the appearance of the screen that is displayed when there is no internet connection.                                                                                                                                                                |
| `noNetworkScreen.message`     | The message to be displayed on the screen when there is no internet connection.                                                                                                                                                                                         |
| `noNetworkScreen.textColor`   | The color of the text on the no network screen. It can be specified using a hexadecimal color value.                                                                                                                                                                   |
| `noNetworkScreen.backgroundColor` | The background color of the no network screen. It can be specified using a hexadecimal color value.                                                                                                                                                               |

You can customize these options in the `config.js` file according to your requirements.

---

### Push Notifications
If you want to enable push notifications in your app, you'll need to obtain permission from the user's device and acquire a push token.

To request permission for notifications, trigger the following JavaScript code on your website:
```javascript
window.ReactNativeWebView.postMessage('ask_notification_permissions');
```

Once the user grants permission, the app will send the push token back to your website using a JavaScript postMessage. You can handle this message using the code below:
```javascript
window.addEventListener('message', (event) => {
  const message = event.data;

  if (message.type === 'push_token') {
    const token = message.token;
    // Use the token to send notifications to the user's device.
  }
});
```

That's all there is to it! You're now equipped to send notifications and enhance your users' app experience.
