import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, Text } from "react-native-web";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleRegister = () => {
    if (email.length < 6) setEmailError("Email should be minimum 6 characters");
    else if (email.indexOf(" ") >= 0)
      setEmailError("Email cannot contain spaces");
    else setEmailError("");

    if (name.length < 2) setNameError("Name should be minimum 2 characters");
    else setNameError("");

    if (password.length < 10)
      setPasswordError("Password should be minimum 10 characters");
    else if (password.indexOf(" ") >= 0)
      setPasswordError("Password cannot contain spaces");
    else setPasswordError("");

    if (confirmPassword != password)
      setConfirmPasswordError("Confirmed password and password are not the same");
    else setConfirmPasswordError("");
  };

  return (
    <SafeAreaView style={global.LoginAndRegisterPageContainer}>
      <Text style={global.LoginAndRegisterHeaderText}>New User</Text>
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
          <MaterialIcons
            style={global.Icon}
            name="drive-file-rename-outline"
            size={sizes.iconSize}
            color={colors.loginAndRegisterIconColor}
          />
          <TextInput
            style={global.TextInput}
            placeholder="Name"
            placeholderTextColor="#003f5c"
            value={name}
            onChangeText={(name) => setName(name)}
          />
        </View>
        <Text style={global.ErrorMsg}>{nameError}</Text>
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
        <View>
          <Ionicons
            style={global.Icon}
            name="key-outline"
            size={sizes.iconSize}
            color={colors.loginAndRegisterIconColor}
          />
          <TextInput
            style={global.TextInput}
            placeholder="Confirm password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
          />
        </View>
        <Text style={global.ErrorMsg}>{confirmPasswordError}</Text>
        <Pressable
          style={global.LoginAndRegisterButton}
          onPress={() => {
            registerNow(email, name, password, navigation), handleRegister();
          }}
        >
          <Text style={global.ButtonText}>Register</Text>
        </Pressable>
        <Pressable
          style={global.SmallButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={global.SmallButtonText}>
            Already have an account? Login
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const registerNow = (email, name, password, navigation) => {
  fetch("https://localhost:8010/users/register", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: {
        uid: email,
        password: {
          password: password,
        },
      },
      role: "PLAYER",
      name: name,
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

export default Register;
