import { React } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text } from "react-native-web";
import colors from "../config/colors";
import SideMenu from "../components/SideMenu";
import global from "../config/global";
const Settings = ({ navigation }) => {
  return (
    <SafeAreaView style={global.pageContainer}>
      <SideMenu navigation={navigation} />
      <View style={global.rightContainer}>
        <View style={global.headerMenu}>
          <Text style={global.headerText}>Account Settings</Text>
        </View>
        <View style={global.rightMenu}>
          <View style={styles.MenuRow}>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request")}
            >
              <Text style={styles.ButtonText}>Update Password</Text>
            </Pressable>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request")}
            >
              <Text style={styles.ButtonText}>Update Name</Text>
            </Pressable>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request")}
            >
              <Text style={styles.ButtonText}>Notification Settings</Text>
            </Pressable>
          </View>
          <View style={styles.MenuRow}>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request")}
            >
              <Text style={styles.ButtonText}>Security</Text>
            </Pressable>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request")}
            >
              <Text style={styles.ButtonText}>Logs</Text>
            </Pressable>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request")}
            >
              <Text style={styles.ButtonText}>Suspend Account</Text>
            </Pressable>
          </View>
          <View style={styles.MenuRow}>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request")}
            >
              <Text style={styles.ButtonText}>Delete Account</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MenuRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    height: 100,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    margin: 5,
    backgroundColor: colors.primary,
  },
  ButtonText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: colors.secondary,
    textAlign: "center"
  },
  HeaderText: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: colors.primary,
  },
});


export default Settings;
