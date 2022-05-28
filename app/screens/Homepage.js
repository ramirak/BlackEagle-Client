import { React, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Button,
  Platform,
} from "react-native";
import colors from "../config/colors";
import { checkSession } from "../components/FetchRequest";

const Homepage = ({ navigation }) => { 
  /* The user will be redirected to Interface when doing refresh as long as he is logged on */
  useEffect(() => {
   checkSession(navigation)
  }, []);
  return (
    <SafeAreaView style={styles.Container}>
      <View>
        <Image
          style={{ width: 350, height: 270 }}
          source={require("../assets/be-logo.png")}
        />
        <StatusBar style="auto" />
      </View>

      <View style={styles.FixToText}>
        <View style={styles.ButtonContainer}>
          <Button
            style={styles.ButtonContainer}
            color="#000"
            title="Login"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <View style={styles.ButtonContainer}>
          <Button
            color="#000"
            title="Register"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
      <Text>© All Rights Reserved - Rami Rak & Liron Eli Shabtai </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 20 : 0,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  FixToText: {
    margin: 20,
  },
  ButtonContainer: {
    flex: 1,
    padding: 5,
    width: 200,
  },
});

export default Homepage;
