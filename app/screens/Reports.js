import { React, useState, useEffect } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList } from "react-native-web";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import ParentMenu from "../components/ParentMenu";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Reports = ({ route, navigation }) => {
  const [report, setReport] = useState("");
  const [pageCurrent, setpageCurrent] = useState([]);

  useEffect(() => {
    const { email } = route.params;
    fetch(
      "https://localhost:8010/data/getAll/" +
        email +
        "/REPORT?page=" +
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
        setReport(responseJson);
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
    <SafeAreaView style={global.PageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.RightContainer}>
        <View>
          <Pressable
            style={global.RefreshButton}
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
        <View style={global.HeaderMenu}>
          <Text style={global.HeaderText}>My Reports</Text>
        </View>
        <View style={global.RightMenu}>
          <View style={global.ArrowView}>
            <Pressable
              style={global.ArrowButton}
              onPress={() => handlePreviousPage()}
            >
              <MaterialIcons
                name="navigate-before"
                size={sizes.PagingArrowIconSize}
                color={colors.primary}
              />
            </Pressable>
            <Pressable
              style={global.ArrowButton}
              onPress={() => handleNextPage()}
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
              keyExtractor={(item) => item.id}
              data={report}
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

export default Reports;
