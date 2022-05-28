import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, Text } from "react-native-web";
import { Ionicons } from "@expo/vector-icons";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const NewPassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkNewPasswordForm = () => {
    if (password != "" && confirmPassword != "" && password == confirmPassword)
      updateNewPassword(password, navigation);
    else alert("All fields are required and password should be confirmed");
  };

  const updateNewPassword = (password, navigation) => {
    fetch("https://localhost:8010/users/resetPassword", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) navigation.navigate("Login");
        else if (response.status == "406") alert("Invalid password");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  return (
    <SafeAreaView style={global.LoginAndRegisterPageContainer}>
      <View style={global.SecondLoginView}>
        <Text style={global.LoginAndRegisterHeaderText}>
          Choose a new password
        </Text>
        <View style={global.SecondLoginContainer}>
          <View>
            <Ionicons
              style={global.Icon}
              name="key-outline"
              size={sizes.iconSize}
              color={colors.loginAndRegisterIconColor}
            />
            <TextInput
              style={global.TextInput}
              placeholder="New Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <View>
            <Ionicons
              style={global.Icon}
              name="key-outline"
              size={sizes.iconSize}
              color={colors.loginAndRegisterIconColor}
            />
            <TextInput
              style={global.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(confirmPassword) =>
                setConfirmPassword(confirmPassword)
              }
            />
          </View>
          <Pressable
            style={global.LoginAndRegisterButton}
            onPress={() => checkNewPasswordForm()}
          >
            <Text style={global.ButtonText}>Change Password</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewPassword;
