import { React } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native-web";
import { storeData } from "../config/Utils";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const ParentMenu = ({ navigation, email }) => {

  const Logout = () => {
    fetch("https://localhost:8010/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 404) {
          storeData("");
          navigation.navigate("Homepage");
        } else throw new Error(response.status);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.LeftMenu}>
        <View>
          <Pressable
            style={styles.MenuButton}
            onPress={() => navigation.navigate("Interface", { email: email })}
          >
            <Text style={global.ButtonText}>My Children</Text>
          </Pressable>
          <Pressable
            style={styles.MenuButton}
            onPress={() =>
              navigation.navigate("Notifications", { email: email })
            }
          >
            <Text style={global.ButtonText}>Notifications</Text>
          </Pressable>
          <Pressable
            style={styles.MenuButton}
            onPress={() => navigation.navigate("Settings", { email: email })}
          >
            <Text style={global.ButtonText}>Settings</Text>
          </Pressable>
          <Pressable
            style={styles.MenuButton}
            onPress={() => navigation.navigate("Upgrade", { email: email })}
          >
            <Text style={global.ButtonText}>Upgrade</Text>
          </Pressable>
          <Pressable
            style={styles.MenuButton}
            onPress={() => navigation.navigate("AppDownload", { email: email })}
          >
            <Text style={global.ButtonText}>Download</Text>
          </Pressable>
          <Pressable
            style={styles.MenuButton}
            onPress={() => navigation.navigate("Help", { email: email })}
          >
            <Text style={global.ButtonText}>Help</Text>
          </Pressable>
          <Pressable
            style={styles.MenuButton}
            onPress={() => navigation.navigate("About", { email: email })}
          >
            <Text style={global.ButtonText}>About</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            style={styles.MenuButton}
            onPress={() => Logout(navigation)}
          >
            <MaterialIcons
              name="logout"
              size={sizes.iconSize}
              color={colors.secondary}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  LeftMenu: {
    flex: 1,
    flexDirection: "col",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 0,
    borderWidth: 0,
    borderColor: colors.primary,
    width: 350,
  },
  MenuButton: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
    backgroundColor: colors.primary,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 1.5,
    color: colors.fontColor,
  },
});

export default ParentMenu;
