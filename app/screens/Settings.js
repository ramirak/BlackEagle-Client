import { React } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text } from "react-native-web";
import colors from "../config/colors";
import SideMenu from "../components/SideMenu";

const Settings = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <SideMenu navigation={navigation} />
      <View style={styles.Settings}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 30,
  },
  Settings: {
    flex: 1,
    flexDirection: "col",
    alignItems: "center",
    backgroundColor: colors.borderRightColor,
    marginLeft: 20,
    borderRadius: 10,
  },
  MenuRow: {
    flex: 1,
    flexDirection: "row",
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
