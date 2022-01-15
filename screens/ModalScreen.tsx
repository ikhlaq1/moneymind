import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import LottieView from 'lottie-react-native';
import BaseText from '../components/customCompoents/BaseText';
import { CommonProperties, FontSize } from '../components/styles';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export default function ModalScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <LottieView
            style={{
              height: 300,
              marginBottom:40
            }}
            source={require('../assets/lottie/contact.json')}
            autoPlay
          />
      <BaseText style={[{fontSize:FontSize.h3,flex:4, padding:5, color:Colors[colorScheme].text}]}>Contact Me</BaseText>


      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
