import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native-web";
import { AntDesign } from "@expo/vector-icons";
import Homepage from "./app/screens/Homepage";
import Login from "./app/screens/Login";
import SecondLogin from "./app/screens/SecondLogin";
import ForgotPassword from "./app/screens/ForgotPassword";
import KeyViaEmail from "./app/screens/KeyViaEmail";
import NewPassword from "./app/screens/NewPassword";
import Register from "./app/screens/Register";
import Interface from "./app/screens/Interface";
import Settings from "./app/screens/Settings";
import ControlOptions from "./app/screens/ControlOptions";
import Requests from "./app/screens/Requests";
import DeviceConfiguration from "./app/screens/DeviceConfiguration";
import Notifications from "./app/screens/Notifications";
import Help from "./app/screens/Help";
import About from "./app/screens/About";
import Upgrade from "./app/screens/Upgrade";
import fonts from "./app/config/fonts";
import AppDownload from "./app/screens/AppDownload";
import sizes from "./app/config/sizes";

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          title: "BlackEagle - Spy & Control - Securely",
          headerTitleStyle: {
            fontWeight: "bold",
            fontFamily: fonts.primary,
          },
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <AntDesign name="Safety" size={sizes.iconSize} color="#00701a" />
            </View>
          ),
        }}
      >
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Second Login" component={SecondLogin} />
        <Stack.Screen name="Forgot Password" component={ForgotPassword} />
        <Stack.Screen name="Key Via Email" component={KeyViaEmail} />
        <Stack.Screen name="New Password" component={NewPassword} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Interface" component={Interface} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Control Options" component={ControlOptions} />
        <Stack.Screen name="Requests" component={Requests} />
        <Stack.Screen
          name="Device Configuration"
          component={DeviceConfiguration}
        />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Upgrade" component={Upgrade} />
        <Stack.Screen name="AppDownload" component={AppDownload} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
