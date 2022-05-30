import { useState, useEffect } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { Slider } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import BaseText from "../components/customCompoents/BaseText";
import { CommonProperties, FontSize } from "../components/styles";
import RowView from "../components/customCompoents/RowView";
import LottieView from "lottie-react-native";

export default function SipCalculator({ navigation }) {
  const colorScheme = useColorScheme();
  const [investment, setInvestment] = useState(0);
  const [years, setYears] = useState(0);
  const [percentage, setPercentage] = useState(0);
  let futureValue = 0;
  let principal = investment;
  let period = years;
  let freq = 1;
  let rateofreturn = percentage;
  let instalment_amount = principal;
  let no_of_compounding_periods = (12 / freq) * period;
  let int_rate_per_period = rateofreturn / (12 / freq) / 100;
  let total_amount_invested = period * instalment_amount * 12;
  futureValue =
    instalment_amount *
    ((Math.pow(1 + int_rate_per_period, no_of_compounding_periods) - 1) /
      int_rate_per_period) *
    (1 + int_rate_per_period);

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
    <View style={styles.container}>
      <View style={{ paddingLeft: 0 }}>
        <LottieView
          style={{
            height: 300,
            marginBottom: 40,
          }}
          source={require("../assets/lottie/sip.json")}
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
            I want to invest monthly
          </BaseText>
          <BaseText
            style={[
              {
                fontSize: FontSize.h2,
                flex: 2,
                padding: 5,
                color: Colors[colorScheme].text,
              },
            ]}
          >
            ₹ {investment}
          </BaseText>
        </RowView>
        <Slider
          value={investment}
          onValueChange={setInvestment}
          maximumValue={100000}
          minimumValue={0}
          step={1000}
          allowTouchTrack
          minimumTrackTintColor={Colors[colorScheme].secondary}
          maximumTrackTintColor={Colors[colorScheme].text}
          trackStyle={{ height: 5, backgroundColor: "transparent" }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
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
            For a Period of :
          </BaseText>
          <BaseText
            style={[
              {
                fontSize: FontSize.h2,
                flex: 2,
                padding: 5,
                color: Colors[colorScheme].text,
              },
            ]}
          >
            {years} Yrs
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
          thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
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
            Expected Returns :
          </BaseText>
          <BaseText
            style={[
              {
                fontSize: FontSize.h2,
                flex: 2,
                padding: 5,
                color: Colors[colorScheme].text,
              },
            ]}
          >
            {percentage} %
          </BaseText>
        </RowView>
        <Slider
          value={percentage}
          onValueChange={setPercentage}
          maximumValue={100}
          minimumValue={0}
          step={1}
          allowTouchTrack
          minimumTrackTintColor={Colors[colorScheme].secondary}
          maximumTrackTintColor={Colors[colorScheme].text}
          trackStyle={{ height: 5, backgroundColor: "red" }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
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
          Your Investment
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
          {Math.round(total_amount_invested)
            ? currencyRoundOff(Math.round(total_amount_invested))
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
          Your Gains{" "}
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
          {Math.round(futureValue - total_amount_invested)
            ? currencyRoundOff(Math.round(futureValue - total_amount_invested))
            : 0}
        </BaseText>
      </RowView>
      <BaseText
        style={[
          {
            fontSize: 40,
            flex: 1,
            padding: 5,
            color: Colors[colorScheme].text,
          },
        ]}
      >
        ₹{" "}
        {Math.round(futureValue)
          ? currencyRoundOff(Math.round(futureValue))
          : 0}{" "}
      </BaseText>
    </View>
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
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
