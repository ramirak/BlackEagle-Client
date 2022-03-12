import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native-web";
import colors from "../config/colors";
import SideMenu from "../components/SideMenu";

const Interface = ({ navigation }) => {
  const [enteredChild, setChild] = useState([
    { name: "Liron", id: "1" },
    { name: "Rami", id: "2" },
    { name: "Yarden", id: "3" },
    { name: "Avi", id: "4" },
    { name: "Michal", id: "5" },
  ]);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <SideMenu navigation={navigation} />
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
              <Pressable
                onPress={() => navigation.navigate("Child Menu")}
                style={styles.ButtonList}
              >
                {item.name}
              </Pressable>
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
  ChildrenMenu: {
    flex: 1,
    flexDirection: "col",
    backgroundColor: colors.secondary,
    marginLeft: 20,
    borderRadius: 10,
  },
  AddChildView: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "center",
  },
  ListView: {
    flex: 1,
  },
  ButtonList: {
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "white",
    textAlign: "left",
    borderRadius: 20,
    borderWidth: 1,
    height: 50,
    margin: 5,
    paddingLeft: 10,
    justifyContent: "center",
    backgroundColor: "black",
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
