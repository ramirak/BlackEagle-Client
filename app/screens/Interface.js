import { React, useState, useEffect } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native-web";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import ParentMenu from "../components/ParentMenu";
import RightPanel from "../components/RightPanel";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Interface = ({ route, navigation }) => {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { email } = route.params;

  const getAllChildren = () => {
    fetch("https://localhost:8010/device/getAll", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson);
        setSelectedId(responseJson);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  const addChild = (childName) => {
    fetch("https://localhost:8010/device/add", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: childName,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  const deleteChild = (id) => {
    fetch("https://localhost:8010/device/delete/" + id, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  useEffect(() => {
    getAllChildren();
  }, []);

  return (
    <SafeAreaView style={global.pageContainer}>
      <ParentMenu navigation={navigation} email={email} />
      <View style={global.rightContainer}>
        <RightPanel />
        <View style={global.headerMenu}>
          <Text style={global.headerText}>My children devices</Text>
        </View>
        <View style={global.rightMenu}>
          <View style={styles.AddChildView}>
            <Pressable
              style={styles.AddChildButton}
              onPress={() => {
                addChild(name), getAllChildren();
              }}
            >
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
              extraData={selectedId}
              renderItem={({ item }) => (
                <View>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("Control Options", {
                        uid: item.userId.uid,
                        name: item.name,
                      })
                    }
                    style={global.ButtonList}
                  >
                    <Text style={global.ButtonText}>
                      {item.name} - {item.userId.uid}
                    </Text>
                    <View style={global.ListRightButtons}>
                      <Pressable
                        style={global.IconButton}
                        onPress={() => navigation.navigate("Homepage")}
                      >
                        <MaterialIcons
                          name="edit"
                          size={sizes.iconSize}
                          color={colors.secondary}
                        />
                      </Pressable>
                      <Pressable
                        style={global.IconButton}
                        onPress={() => deleteChild(item.userId.uid)}
                      >
                        <FontAwesome
                          name="trash-o"
                          size={sizes.iconSize}
                          color={colors.secondary}
                        />
                      </Pressable>
                    </View>
                  </Pressable>
                </View>
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
