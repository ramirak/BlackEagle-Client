import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, StyleSheet, Text } from "react-native-web";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.HeaderText}>Black Eagle</Text>
      <View style={styles.loginContainer}>
        <View>
          <MaterialIcons
            style={global.icon}
            name="email"
            size={sizes.iconSize}
            color={colors.loginAndRegisterIconColor}
          />
          <TextInput
            style={global.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View>
          <Ionicons
            style={global.icon}
            name="key-outline"
            size={sizes.iconSize}
            color={colors.loginAndRegisterIconColor}
          />
          <TextInput
            style={global.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <Pressable
          style={styles.LoginButton}
          onPress={() => [LoginNow(email, password, navigation)]}
        >
          <Text style={styles.ButtonText}>Login</Text>
        </Pressable>
        <Pressable
            style={global.smallButton}
            onPress={() => navigation.navigate("Register")}
          >
          <Text style={global.smallButtonText}>Don't have an account? Sign Up</Text>
          </Pressable>
        <Pressable
            style={global.smallButton}
            onPress={() => navigation.navigate("Control Panel", { email: "email" })}
          >
          <Text style={global.smallButtonText}>Forgot Password?</Text>
          </Pressable>
      </View>
    </SafeAreaView>
  );
};

const LoginNow = (email, password, navigation) => {
  fetch("https://localhost:8010/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Accept": "application/json",
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

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  loginContainer: {
    flex: 1,
    width: "25%",
    margin: 5,
    backgroundColor: colors.secondary,
    justifyContent: "center",
  },
  inputView: {
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  LoginButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.primary,
    margin: 10,
  },
  ButtonText: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: colors.secondary,
  },
  HeaderText: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: colors.primary,
    fontWeight: "bold",
    marginTop: 5,
  },
});
export default Login;
