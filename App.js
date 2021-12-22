import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./app/screens/Homepage";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import Interface from "./app/screens/Interface";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Interface" component={Interface} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
