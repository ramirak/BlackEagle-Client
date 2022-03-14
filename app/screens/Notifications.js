import { React, useState } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, FlatList } from "react-native-web";
import colors from "../config/colors";
import SideMenu from "../components/SideMenu";
import global from "../config/global";

const Notifications = ({ navigation }) => {
  const [Notification, setReport] = useState([
    { name: "Notification number 1", id: "1" },
    { name: "Notification number 2", id: "2" },
    { name: "Notification number 3", id: "3" },
    { name: "Notification number 4", id: "4" },
    { name: "Notification number 5", id: "5" },
  ]);

  return (
    <SafeAreaView style={global.pageContainer}>
      <SideMenu navigation={navigation} />
      <View style={global.rightContainer}>
        <View style={global.headerMenu}>
          <Text style={global.headerText}>My Notifications</Text>
        </View>
        <View style={global.rightMenu}>
          <View style={global.ListView}>
            <FlatList
              keyExtractor={(item) => item.id}
              data={Notification}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => navigation.navigate("Homepage")}
                  style={global.ButtonList}
                ><Text style={global.ButtonText}>{item.name}</Text></Pressable>
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  ButtonText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: colors.secondary,
    textAlign: "center",
  },
  HeaderText: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: colors.primary,
  },
});

export default Notifications;
