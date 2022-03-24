import React from "react";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Button,
  Platform,
} from "react-native";

const Homepage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={{ width: 350, height: 270 }}
          source={require("../assets/be-logo.png")}
        />
        <StatusBar style="auto" />
      </View>

      <View style={styles.fixToText}>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonContainer}
            color="#000"
            title="Login"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color="#000"
            title="Register"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color="#000"
            title="Test"
            onPress={() => navigation.navigate("Interface", { name: "rami" })} //TODOOOOOOOOOOOOOOOOOOOOOOOO
          />
        </View>
      </View>
      <Text>© All Rights Reserved - Rami Rak & Liron Eli Shabtai </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 20 : 0,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  fixToText: {
    margin: 20,
  },
  buttonContainer: {
    flex: 1,
    padding: 5,
    width: 200,
  },
});

export default Homepage;
