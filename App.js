import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import { CryptoDetail, Transaction } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Tabs from "./navigation/tabs";
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  React.useEffect(()=>{
    SplashScreen.hideAsync()},[])
  



  return (
    
      
      
        <NavigationContainer>
          <StatusBar style='auto'/>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,

            }}
            initialRouteName={'Home'}
          >
            <Stack.Screen
              name="Home"
              component={Tabs}
            />
            <Stack.Screen
              name="CryptoDetail"
              component={CryptoDetail}
            />
            <Stack.Screen
              name="Transaction"
              component={Transaction}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )
  ;
}