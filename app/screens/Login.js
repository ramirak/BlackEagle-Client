import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, Text } from "react-native-web";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    if (email.length == 0) setEmailError("Email is required");
    else setEmailError("");

    if (password.length == 0) setPasswordError("Password is required");
    else setPasswordError("");
  };

  return (
    <SafeAreaView style={global.LoginAndRegisterPageContainer}>
      <Text style={global.LoginAndRegisterHeaderText}>Black Eagle</Text>
      <View style={global.LoginAndRegisterContainer}>
        <View>
          <MaterialIcons
            style={global.Icon}
            name="email"
            size={sizes.iconSize}
            color={colors.loginAndRegisterIconColor}
          />
          <TextInput
            style={global.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <Text style={global.ErrorMsg}>{emailError}</Text>
        <View>
          <Ionicons
            style={global.Icon}
            name="key-outline"
            size={sizes.iconSize}
            color={colors.loginAndRegisterIconColor}
          />
          <TextInput
            style={global.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <Text style={global.ErrorMsg}>{passwordError}</Text>
        <Pressable
          style={global.LoginAndRegisterButton}
          onPress={() => {
            loginNow(email, password, navigation), handleLogin();
          }}
        >
          <Text style={global.ButtonText}>Login</Text>
        </Pressable>
        <Pressable
          style={global.SmallButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={global.SmallButtonText}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
        <Pressable
          style={global.SmallButton}
          onPress={() =>
            navigation.navigate("Forgot Password", { email: "email" })
          }
        >
          <Text style={global.SmallButtonText}>Forgot Password?</Text>
        </Pressable>
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
      if (response.ok) navigation.navigate("Second Login", { email: email });
      else throw new Error(response.status);
    })
    .catch((error) => {
      console.log("error: " + error);
    });
};

export default Login;
