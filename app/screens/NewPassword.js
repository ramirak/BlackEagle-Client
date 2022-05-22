import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, Text } from "react-native-web";
import { Ionicons } from "@expo/vector-icons";
import { handleNewPassword } from "../components/Errors";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const NewPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { email } = route.params;

  const checkNewPassForm = () => {
    if (
      handleNewPassword(
        password,
        setPasswordError,
        confirmPassword,
        setConfirmPasswordError
      )
    )
      updateNewPassword(email, password, navigation);
  };

  const updateNewPassword = (email, password, navigation) => {
    fetch("https://localhost:8010/users/" + email + "/" + password, {
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
        if (response.ok) navigation.navigate("Login");
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
              onEndEditing={(e) => handleValidPassword(e.nativeEvent.Text)}
            />
          </View>
          <Text style={global.ErrorMsg}>{passwordError}</Text>
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
          <Text style={global.ErrorMsg}>{confirmPasswordError}</Text>
          <Pressable
            style={global.LoginAndRegisterButton}
            onPress={() => checkNewPassForm}
          >
            <Text style={global.ButtonText}>Change Password</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewPassword;
