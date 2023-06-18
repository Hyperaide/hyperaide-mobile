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
