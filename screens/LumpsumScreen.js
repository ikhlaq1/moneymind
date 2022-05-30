import { useEffect, useState } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";

import { View } from "../components/Themed";
import { Input, Slider } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import BaseText from "../components/customCompoents/BaseText";
import { FontSize } from "../components/styles";
import RowView from "../components/customCompoents/RowView";
import LottieView from "lottie-react-native";

export default function LumpsumScreen() {
  const colorScheme = useColorScheme();
  const [investment, setInvestment] = useState(0);
  const [years, setYears] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [returns, setReturns] = useState(0);

  //100000*((Math.pow(1+0.1, 20)))
  const totalReturns = () => {
    return investment * Math.pow(1 + percentage / 100, years);
  };

  useEffect(() => {
    setReturns(totalReturns);
  }, [investment, years, percentage]);

  const currencyRoundOff = (value) => {
    let val = Math.abs(value);

    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2) + " Cr";
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2) + " Lac";
    } else if (val >= 1000) {
      val = (val / 1000).toFixed(2) + " K";
    }
    return val;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={{ paddingLeft: 0 }}>
          <LottieView
            style={{
              height: 280,
            }}
            source={require("../assets/lottie/moneybag.json")}
            autoPlay
          />
        </View>

        <View style={{ width: "100%" }}>
          <RowView style={{}}>
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
              I want to invest total
            </BaseText>
          </RowView>
          <Input
            placeholder="Total Amount"
            selectionColor={"white"}
            onChangeText={setInvestment}
            style={styles.textInput}
            value={investment}
            keyboardType="numeric"
          />
        </View>

        <View style={{ width: "100%" }}>
          <RowView style={{}}>
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
              Expected Rate of return:
            </BaseText>
          </RowView>
          <Input
            placeholder="In Percentage"
            selectionColor={"white"}
            onChangeText={setPercentage}
            style={styles.textInput}
            value={percentage}
            keyboardType="numeric"
          />
        </View>

        <View style={{ width: "100%" }}>
          <RowView style={{}}>
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
              How long you plan to invest
            </BaseText>
            <BaseText
              style={[
                {
                  fontSize: FontSize.h2,
                  flex: 6,
                  padding: 5,
                  color: Colors[colorScheme].text,
                },
              ]}
            >
              {years} {years < 2 ? "Year" : "Years"}{" "}
            </BaseText>
          </RowView>
          <Slider
            value={years}
            onValueChange={setYears}
            maximumValue={50}
            minimumValue={0}
            step={1}
            allowTouchTrack
            minimumTrackTintColor={Colors[colorScheme].secondary}
            maximumTrackTintColor={Colors[colorScheme].text}
            trackStyle={{ height: 5, backgroundColor: "transparent" }}
            thumbStyle={{
              height: 20,
              width: 20,
              backgroundColor: "transparent",
            }}
            thumbProps={{
              children: (
                <FontAwesome
                  name="circle"
                  size={20}
                  color={Colors[colorScheme].text}
                />
              ),
            }}
          />
        </View>
        <RowView style={{}}>
          <BaseText
            style={[
              {
                fontSize: FontSize.h3,
                flex: 5,
                padding: 5,
                color: Colors[colorScheme].text,
              },
            ]}
          >
            Your Gains
          </BaseText>
          <BaseText
            style={[
              {
                fontSize: FontSize.h2,
                flex: 6,
                padding: 5,
                color: Colors[colorScheme].text,
              },
            ]}
          >
            ₹{" "}
            {Math.round(returns)
              ? currencyRoundOff(Math.round(returns) - investment)
              : 0}
          </BaseText>
        </RowView>
        <RowView style={{}}>
          <BaseText
            style={[
              {
                fontSize: FontSize.h3,
                flex: 5,
                padding: 5,
                color: Colors[colorScheme].text,
              },
            ]}
          >
            Total Amount after {years} {years < 2 ? "Year" : "Years"}{" "}
          </BaseText>
        </RowView>
        <BaseText
          style={[
            {
              fontSize: FontSize.h1,
              flex: 6,
              padding: 5,
              color: Colors[colorScheme].text,
            },
          ]}
        >
          ₹ {Math.round(returns) ? currencyRoundOff(Math.round(returns)) : 0}
        </BaseText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    color: "white",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
