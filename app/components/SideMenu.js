import { React } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native-web";
import colors from "../config/colors";
import global from "../config/global";
const SideMenu = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={global.leftMenu}>
        <View>
          <Pressable
            style={styles.MenuButton}
            onPress={() => navigation.navigate("Interface")}
          ><Text style={global.ButtonText}>Homepage</Text></Pressable>
          <Pressable
            style={styles.MenuButton}
            onPress={() => navigation.navigate("Interface")}
          ><Text style={global.ButtonText}>Devices</Text></Pressable>
          <Pressable
            style={styles.MenuButton}
            onPress={() => navigation.navigate("Notifications")}
          ><Text style={global.ButtonText}>Notifications</Text></Pressable>
          <Pressable
            style={styles.MenuButton}
            onPress={() => navigation.navigate("Reports")}
            ><Text style={global.ButtonText}>Reports</Text></Pressable>
          <Pressable
            style={styles.MenuButton}
            onPress={() => navigation.navigate("Settings")}
          ><Text style={global.ButtonText}>Settings</Text></Pressable>
          <Pressable
            style={styles.MenuButton}
            onPress={() => navigation.navigate("Settings")}
          ><Text style={global.ButtonText}>About</Text></Pressable>
        </View>
        <View>
          <Pressable
            style={styles.MenuButton}
            onPress={() => navigation.navigate("Homepage")}
          ><Text style={global.ButtonText}>Logout</Text>

          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MenuButton: {
    height: 50,
    width: 350,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderColor: colors.sideMenuBorder,
    backgroundColor: colors.primary,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: colors.fontColor,
  },
});
export default SideMenu;
