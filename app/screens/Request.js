import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, FlatList } from "react-native-web";
import colors from "../config/colors";
import SideMenu from "../components/SideMenu";

const Request = ({ navigation }) => {
  const [data, setData] = useState([
    { name: "0f84fd65-b97c-41cf-adfb-fb932d75d189", id: "1" },
    { name: "cde914e6-6e5c-4c19-9446-909e74f36b94", id: "2" },
    { name: "192bffb0-6f18-4c7d-a85e-e3320ab7d4ad", id: "3" },
    { name: "110ddc26-07d9-46d2-982a-912b47722624", id: "4" },
    { name: "0234fba8-ac9e-40a1-bc60-a3ed4b5483dd", id: "5" },
  ]);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <SideMenu navigation={navigation} />

      <View style={styles.RequestMenu}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate("Homepage")}
              style={styles.ButtonList}
            >
              {item.name}
            </Pressable>
          )}
        />
        <Pressable style={styles.AddRequestButton}>Add Request</Pressable>
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
    backgroundColor: colors.sideMenuBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  RequestMenu: {
    flex: 1,
    flexDirection: "col",
    backgroundColor: colors.borderRightColor,
    marginLeft: 20,
    borderRadius: 10
  },
  ButtonList: {
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: colors.secondary,
    textAlign: "left",
    borderRadius: 6,
    borderWidth: 1,
    height: 50,
    margin: 5,
    paddingLeft: 10,
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  AddRequestButton: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderColor: colors.borderColor,
    backgroundColor: colors.backgroundButton,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: colors.secondary,
    margin: 5,
    paddingLeft: 10,
  },
});

export default Request;
