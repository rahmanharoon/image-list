import React from "react";
import MainScreen from "./src/screens/MainScreen";
import ImageScreen from "./src/screens/ImageScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack/lib/typescript/src/types";

// Define the stack navigator's parameter types
type StackParamList = {
  MainScreen: undefined;
  ImageScreen: {
    uri: string;
  };
};

// Define the navigation options for each screen
const screenOptions: StackNavigationOptions = {
  headerShown: false, // Hide the header for all screens
};

// Create the stack navigator
const Stack = createStackNavigator<StackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName="MainScreen"
      >
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="ImageScreen" component={ImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
