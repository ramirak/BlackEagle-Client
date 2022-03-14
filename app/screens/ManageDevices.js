import { React } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text } from "react-native-web";
import colors from "../config/colors";
import global from "../config/global";
const ManageDevices = ({ navigation }) => {
  return (
    <SafeAreaView style={global.pageContainer}>
      <View>
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
  Button: {
    height: 100,
    width: 150,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: colors.primary,
    elevation: 3,
    backgroundColor: colors.secondary,
  },
  ButtonText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: colors.primary,
  },
  HeaderText: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: colors.primary,
  },
});

export default ManageDevices;
