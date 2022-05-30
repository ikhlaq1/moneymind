import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import BaseText from "../components/customCompoents/BaseText";
import LottieView from "lottie-react-native";
import { CommonProperties, FontSize } from "../components/styles";

export default function TabOneScreen({ navigation }) {
  const colorScheme = useColorScheme();

  const [dataSource, setDataSource] = useState([
    {
      id: "mutual",
      name: "Mutual Fund",
      fontName: require("../assets/lottie/mutual.json"),
    },
    {
      id: "sip",
      name: "SIP Calculator",
      fontName: require("../assets/lottie/settings.json"),
    },
    {
      id: "lumpsum",
      name: "LumpSum",
      fontName: require("../assets/lottie/sipCal.json"),
    },

    {
      id: "fixed",
      name: "Fixed Deposit",
      fontName: require("../assets/lottie/fixed.json"),
    },
    // {
    //   id: "NotFound",
    //   name: "Retirement",
    //   fontName: require("../assets/lottie/retire.json"),
    // },
    // {
    //   id: "NotFound",
    //   name: "Retirement SIP",
    //   fontName: require("../assets/lottie/Money.json"),
    // },
  ]);

  return (
    <View style={styles.container}>
      {dataSource && (
        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(item.id);
                }}
                style={{
                  flex: 1,
                  backgroundColor: "#EAFEAC",
                  width: "80%",
                  height: "70%",
                  alignItems: "center",
                  borderRadius: 20,
                  marginBottom: 50,
                  marginTop: 10,
                }}
              >
                <LottieView
                  style={{
                    alignSelf: "center",
                    width: "80%",
                    height: "100%",
                  }}
                  source={item.fontName}
                  autoPlay={true}
                />
                {/* <FontAwesome
                name={item.fontName}
                size={45}
                color={Colors[colorScheme].background}
                style={{
                  alignSelf: 'center',
              }}
              /> */}
                <BaseText
                  style={[
                    {
                      ...CommonProperties.h3,
                      paddingTop: 10,
                      fontSize: FontSize.h4,
                      flex: 4,
                      padding: 5,
                      color: Colors[colorScheme].text,
                    },
                  ]}
                >
                  {item.name}
                </BaseText>
              </TouchableOpacity>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item) => item.name}
          // renderItem={({ item }) => (
          //   <View
          //   style={{
          //     alignItems: 'center',
          //     padding: 5,
          //     flexGrow: 1,
          //   }}
          // >
          //   <TouchableOpacity
          //       onPress={() => {
          //         navigation.navigate('sip')
          //       }}

          //   style={{
          //     backgroundColor:'#EAFEAC',
          //     width:'65%',
          //     height:'60%',
          //     borderRadius:20
          //   }}>

          // <LottieView
          //     style={{
          //       alignSelf:'center',
          //       width:'80%',
          //       height:'80%'
          //     }}
          //     source={item.fontName}
          //     autoPlay
          //   />
          //     {/* <FontAwesome
          //         name={item.fontName}
          //         size={45}
          //         color={Colors[colorScheme].background}
          //         style={{
          //           alignSelf: 'center',
          //       }}
          //       /> */}
          //       <BaseText style={[{...CommonProperties.h3,paddingTop:10, fontSize:FontSize.h4,flex:4, padding:5, color:Colors[colorScheme].text}]}>{item.name}</BaseText>

          //   </TouchableOpacity>

          //   </View>
          // )}
          //Setting the number of column
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
