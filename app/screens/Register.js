import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, Text, StyleSheet } from "react-native-web";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { registerNow } from "../components/FetchRequest";
import { SmallNaviButton } from "../components/Buttons";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkRegisterForm = () => {
    if (
      email != "" &&
      name != "" &&
      password != "" &&
      confirmPassword != "" &&
      password == confirmPassword
    )
      registerNow(email, name, password, navigation);
    else alert("All fields are required and password should be confirmed");
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
        <Pressable
          style={global.LoginAndRegisterButton}
          onPress={() => {
            checkRegisterForm();
          }}
        >
          <Text style={global.ButtonText}>Register</Text>
        </Pressable>

        <SmallNaviButton
          navigation={navigation}
          page={"Login"}
          text={"Already have an account? Login"}
        />
        <View style={{ textAlign: "left" }}>
          <Text style={styles.TextHeader}>{"\n"}You must enter:</Text>
          <Text>
            * Valid email address format.{"\n"}* Not empty name.{"\n"}* Password
            length of at least 10 characters.{"\n"}* Password with at least one
            uppercase.{"\n"}* Password with at least one lowercase.{"\n"}*
            Password with at least one number.{"\n"}* Password with at least one
            special character.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  TextHeader: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.ErrorTextColor,
  },
});

export default Register;
