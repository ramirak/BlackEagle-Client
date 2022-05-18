import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, Text } from "react-native-web";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { registerNow } from "../components/FetchRequest";
import {
  checkEmail,
  checkName,
  checkPassword,
  checkConfirmPassword,
} from "../components/Errors";
import { SmallNaviButton } from "../components/Buttons";
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
            registerNow(email, name, password, navigation),
              checkEmail(email, setEmailError),
              checkName(name, setNameError),
              checkPassword(password, setPasswordError),
              checkConfirmPassword(
                password,
                confirmPassword,
                setConfirmPasswordError
              );
          }}
        >
          <Text style={global.ButtonText}>Register</Text>
        </Pressable>

        <SmallNaviButton
          navigation={navigation}
          page={"Login"}
          text={"Already have an account? Login"}
        />
      </View>
    </SafeAreaView>
  );
};

export default Register;
