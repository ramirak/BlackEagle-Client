import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, StyleSheet, Text } from "react-native-web";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
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
    email: '',
    password: '',
    confirmPassword: '',
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  });

  const handleValidPassword = (password) => {
    if(password.trim().length >= 8) {
      setData({
        ...data,
        isValidPassword: true
      });
    }else{
      setData({
        ...data,
        isValidPassword: false
      });
    }
  }

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.HeaderText}>New User</Text>
      <View style={styles.loginContainer}>
        <View>
          <MaterialIcons
            style={global.icon}
            name="email"
            size={sizes.iconSize}
            color={colors.loginAndRegisterIconColor}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        {data.isValidEmail ? null:        
        <Text style={global.errorMsg}>Invalid email</Text>
        }
        <View>
          <Ionicons
            style={global.icon}
            name="key-outline"
            size={sizes.iconSize}
            color={colors.loginAndRegisterIconColor}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            onEndEditing={(e)=>handleValidPassword(e.nativeEvent.Text)}
          />
        </View>
        {data.isValidPassword ? null:
        <Text style={global.errorMsg}>Password must be at least 8 characters long</Text>
        }
        <View>
          <Ionicons
            style={global.icon}
            name="key-outline"
            size={sizes.iconSize}
            color={colors.loginAndRegisterIconColor}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
          />
          {data.isValidConfirmPassword ? null:  
          <Text style={global.errorMsg}>Invalid ConfrimPassword</Text>
          }
        </View>
        <View>
          <MaterialCommunityIcons
            style={global.icon}
            name="lightbulb-on-outline"
            size={sizes.iconSize}
            color={colors.loginAndRegisterIconColor}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Password Hint"
            placeholderTextColor="#003f5c"
            onChangeText={(hint) => setHint(hint)}
          />
        </View>
        <Pressable
          style={styles.RegisterButton}
          onPress={RegisterNow(email, password, hint, navigation)}
        >
          <Text style={styles.ButtonText}>Register</Text>
        </Pressable>
        <Pressable
            style={global.smallButton}
            onPress={() => navigation.navigate("Login")}
          >
          <Text style={global.smallButtonText}>Already have an account? Login</Text>
          </Pressable>
      </View>
    </SafeAreaView>
  );
};

const RegisterNow = (email, password, hint, navigation) => {
  fetch("http://localhost:8010/users/register", {
    method: "POST",
    headers: {
      "Accept": "application/json",
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

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  loginContainer: {
    flex: 1,
    width: "25%",
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
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    paddingRight: 40,
  },
  RegisterButton: {
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
export default Register;
