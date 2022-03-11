import { React } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text } from "react-native-web";
import colors from "../config/colors";

const ManageDevices = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.Test}>
        <Pressable
          style={styles.Button}
          onPress={() => navigation.navigate("Homepage")}
          >
          <Text style={styles.ButtonText}>Test</Text>
        </Pressable>
      </View>
      </SafeAreaView>
      );
};

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: "left",
    justifyContent: "space-evenly",
  },
  Test: { flex: 1, flexDirection: "col", left: 700},
  Button: {
    height: 100,
    width: 150,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: colors.borderColor,
    elevation: 3,
    backgroundColor: colors.backgroundButton,
  },
  ButtonText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "black",
  },
  HeaderText: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: "black",
  },
});

export default ManageDevices;
