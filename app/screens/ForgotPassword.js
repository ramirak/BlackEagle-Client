import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, Text } from "react-native-web";
import { MaterialIcons } from '@expo/vector-icons';
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const ForgotPassword = ({ navigation, route }) => {
  const { email } = route.params;
  const [password, setPassword] = useState("");
  
  return (
    <SafeAreaView style={global.LoginAndRegisterPageContainer}>
      <View style={global.SecondLoginView}>
        <Text style={global.LoginAndRegisterHeaderText}>Please enter your account email to reset your password</Text>
        <View style={global.SecondLoginContainer}>
          <View>
          <MaterialIcons
            style={global.Icon}
            name="email"
            size={sizes.iconSize}
            color={colors.loginAndRegisterIconColor}
          />
          <TextInput
            style={global.TextInput}
            placeholder="Email account"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
          <Pressable
            style={global.LoginAndRegisterButton}
            //onPress={LoginNow}
            //onPress={() => [LoginNow(email, password, navigation)]}
          >
            <Text style={global.ButtonText}>Password Reset</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const LoginNow = (email, password, navigation) => {
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
        navigation.navigate("Interface");
      else throw new Error(response.status);
    })
    .catch((error) => {
      console.log("error: " + error);
    });
};

export default ForgotPassword;
