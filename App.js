import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./app/screens/Homepage";
import Login from "./app/screens/Login";
import SecondLogin from "./app/screens/SecondLogin";
import ForgotPassword from "./app/screens/ForgotPassword"
import KeyViaEmail from "./app/screens/KeyViaEmail";
import NewPassword from "./app/screens/NewPassword";
import Register from "./app/screens/Register";
import Interface from "./app/screens/Interface";
import Reports from "./app/screens/Reports";
import Settings from "./app/screens/Settings";
import ControlOptions from "./app/screens/ControlOptions";
import ImmediatelyRequest from "./app/screens/ImmediatelyRequest";
import NotImmRequest from "./app/screens/NotImmRequest";
import Request from "./app/screens/Request";
import Notifications from "./app/screens/Notifications";
import Help from "./app/screens/Help";
import About from "./app/screens/About";
import Upgrade from "./app/screens/Upgrade";
import { AntDesign } from '@expo/vector-icons'; 
import { View } from "react-native-web";
import fonts from "./app/config/fonts";
import AppDownload from "./app/screens/AppDownload";
const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{
        headerShown: true,
        title: 'BlackEagle - Spy & Control - Securely',
        headerTitleStyle: {
          fontWeight: 'bold', fontFamily: fonts.primary
        },
            headerLeft: () => <View style={{paddingLeft:15}}><AntDesign name="Safety" size={26} color="#00701a" /></View>,
      }}>
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Second Login" component={SecondLogin} />
        <Stack.Screen name="Forgot Password" component={ForgotPassword} />
        <Stack.Screen name="Key Via Email" component={KeyViaEmail} />
        <Stack.Screen name="New Password" component={NewPassword} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Interface" component={Interface} />
        <Stack.Screen name="Reports" component={Reports} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Control Options" component={ControlOptions} />
        <Stack.Screen name="Immediately Request" component={ImmediatelyRequest} />
        <Stack.Screen name="Not Immediately Request" component={NotImmRequest} />
        <Stack.Screen name="Request" component={Request} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Upgrade" component={Upgrade} />
        <Stack.Screen name="AppDownload" component={AppDownload} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
