import { StatusBar } from "expo-status-bar";
import { Text, View, Button, Platform } from "react-native";
import Constants from "expo-constants";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation/index.js";
import BaseText from "./components/customCompoents/BaseText";
import { CommonProperties, FontSize } from "./components/styles";
import { useEffect, useState, useRef } from "react";
import * as Notifications from "expo-notifications";
import { initializeApp } from "firebase/app";
// import { authDomain ,databaseURL,measurementId,appId,messagingSenderId,storageBucket,projectId, API_KEY} from '@env'
import { getDatabase, ref, push, set } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA42ewRRuGziFvaUeMsHPhsCbQRxe1oQ7M",
  authDomain: "module-6225f.firebaseapp.com",
  databaseURL: "https://module-6225f-default-rtdb.firebaseio.com",
  projectId: "module-6225f",
  storageBucket: "module-6225f.appspot.com",
  messagingSenderId: "400929924176",
  appId: "1:400929924176:web:d12e05f9b5d77e28ca5d55",
};
initializeApp(firebaseConfig);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const isLoadingComplete = useCachedResources();
  const [hideAnimation, setHideAnimation] = useState(false);
  const colorScheme = useColorScheme();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      setHideAnimation(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log({ notification });

        const db = getDatabase();
        AsyncStorage.getItem("expoToken").then((res) => {
          if (res) {
            const postListRef = ref(
              db,
              `notifications/${res.replace(/[^a-z]/gi, "")}/data`
            );
            const newPostRef = push(postListRef);
            set(newPostRef, {
              data: notification.request.content,
            });
          }
        });
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log({ response });
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (!isLoadingComplete) {
    return (
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        ></View>
      </SafeAreaProvider>
    );
  } else {
    if (hideAnimation) {
      return (
        <SafeAreaProvider>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <BaseText
              style={[
                {
                  ...CommonProperties.h2,
                  fontSize: FontSize.h1,
                  padding: 25,
                  color: "#118C4F",
                },
              ]}
            >
              The rich invest their money and spend what is left; the poor spend
              their money and invest what is left.
            </BaseText>

            <LottieView
              style={{
                width: 500,
                height: 400,
              }}
              source={require("./assets/lottie/moneyTree.json")}
              autoPlay
            />
          </View>
        </SafeAreaProvider>
      );
    } else {
      return (
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      );
    }
  }
}

const storeTokenInDb = (token) => {
  const db = getDatabase();
  set(ref(db, `users/${token}`), {
    token: token,
    device: Platform.OS,
  });
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      // alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    let extractedToken = token.replace(/[^a-z]/gi, "");
    try {
      await AsyncStorage.setItem("expoToken", token);
    } catch (e) {
      console.log(e);
    }
    storeTokenInDb(extractedToken);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
