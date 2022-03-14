import { React } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native-web";
import colors from "../config/colors";

const SideMenu = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.ParentMenu}>
        <View>
          <Pressable
            style={styles.MenuButton}
            onPress={() => navigation.navigate("Interface")}
          >
            Interface
          </Pressable>

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
        </View>
        <View>
          <Pressable
            style={styles.MenuButton}
            onPress={() => navigation.navigate("Homepage")}
          >
            Logout
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ParentMenu: {
    flex: 1,
    flexDirection: "col",
    backgroundColor: colors.sideMenuBorder,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
  },
  MenuButton: {
    height: 50,
    width: 300,
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
    color: colors.secondary,
  },
});
export default SideMenu;
