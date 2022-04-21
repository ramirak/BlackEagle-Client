import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, Text } from "react-native-web";
import { Ionicons } from "@expo/vector-icons";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const NewPassword = ({ navigation, route }) => {
  const [oneTimeKey, setOneTimeKey] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hint, setHint] = useState("");
  const { email } = route.params;

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
        <View>
          <MaterialCommunityIcons
            style={global.Icon}
            name="lightbulb-on-outline"
            size={sizes.iconSize}
            color={colors.loginAndRegisterIconColor}
          />
          <TextInput
            style={global.TextInput}
            placeholder="Password Hint"
            placeholderTextColor="#003f5c"
            onChangeText={(hint) => setHint(hint)}
          />
        </View>
          <Pressable
            style={global.LoginAndRegisterButton}
            onPress={() => [updateNewPassword(email, password, hint, navigation)]}
          >
            <Text style={global.ButtonText}>Change Password</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const updateNewPassword = (email, password, hint, navigation) => {
  fetch("https://localhost:8010/users/" + email + "/" + password + "/" + hint, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: email,
      password: password,
      hint: hint
    }),
  })
    .then((response) => {
      if (response.ok) navigation.navigate("Login");
      else throw new Error(response.status);
    })
    .catch((error) => {
      console.log("error: " + error);
    });
};

export default NewPassword;