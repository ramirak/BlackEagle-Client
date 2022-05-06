import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, Text } from "react-native-web";
import { Ionicons } from "@expo/vector-icons";
import { checkKey } from "../components/Errors";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const KeyViaEmail = ({ navigation, route }) => {
  const [oneTimeKey, setOneTimeKey] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { email } = route.params;

  const verifyKey = (email, navigation) => {
    fetch("https://localhost:8010/users/reset/" + email + oneTimeKey, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        oneTimeKey: oneTimeKey
      }),
    })
      .then((response) => {
        if (response.ok) navigation.navigate("New Password");
        else checkKey(password, setPasswordError);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  return (
    <SafeAreaView style={global.LoginAndRegisterPageContainer}>
      <View style={global.SecondLoginView}>
        <Text style={global.LoginAndRegisterHeaderText}>
          Please enter the code you received in the email
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
              placeholder="One Time Key"
              placeholderTextColor="#003f5c"
              onChangeText={(oneTimeKey) => setOneTimeKey(oneTimeKey)}
            />
          </View>
          <Text style={global.ErrorMsg}>{passwordError}</Text>
          <Pressable
            style={global.LoginAndRegisterButton}
            onPress={() => [verifyKey(email, password, oneTimeKey, navigation)]}
          >
            <Text style={global.ButtonText}>Verify</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default KeyViaEmail;
