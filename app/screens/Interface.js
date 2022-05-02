import { React, useState, useEffect } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native-web";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import fileDownload from "js-file-download";
import ParentMenu from "../components/ParentMenu";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Interface = ({ navigation, route }) => {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [refresh, setRefresh] = useState(true);
  const { email } = route.params;

  useEffect(() => {
    if (!refresh) return;
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
      })
      .catch((error) => {
        console.log("error: " + error);
      });
    setRefresh(false);
  }, [refresh]);

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
      .then((response) => {
        if (response.status == "507") {
          alert("You can only create up to 5 devices");
        } else if (response.status == "400") {
          alert("Name is required");
        } else {
          alert(
            "Your device authentication details is being downloaded.\nPlease keep it in a secure loaction!"
          );
        }
        return response.json();
      })
      .then((responseJson) => {
        let deviceLoginDetails = JSON.stringify({
          uid: responseJson.userId.uid,
          password: responseJson.userId.passwordBoundary.password,
        });
        fileDownload(deviceLoginDetails, "auth.json");
      })
      .then(() => setRefresh(true))
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
      .then(() => setRefresh(true))
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  return (
    <SafeAreaView style={global.PageContainer}>
      <ParentMenu navigation={navigation} email={email} />
      <View style={global.RightContainer}>
        <View style={global.HeaderMenu}>
          <Text style={global.HeaderText}>My children devices</Text>
        </View>
        <View style={global.RightMenu}>
          <View style={styles.AddChildView}>
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Enter Name"
              value={name}
              onChangeText={(name) => setName(name)}
            />
            <Pressable
              style={global.SendButton}
              onPress={() => {
                addChild(name), setName("");
              }}
            >
              <Text style={global.ButtonText}>Add Child</Text>
            </Pressable>
          </View>
          <View style={global.ListView}>
            <FlatList
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              data={data}
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
                    <View style={styles.ListRightButtons}>
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
    justifyContent: "center",
    padding: 20,
  },
  TextInputStyle: {
    borderWidth: 2,
    borderRadius: 3,
    height: 50,
    width: 150,
    marginRight: 10,
    textAlign: "center",
    fontWeight: "bold",
    borderColor: colors.primary,
  },
  ListRightButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: 15,
  },
});
export default Interface;
