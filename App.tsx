import { StatusBar } from 'expo-status-bar';
import { Text,View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import BaseText from './components/customCompoents/BaseText';
import { CommonProperties, FontSize } from './components/styles';
import { useEffect, useState } from 'react';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [hideAnimation, setHideAnimation] = useState(true)
  const colorScheme = useColorScheme();

  useEffect(() => {
    const timer = setTimeout(() => {
    setHideAnimation(false)
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoadingComplete) {
    return(
      <SafeAreaProvider>
          <View style={{
              flex:1,
              justifyContent:'center',
            }}></View>
            </SafeAreaProvider>
    )
   
  } else {
    if(hideAnimation){
      return (
        <SafeAreaProvider>
          <View style={{
              flex:1,
              justifyContent:'center',
            }}>
          <BaseText style={[{...CommonProperties.h2, fontSize:FontSize.h1, padding:25, color:'#118C4F'}]} >The rich invest their money and spend what is left; the poor spend their money and invest what is left.</BaseText>
  
          <LottieView
            style={{
              width: 500,
              height: 400,
            }}
            source={require('./assets/lottie/moneyTree.json')}
            autoPlay
          />
          </View>
        
        </SafeAreaProvider>
      );
    }
    else{
      return (
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      );
    }
   
  }
}
