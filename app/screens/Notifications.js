import { React, useState, useEffect } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList } from "react-native-web";
import { MaterialIcons } from "@expo/vector-icons";
import ParentMenu from "../components/ParentMenu";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";
import Moment from 'moment';
import {
  checkPage,
  handleNextPage,
  handlePreviousPage,
  handleRefresh,
} from "../config/Utils";

const Notifications = ({ navigation }) => {
  const [Notification, setNotification] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(5);

  useEffect(() => {
    if (!refresh) return;
    fetch("https://localhost:8010/events/getAll?page=" + page + "&size=" + maxPage, {
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
      setRefresh(false);
  }, [refresh, page]);
  Moment.locale('en');

  return (
    <SafeAreaView style={global.PageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.RightContainer}>
        <View style={global.HeaderMenu}>
          <Text style={global.HeaderText}>My Notifications</Text>
        </View>
        <View style={global.RightMenu}>
          <View style={global.ArrowView}>
            <View>
            </View>
            <View>
              <Pressable
                style={global.ArrowButton}
                onPress={() => {
                  handlePreviousPage(page, setPage), handleRefresh(setRefresh);
                }}
              >
                <MaterialIcons
                  name="navigate-before"
                  size={sizes.PagingArrowIconSize}
                  color={colors.primary}
                />
              </Pressable>
            </View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{page + 1}</Text>
            <View>
              <Pressable
                style={global.ArrowButton}
                onPress={() => {
                  handleNextPage(page, setPage, Notification.length, maxPage),
                    handleRefresh(setRefresh);
                }}
              >
                <MaterialIcons
                  name="navigate-next"
                  size={sizes.PagingArrowIconSize}
                  color={colors.primary}
                />
              </Pressable>
            </View>
            <View>
            </View>
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
                    {item.type} : {Moment(item.timeOfEvent).format('dddd MMM YYYY HH:mm:ss')}   IP: {item.eventAttributes.IP_ADDR}
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
