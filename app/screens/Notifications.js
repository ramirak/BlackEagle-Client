import { React, useState, useEffect } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList } from "react-native-web";
import { MaterialIcons } from "@expo/vector-icons";
import ParentMenu from "../components/ParentMenu";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Notifications = ({ navigation }) => {
  const [Notification, setNotification] = useState([]);

  useEffect(() => {
    fetch("https://localhost:8010/events/getAll?page=0", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setNotification(responseJson);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }, []);

  return (
    <SafeAreaView style={global.PageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.RightContainer}>
        <View style={global.HeaderMenu}>
          <Text style={global.HeaderText}>My Notifications</Text>
        </View>
        <View style={global.RightMenu}>
          <View style={global.ArrowView}>
            <Pressable
              style={global.ArrowButton}
              //onPress={() => handlePreviousPage()}
            >
              <MaterialIcons
                name="navigate-before"
                size={sizes.PagingArrowIconSize}
                color={colors.primary}
              />
            </Pressable>
            <Pressable
              style={global.ArrowButton}
              //onPress={() => handleNextPage()}
            >
              <MaterialIcons
                name="navigate-next"
                size={sizes.PagingArrowIconSize}
                color={colors.primary}
              />
            </Pressable>
          </View>
          <View style={global.ListView}>
            <FlatList
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              data={Notification}
              renderItem={({ item }) => (
                <Pressable style={global.ButtonList}>
                  <Text style={global.ListItemText}>
                    {item.type} : {item.timeOfEvent} :{" "}
                    {item.eventAttributes.IP_ADDR}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
