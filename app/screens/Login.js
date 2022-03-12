import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, StyleSheet, Text } from "react-native-web";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.HeaderText}>Black Eagle</Text>
      <View style={styles.loginContainer}>
        <View>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <Pressable
          style={styles.LoginButton}
          //onPress={LoginNow}
          onPress={() => navigation.navigate("Interface")}
        >
          <Text style={styles.ButtonText}>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const LoginNow = () => {
  fetch("https://localhost:8010/login", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        uid: "ramirak111@gmail.com",
        password: "123rrAvvads123@",
        }),
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("RESULTS HERE:", responseData);

      this.setState(
        {
          isLoading: false,
          dataSource: responseJson,
        },
        function () {}
      );
    })
    .catch((error) => {
      console.error(error);
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
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#FFC0CB",
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
    backgroundColor: "black",
  },
  ButtonText: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  HeaderText: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: "black",
  },
});
export default Login;
