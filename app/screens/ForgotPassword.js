import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, StyleSheet, Text } from "react-native-web";
import colors from "../config/colors";
import global from "../config/global";
import { MaterialIcons } from '@expo/vector-icons';

const ForgotPassword = ({ navigation, route }) => {
  const { email } = route.params;

  const [password, setPassword] = useState("");
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.loginView}>
        <Text style={styles.HeaderText}>Please enter your account email to reset your password</Text>
        <View style={styles.loginContainer}>
          <View>
          <MaterialIcons
            style={global.icon}
            name="email"
            size={26}
            color="pink"
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Email account"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
          <Pressable
            style={styles.LoginButton}
            //onPress={LoginNow}
            //onPress={() => [LoginNow(email, password, navigation)]}
          >
            <Text style={styles.ButtonText}>Password Reset</Text>
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

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  loginView:{
    flex: 1,
    flexDirection:"col",
    marginTop:10,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    marginTop: 10,
  },
  inputView: {
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  LoginButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.primary,
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
  },
});
export default ForgotPassword;
