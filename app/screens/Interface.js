import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native-web";
import colors from "../config/colors";

const Interface = ({ navigation }) => {
  const [enteredChild, setChild] = useState([
    { name: "Liron", id: "1" },
    { name: "Rami", id: "2" },
    { name: "Yarden", id: "3" },
    { name: "Niger", id: "4" },
    { name: "Nasty", id: "5" },
  ]);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.ParentMenu}>
        <Pressable
          style={styles.MenuButton}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.ButtonText}>Settings</Text>
        </Pressable>

        <Pressable
          style={styles.MenuButton}
          onPress={() => navigation.navigate("Reports")}
        >
          <Text style={styles.ButtonText}>Reports</Text>
        </Pressable>

        <Pressable
          style={styles.MenuButton}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Text style={styles.ButtonText}>Notifications</Text>
        </Pressable>

        <Pressable
          style={styles.MenuButton}
          onPress={() => navigation.navigate("Homepage")}
        >
          <Text style={styles.ButtonText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.ChildrenMenu}>
        <View style={styles.AddChildView}>
          <Pressable style={styles.AddChildButton}>
            <Text style={styles.ButtonText}>Add Child</Text>
          </Pressable>
          <TextInput
            style={styles.TextInputStyle}
            placeholder="Enter Name"
            onChangeText={(name) => setName(name)}
          />
        </View>
        <View style={styles.ListView}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={enteredChild}
            renderItem={({ item }) => (
              <Pressable onPress={() => navigation.navigate("Child Menu")}
              style={styles.ButtonList}>{item.name}</Pressable>
            )}
          />
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
    backgroundColor: "pink",
  },
  AddChildView: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "center",
  },
  ListView: {
    flex: 1,
    backgroundColor: "#424242",
  },
  ButtonList: {
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "white",
    textAlign: "left",
    borderRadius: 6,
    borderWidth: 1,
    height: 50,
    margin: 5,
    paddingLeft: 10,
    justifyContent: "center",
    backgroundColor: "black",
  },
  MenuButton: {
    height: 50,
    width: 150,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderColor: colors.borderColor,
    backgroundColor: colors.backgroundButton,
  },
  ButtonText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "white",
  },
  AddChildButton: {
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderColor: colors.borderColor,
    backgroundColor: colors.backgroundButton,
  },
  TextInputStyle: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 3,
    height: 50,
    width: 150,
    marginLeft: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default Interface;
