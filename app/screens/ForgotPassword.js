import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, Text } from "react-native-web";
import { MaterialIcons } from "@expo/vector-icons";
import { checkEmail } from "../components/Errors";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const checkForgotForm = () => {
    if (checkEmail(email, setEmailError)) resetPassword(email, navigation);
  };

  const resetPassword = (email, navigation) => {
    fetch("https://localhost:8010/users/sendOTK/" + email, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok)
          navigation.navigate("Key Via Email", { email: email });
        else checkEmail(email, setEmailError);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  return (
    <SafeAreaView style={global.LoginAndRegisterPageContainer}>
      <View style={global.SecondLoginView}>
        <Text style={global.LoginAndRegisterHeaderText}>
          Please enter your account email to reset your password
        </Text>
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
          <Text style={global.ErrorMsg}>{emailError}</Text>
          <Pressable
            style={global.LoginAndRegisterButton}
            onPress={() => checkForgotForm()}
          >
            <Text style={global.ButtonText}>Password Reset</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
