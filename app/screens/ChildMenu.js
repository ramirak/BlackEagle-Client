import { React } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native-web";
import colors from "../config/colors";
import SideMenu from "../components/SideMenu";
import global from "../config/global";
import sizes from "../config/sizes";
import RightPanel from "../components/RightPanel";
import { Ionicons, FontAwesome5, Feather, MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons";

const ChildMenu = ({ navigation, route }) => {
  const { uid } = route.params;
  const { name } = route.params;

  return (
    <SafeAreaView style={global.pageContainer}>
      <SideMenu navigation={navigation} />
      <View style={global.rightContainer}>
     <RightPanel/>
        <View style={global.headerMenu}>
          <Text style={global.headerText}>{name}</Text>
        </View>

        <View style={global.rightMenu}>
          <View style={styles.MenuRow}>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request", { uid: uid, type: "SCREENSHOT" })}
            >
              <MaterialCommunityIcons name="monitor-screenshot" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>Screenshots</Text>
            </Pressable>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request", { uid: uid, type: "KEYLOG" })}
            >
              <Entypo name="keyboard" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>Keylogs</Text>
            </Pressable>

            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request", { uid: uid, type: "CAMERA" })}
            >
              <Feather name="camera" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>Camera</Text>
            </Pressable>
          </View>
          <View style={styles.MenuRow}>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request", { uid: uid, type: "AUDIO" })}
            >
              <FontAwesome5 name="audio-description" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>Audio</Text>
            </Pressable>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request", { uid: uid, type: "LOCKDOWN" })}
            >
              <MaterialCommunityIcons name="account-lock" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>Lockdown</Text>
            </Pressable>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request", { uid: uid, type: "COMMAND" })}
            >
              <Ionicons name="terminal" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>CMD</Text>
            </Pressable>
          </View>
          <View style={styles.MenuRow}>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request", { uid: uid, type: "LOCATION" })}
            >
              <Ionicons name="location" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>Locations</Text>
            </Pressable>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request", { uid: uid, type: "LOCATION" })}
            >
              <Ionicons name="stats-chart" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>Statistics</Text>
            </Pressable>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate("Request", { uid: uid, type: "LOCATION" })}
            >
              <AntDesign name="filter" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>Filtering</Text>
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
    margin: 5,
    backgroundColor: colors.primary,
  },
  ButtonText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: colors.secondary,
  },
  HeaderText: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: colors.primary,
  },
});

export default ChildMenu;
