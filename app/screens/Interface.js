import { React, useState, useEffect } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native-web";
import colors from "../config/colors";
import SideMenu from "../components/SideMenu";
import global from "../config/global";
import RightPanel from "../components/RightPanel";

const Interface = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const { email } = route.params;

  const fetchNow = () => {
    fetch("https://localhost:8010/device/getAll", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson); // your JSON response is here
      });
  };
  
  useEffect(() => { fetchNow() }, []);

  return (
    <SafeAreaView style={global.pageContainer}>
      <SideMenu navigation={navigation} email={email}/>
      <View style={global.rightContainer}>
      <RightPanel/>
        <View style={global.headerMenu}>
          <Text style={global.headerText}>My children devices</Text>
        </View>
        <View style={global.rightMenu}>
          <View style={styles.AddChildView}>
            <Pressable style={styles.AddChildButton}>
              <Text style={global.ButtonText}>Add Child</Text>
            </Pressable>
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Enter Name"
              onChangeText={(name) => setName(name)}
            />
          </View>
          <View style={global.ListView}>
            <FlatList
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              data={data}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => navigation.navigate("Child Menu", { uid: item.userId.uid, name: item.name })}
                  style={global.ButtonList}
                ><Text style={global.ButtonText}>{item.name} - {item.userId.uid}</Text></Pressable>
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AddChildView: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "center",
  },
  AddChildButton: {
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  TextInputStyle: {
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 3,
    height: 50,
    width: 150,
    marginLeft: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default Interface;
