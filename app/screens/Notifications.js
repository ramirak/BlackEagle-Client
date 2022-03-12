import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, FlatList } from "react-native-web";
import colors from "../config/colors";
import SideMenu from "../components/SideMenu";

const Notifications = ({ navigation }) => {
  const [Notification, setReport] = useState([
    { name: "Notification number 1", id: "1" },
    { name: "Notification number 2", id: "2" },
    { name: "Notification number 3", id: "3" },
    { name: "Notification number 4", id: "4" },
    { name: "Notification number 5", id: "5" },
  ]);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <SideMenu navigation={navigation} />
      <View style={styles.Notifications}>
        <View style={styles.ListView}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={Notification}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.navigate("Homepage")}
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
  Notifications: {
    flex: 1,
    flexDirection: "col",
    backgroundColor: colors.secondary,
    marginLeft: 20,
    borderRadius: 10,
  },
  ListView: {
    flex: 1,
  },
  Button: {
    height: 100,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    margin: 5,
    backgroundColor: colors.primary,
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
  ButtonText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "white",
    textAlign: "center",
  },
  HeaderText: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: "black",
  },
});

export default Notifications;
