import { React, useState, useEffect } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList } from "react-native-web";
import { FontAwesome } from "@expo/vector-icons";
import ParentMenu from "../components/ParentMenu";
import PagingArrows from "../components/PagingArrows";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Notifications = ({ route, navigation }) => {
  const [Notification, setNotification] = useState([]);
  const [pageCurrent, setpageCurrent] = useState([]);

  useEffect(() => {
    const { email } = route.params;
    fetch(
      "https://localhost:8010/data/getAll/" +
        email +
        "/NOTIFICATION?page=" +
        { pageCurrent },
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setNotification(responseJson);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }, [pageCurrent]); // <-- Makes pageCurrent a dependency

  /*
  const handlePreviousPage = () => {
    console.log("previous page clicked", pageCurrent);
    // Do this so your page can't go negative
    setpageCurrent(pageCurrent - 1 < 1 ? 1 : pageCurrent - 1);
  };

  const handleNextPage = () => {
    console.log("next page clicked", pageCurrent);
    setpageCurrent(pageCurrent + 1);
  };
  */

  return (
    <SafeAreaView style={global.pageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.rightContainer}>
        <View>
          <Pressable
            style={global.refreshButton}
            onPress={() => handleRefresh()}
          >
            <FontAwesome
              style={global.icon}
              name="refresh"
              size={sizes.refreshIconSize}
              color={colors.primary}
            />
          </Pressable>
        </View>
        <View style={global.headerMenu}>
          <Text style={global.headerText}>My Notifications</Text>
        </View>
        <View style={global.rightMenu}>
          <PagingArrows />
          <View style={global.ListView}>
            <FlatList
              keyExtractor={(item) => item.id}
              data={Notification}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => navigation.navigate("Homepage")}
                  style={global.ButtonList}
                >
                  <Text style={global.ButtonText}>{item.name}</Text>
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
