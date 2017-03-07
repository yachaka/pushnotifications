/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  DeviceEventEmitter,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import PushNotification from 'react-native-push-notification';
// const form = new FormData();
// form
function callServer(data) {
  fetch('http://192.168.1.45:8080/notif', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
}
// callServer({ okk: 'lol' })

PushNotification.configure({
    onRegister: function(token) {
      console.log( 'TOKEN:', token );
    },
    onNotification: function(notification) {
      console.log( 'NOTIFICATION:', notification );
      callServer(notification)
    },
    senderID: "574360349237",
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },
    popInitialNotification: true,
    requestPermissions: true,
});

PushNotification.registerNotificationActions(['Accept','Reject','Yes','No']);
DeviceEventEmitter.addListener('notificationActionReceived', function(action){
  console.log ('Notification action received: ' + action);
  callServer(action)
  const info = JSON.parse(action.dataJSON);
  if (info.action == 'Accept') {
    // Do work pertaining to Accept action here
  } else if (info.action == 'Reject') {
    // Do work pertaining to Reject action here
  }
  // Add all the required actions handlers
});
// PushNotification.getInitialNotification(console.log)
export default class App extends Component {
  componentWillMount() {
    PushNotification.popInitialNotification((n) => {
      callServer({
        initial: n
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PushNotifications', () => App);
