/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import NotifService from "./NotifService";

const App = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {};

  //   this.notif = new NotifService(
  //     this.onRegister.bind(this),
  //     this.onNotif.bind(this),
  //   );
  // }

  const [registerToken, setRegisterToken] = useState("");
  const [fcmRegistered, setFcmRegistered] = useState(false);

  const onRegister = (token) => {
    setRegisterToken(token.token);
    setFcmRegistered(true);
  };

  const onNotif = (notif) => {
    console.log("Notifikasi di klik");
    Alert.alert(notif.title, notif.message);
  };

  const notif = new NotifService(onRegister, onNotif);

  const handlePerm = (perms) => {
    Alert.alert("Permissions", JSON.stringify(perms));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          Example app react-native-push-notification
        </Text>
        <View style={styles.spacer}></View>
        <TextInput
          style={styles.textField}
          value={registerToken}
          placeholder="Register token"
        />
        <View style={styles.spacer}></View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.localNotif();
          }}
        >
          <Text>Local Notification (now)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.localNotif("sample.mp3");
          }}
        >
          <Text>Local Notification with sound (now)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.scheduleNotif();
          }}
        >
          <Text>Schedule Notification in 30s</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.scheduleNotif("sample.mp3");
          }}
        >
          <Text>Schedule Notification with sound in 30s</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.cancelNotif();
          }}
        >
          <Text>Cancel last notification (if any)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.cancelAll();
          }}
        >
          <Text>Cancel all notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.checkPermission(handlePerm());
          }}
        >
          <Text>Check Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.requestPermissions();
          }}
        >
          <Text>Request Permissions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.abandonPermissions();
          }}
        >
          <Text>Abandon Permissions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.getScheduledLocalNotifications((notifs) =>
              console.log(notifs)
            );
          }}
        >
          <Text>Console.Log Scheduled Local Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.getDeliveredNotifications((notifs) => console.log(notifs));
          }}
        >
          <Text>Console.Log Delivered Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.createOrUpdateChannel();
          }}
        >
          <Text>Create or update a channel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            notif.popInitialNotification();
          }}
        >
          <Text>popInitialNotification</Text>
        </TouchableOpacity>

        <View style={styles.spacer}></View>

        {fcmRegistered && <Text>FCM Configured !</Text>}

        <View style={styles.spacer}></View>
      </View>
    </ScrollView>
  );

  // onRegister(token) {
  //   this.setState({registerToken: token.token, fcmRegistered: true});
  // }

  // onNotif(notif) {
  //   Alert.alert(notif.title, notif.message);
  // }

  // handlePerm(perms) {
  //   Alert.alert('Permissions', JSON.stringify(perms));
  // }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#000000",
    margin: 5,
    padding: 5,
    width: "70%",
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: "#AAAAAA",
    margin: 5,
    padding: 5,
    width: "70%",
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default App;
