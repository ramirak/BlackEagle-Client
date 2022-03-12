import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./app/screens/Homepage";
import Login from "./app/screens/Login";
import SecondLogin from "./app/screens/SecondLogin";
import Register from "./app/screens/Register";
import Interface from "./app/screens/Interface";
import ManageDevices from "./app/screens/ManageDevices";
import Reports from "./app/screens/Reports";
import Settings from "./app/screens/Settings";
import ChildMenu from "./app/screens/ChildMenu";
import Request from "./app/screens/Request";
import Notifications from "./app/screens/Notifications";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Second Login" component={SecondLogin} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Interface" component={Interface} />
        <Stack.Screen name="ManageDevices" component={ManageDevices} />
        <Stack.Screen name="Reports" component={Reports} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Child Menu" component={ChildMenu} />
        <Stack.Screen name="Request" component={Request} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
