import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, Text } from "react-native-web";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hint, setHint] = useState("");
  const [error, setErrors] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  });

  const handleValidPassword = (password) => {
    if (password.trim().length >= 8) {
      setData({
        ...data,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        isValidPassword: false,
      });
    }
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
            onChangeText={(email) => setEmail(email)}
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
            placeholder="Password"
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
          onPress={RegisterNow(email, password, hint, navigation)}
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

const RegisterNow = (email, password, hint, navigation) => {
  fetch("http://localhost:8010/users/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: {
        uid: email,
        password: {
          password: password,
          hint: hint,
        },
      },
      role: "PLAYER",
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
