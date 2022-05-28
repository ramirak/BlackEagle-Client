import { React, useState, useEffect } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, Text } from "react-native-web";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { checkSession, LoginNow } from "../components/FetchRequest";
import { SmallNaviButton } from "../components/Buttons";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    checkSession(navigation);
  }, []);

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
        <Pressable
          style={global.LoginAndRegisterButton}
          onPress={() => {
            LoginNow(email, password, navigation);
          }}
        >
          <Text style={global.ButtonText}>Login</Text>
        </Pressable>
        <SmallNaviButton
          navigation={navigation}
          page={"Register"}
          text={"Don't have an account? Sign Up"}
        />
        <SmallNaviButton
          navigation={navigation}
          page={"Forgot Password"}
          text={"Forgot Password?"}
          email={email}
        />
        <SmallNaviButton
          navigation={navigation}
          page={"Homepage"}
          text={"Back to Homepage"}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
