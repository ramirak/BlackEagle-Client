import { React, useState, useEffect } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native-web";
import colors from "../config/colors";
import SideMenu from "../components/SideMenu";

const Interface = ({ navigation }) => {
  const [data, setData] = useState([
    { name: "Report number 1", id: "1" },
  ]);

  useEffect(() => {
    fetch("https://localhost:8010/device/getAll", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson); // your JSON response is here
      });
  }, []);

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
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            data={data}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.navigate("Child Menu")}
                style={styles.ButtonList}
              >
                <Text style={styles.ButtonList}>{item.name}</Text>
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
    backgroundColor: colors.borderRightColor,
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
    color: colors.secondary,
    textAlign: "left",
    borderRadius: 20,
    borderWidth: 1,
    height: 50,
    margin: 5,
    paddingLeft: 10,
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  ButtonText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: colors.secondary,
  },
  AddChildButton: {
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  TextInputStyle: {
    borderColor: colors.primary,
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
