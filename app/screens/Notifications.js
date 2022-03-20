import { React, useState, useEffect } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList } from "react-native-web";
import SideMenu from "../components/SideMenu";
import global from "../config/global";
import RightPanel from "../components/RightPanel";

const Notifications =({ route, navigation }) => {
  const [Notification, setNotification] = useState([]);
  const [pageCurrent, setpageCurrent] = useState([]);

  useEffect(() => {
    const { email } = route.params;
        fetch("https://localhost:8010/data/getAll/" + email + "/NOTIFICATION?page=" + {pageCurrent} ,{
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
      }, [pageCurrent]); // <-- Makes pageCurrent a dependency

  const handlePreviousPage = () => {
    console.log("previous page clicked", pageCurrent);
    // Do this so your page can't go negative
    setpageCurrent(pageCurrent - 1 < 1 ? 1 : pageCurrent - 1);
  };

  const handleNextPage = () => {
    console.log("next page clicked", pageCurrent);
    setpageCurrent(pageCurrent + 1);
  };

  return (
    <SafeAreaView style={global.pageContainer}>
      <SideMenu navigation={navigation} />
      <View style={global.rightContainer}>
      <RightPanel/>
        <View style={global.headerMenu}>
          <Text style={global.headerText}>My Notifications</Text>
        </View>
        <View style={global.rightMenu}>
        <View>
            <Pressable
              style={global.smallButton}
              onPress={() => handlePreviousPage()}
            >
              <Text style={global.smallButtonText}>Previous Page</Text>
            </Pressable>
            <Pressable
              style={global.smallButton}
              onPress={() => handleNextPage()}
            >
              <Text style={global.smallButtonText}>Next Page</Text>
            </Pressable>
          </View>
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

export default Notifications;
