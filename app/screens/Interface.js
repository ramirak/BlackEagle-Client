import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, KeyboardAvoidingView, View } from "react-native-web";
import colors from "../config/colors";

const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.MenuRow}>
        <Pressable
          style={styles.Button}
          onPress={() => navigation.navigate("Homepage")}
        >
          <Text style={styles.ButtonText}>Screenshots</Text>
        </Pressable>
        <Pressable
          style={styles.Button}
          onPress={() => navigation.navigate("Homepage")}
        >
          <Text style={styles.ButtonText}>Keylogs</Text>
        </Pressable>

        <Pressable
          style={styles.Button}
          onPress={() => navigation.navigate("Homepage")}
        >
          <Text style={styles.ButtonText}>Camera</Text>
        </Pressable>
      </View>
      <View style={styles.MenuRow}>
        <Pressable
          style={styles.Button}
          onPress={() => navigation.navigate("Homepage")}
        >
          <Text style={styles.ButtonText}>Recordings</Text>
        </Pressable>
        <Pressable
          style={styles.Button}
          onPress={() => navigation.navigate("Homepage")}
        >
          <Text style={styles.ButtonText}>Reports</Text>
        </Pressable>
        <Pressable
          style={styles.Button}
          onPress={() => navigation.navigate("Homepage")}
        >
          <Text style={styles.ButtonText}>Chats</Text>
        </Pressable>
      </View>
      <View style={styles.MenuRow}>
        <Pressable
          style={styles.Button}
          onPress={() => navigation.navigate("Homepage")}
        >
          <Text style={styles.ButtonText}>Locations</Text>
        </Pressable>
        <Pressable
          style={styles.Button}
          onPress={() => navigation.navigate("Homepage")}
        >
          <Text style={styles.ButtonText}>Alerts</Text>
        </Pressable>
        <Pressable
          style={styles.Button}
          onPress={() => navigation.navigate("Homepage")}
        >
          <Text style={styles.ButtonText}>Settings</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  MenuRow: { flex: 1, flexDirection: "row", margin: 3 },
  Button: {
    height: 100,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.primary,
  },
  ButtonText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
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
