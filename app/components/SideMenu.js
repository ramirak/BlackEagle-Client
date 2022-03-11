import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TextInput, StyleSheet, Text } from "react-native-web";
import colors from "../config/colors";

const SideMenu = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.ParentMenu}>
        <Pressable
          style={styles.MenuButton}
          onPress={() => navigation.navigate("Settings")}
        >
          Settings
        </Pressable>

        <Pressable
          style={styles.MenuButton}
          onPress={() => navigation.navigate("Reports")}
        >
          Reports
        </Pressable>

        <Pressable
          style={styles.MenuButton}
          onPress={() => navigation.navigate("Notifications")}
        >
          Notifications
        </Pressable>

        <Pressable
          style={styles.MenuButton}
          onPress={() => navigation.navigate("Homepage")}
        >
          Logout
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ParentMenu: {
    flex: 1,
    flexDirection: "col",
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  MenuButton: {
    height: 50,
    width: 150,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderColor: colors.borderColor,
    backgroundColor: colors.backgroundButton,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "white",
  },
});
export default SideMenu;
