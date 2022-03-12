import { React } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native-web";
import colors from "../config/colors";
import SideMenu from "../components/SideMenu";

const ChildMenu = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <SideMenu navigation={navigation} />

      <View style={styles.ChildrenMenu}>
        <View style={styles.MenuRow}>
          <Pressable
            style={styles.Button}
            onPress={() => navigation.navigate("Request")}
          >
            <Text style={styles.ButtonText}>Screenshots</Text>
          </Pressable>
          <Pressable
            style={styles.Button}
            onPress={() => navigation.navigate("Request")}
          >
            <Text style={styles.ButtonText}>Keylogs</Text>
          </Pressable>

          <Pressable
            style={styles.Button}
            onPress={() => navigation.navigate("Request")}
          >
            <Text style={styles.ButtonText}>Camera</Text>
          </Pressable>
        </View>
        <View style={styles.MenuRow}>
          <Pressable
            style={styles.Button}
            onPress={() => navigation.navigate("Request")}
          >
            <Text style={styles.ButtonText}>Audio</Text>
          </Pressable>
          <Pressable
            style={styles.Button}
            onPress={() => navigation.navigate("Request")}
          >
            <Text style={styles.ButtonText}>Lockdown</Text>
          </Pressable>
          <Pressable
            style={styles.Button}
            onPress={() => navigation.navigate("Request")}
          >
            <Text style={styles.ButtonText}>CMD</Text>
          </Pressable>
        </View>
        <View style={styles.MenuRow}>
          <Pressable
            style={styles.Button}
            onPress={() => navigation.navigate("Request")}
          >
            <Text style={styles.ButtonText}>Locations</Text>
          </Pressable>
          <Pressable
            style={styles.Button}
            onPress={() => navigation.navigate("Request")}
          >
            <Text style={styles.ButtonText}>Statistics</Text>
          </Pressable>
          <Pressable
            style={styles.Button}
            onPress={() => navigation.navigate("Request")}
          >
            <Text style={styles.ButtonText}>Filtering</Text>
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
  ParentMenu: {
    flex: 1,
    flexDirection: "col",
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  ChildrenMenu: {
    flex: 1,
    flexDirection: "col",
    alignItems: "center",
    backgroundColor: colors.secondary,
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
    margin: 5,
    backgroundColor: colors.primary,
  },
  ButtonText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "white",
  },
  HeaderText: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: "black",
  },
});

export default ChildMenu;
