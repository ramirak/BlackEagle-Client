import { React, useState, useEffect } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, FlatList } from "react-native-web";
import colors from "../config/colors";
import SideMenu from "../components/SideMenu";
import global from "../config/global";
import RightPanel from "../components/RightPanel";

const Request = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [pageCurrent, setpageCurrent] = useState([]);

  useEffect(() => {
    const { uid } = route.params;
    const { type } = route.params;

    fetch("https://localhost:8010/data/getAll/" + uid + "/" + type, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson);
      });
  }, []);

  const addRequest = () => {
    const { uid } = route.params;
    const { type } = route.params;

    let formData = new FormData();
    formData.append(
      "newData",
      JSON.stringify({
        dataType: "REQUEST",
        dataAttributes: { REQUEST_TYPE: { type } },
      })
    );

    fetch("https://localhost:8010/data/add/" + uid, {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

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
        <RightPanel />
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
          <FlatList
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            data={data}
            renderItem={({ item }) => (
              <Pressable style={global.ButtonList}>
                {item.dataType} : {item.createdTimestamp} : {item.dataId}
              </Pressable>
            )}
          />
          <Pressable
            onPress={() => addRequest()}
            style={styles.AddRequestButton}
          >
            <Text style={global.ButtonText}>Add Request</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ParentMenu: {
    flex: 1,
    flexDirection: "col",
    backgroundColor: colors.sideMenuBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  AddRequestButton: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderColor: colors.borderRightColor,
    backgroundColor: colors.primary,
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
