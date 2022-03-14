import { React, useState, useEffect } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, FlatList } from "react-native-web";
import colors from "../config/colors";
import SideMenu from "../components/SideMenu";
import global from "../config/global";

const Request = ({ route,navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const { uid } = route.params;
    const { type } = route.params;

    fetch("https://localhost:8010/data/getAll/"+uid+"/"+type, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson); 
      });
  }, []);

  return (
    <SafeAreaView style={global.pageContainer}>
      <SideMenu navigation={navigation} />

      <View style={global.rightMenu}>
        <FlatList
         keyExtractor={(item, index) => {
          return index.toString();
        }}
        data={data}
        renderItem={({item}) => (
          <Pressable
            onPress={() => navigation.navigate("Child Menu")}
            style={global.ButtonList}
          >{item.dataType} : {item.createdTimestamp} : {item.dataId}</Pressable>
        )}
        />
        <Pressable style={styles.AddRequestButton}><Text style={global.ButtonText}>Add Request</Text></Pressable>
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
