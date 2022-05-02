import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, Text } from "react-native-web";
import { Feather } from '@expo/vector-icons';
import colors from "../config/colors";
import sizes from "../config/sizes";
import global from "../config/global";

const SecondLogin = ({ navigation, route }) => {
  const [password, setPassword] = useState("");
  const { email } = route.params;
  
  return (
    <SafeAreaView style={global.LoginAndRegisterPageContainer}>
      <View style={global.SecondLoginView}>
        <Text style={global.LoginAndRegisterHeaderText}>We have sent you one time key via email</Text>
        <View style={global.SecondLoginContainer}>
          <View>
          <Feather style={global.Icon} name="key" size={sizes.iconSize} color={colors.loginAndRegisterIconColor} />
            <TextInput
              style={global.TextInput}
              placeholder="One time key"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <Pressable
            style={global.LoginAndRegisterButton}
            onPress={() => [loginNow(email, password, navigation)]}
          >
            <Text style={global.ButtonText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const loginNow = (email, password, navigation) => {
  fetch("https://localhost:8010/login", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: email,
      password: password,
    }),
  })
    .then((response) => {
      if (response.ok)
        navigation.navigate("Interface",  { email:email });
      else throw new Error(response.status);
    })
    .catch((error) => {
      console.log("error: " + error);
    });
};

export default SecondLogin;
