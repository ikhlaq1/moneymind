import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import LottieView from "lottie-react-native";
import BaseText from "../components/customCompoents/BaseText";
import { CommonProperties, FontSize } from "../components/styles";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import axios from "axios";
import { useEffect } from "react";
var options = {
  method: "GET",
  url: "https://yh-finance.p.rapidapi.com/market/v2/get-summary",
  params: { region: "IN" },
  headers: {
    "x-rapidapi-host": "yh-finance.p.rapidapi.com",
    "x-rapidapi-key": "a1FH5rWGYbmshq0Zw2W3EZlG7ADap1HixRxjsn4o4H6fufzPuj",
  },
};

export default function ModalScreen() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        style={{
          height: 300,
          marginBottom: 40,
        }}
        source={require("../assets/lottie/contact.json")}
        autoPlay
      />
      <BaseText
        style={[
          {
            fontSize: FontSize.h3,
            flex: 4,
            padding: 5,
            color: Colors[colorScheme].text,
          },
        ]}
      >
        Contact Us
      </BaseText>
      <BaseText
        style={[
          {
            fontSize: FontSize.h3,
            flex: 4,
            padding: 5,
            color: Colors[colorScheme].text,
          },
        ]}
      >
        ikhlaq201@gmail.com
      </BaseText>
      <BaseText
        style={[
          {
            fontSize: FontSize.h3,
            flex: 4,
            padding: 5,
            color: Colors[colorScheme].text,
          },
        ]}
      >
        +919596543332
      </BaseText>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    width: "80%",
  },
});
