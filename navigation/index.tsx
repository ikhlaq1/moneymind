/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Platform, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SipCalculator from '../screens/SipCalculator';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: {backgroundColor: Colors[colorScheme].background,
      },
    }} >
      <Stack.Screen name="Root" component={BottomTabNavigator}  options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="sip" component={SipCalculator} options={{ 
        title: 'SIP calculator', 
      
        
        }} />

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Contact" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].secondary,
        tabBarStyle: {
          backgroundColor: '#fff', 
          paddingVertical: Platform.OS === 'ios' ? 10 : 0,
          borderRadius: 40, 
          paddingBottom:10,
          borderTopWidth: 0, 
          position: 'absolute',
          left: 40,
          right: 40,
          bottom: 15,
          height:60
        }
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          headerShown: true,
          title:'Calculators',
          tabBarShowLabel:false,
          headerStyle: {
            backgroundColor: Colors[colorScheme].background,
            shadowColor: 'transparent' 
          },
          headerTintColor: Colors[colorScheme].text,
          tabBarIcon: ({ color }) => <TabBarIcon name="calculator" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Contact')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="envelope"
                size={25}
                color={Colors[colorScheme].secondary}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          headerShown: true,
          tabBarShowLabel:false,
          title:'Notifications',
          headerTintColor: Colors[colorScheme].text,
          headerStyle: {
            backgroundColor: Colors[colorScheme].background,
            shadowColor: 'transparent',
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />
       <BottomTab.Screen
        name="News"
        component={TabTwoScreen}
        options={{
          headerShown: true,
          tabBarShowLabel:false,
          title:'News',
          headerTintColor: Colors[colorScheme].text,
          headerStyle: {
            backgroundColor: Colors[colorScheme].background,
            shadowColor: 'transparent',
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="newspaper-o" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome  size={30}     style={{ padding: 0 }}
  {...props} />;
}
