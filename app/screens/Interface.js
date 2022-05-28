import { React, useState, useEffect } from "react";
import { Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native-web";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import ParentMenu from "../components/ParentMenu";
import { getData, getJsonBodyByType } from "../config/Utils";
import { updateChild } from "../components/FetchSettings";
import {
  checkSession,
  getAccount,
  deleteChild,
} from "../components/FetchRequest";
import { AddChildButton } from "../components/Buttons";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Interface = ({ navigation }) => {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [parentName, setParentName] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [email, setEmail] = useState("");
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    checkSession(navigation);
    getData("@email", setEmail);
    getAccount(setParentName);
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
  }, [refresh, parentName]);

  const updateChildRequest = () => {
    let jsonBody = getJsonBodyByType("DEVICE_NAME", newName, deviceId, "");
    if (jsonBody.name != "") return updateChild(jsonBody);
    return alert("Name is required");
  };

  const editName = () => {
    return (
      <View>
        <View>
          <TextInput
            style={global.TextInputSettings}
            placeholder="New name"
            placeholderTextColor={colors.primary}
            onChangeText={(newName) => setNewName(newName)}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={global.PageContainer}>
      <ParentMenu navigation={navigation} email={email} />
      <View style={global.RightContainer}>
        <View style={global.HeaderMenu}>
          <Text style={global.HeaderText}>
            {"Hey " + parentName + " - Your devices"}
          </Text>
        </View>
        <View style={global.RightMenu}>
          <View style={styles.AddChildView}>
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Enter Name"
              value={name}
              onChangeText={(name) => setName(name)}
            />
            <AddChildButton
              name={name}
              setName={setName}
              setRefresh={setRefresh}
            />
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
                    <Text style={global.ListItemText}>
                      {item.name} - {item.userId.uid}
                    </Text>
                    <View style={styles.ListRightButtons}>
                      <Pressable
                        style={global.IconButton}
                        onPress={() => {
                          setDeviceId(item.userId.uid);
                          setEditModal(!editModal);
                        }}
                      >
                        <MaterialIcons
                          name="edit"
                          size={sizes.iconSize}
                          color={colors.primary}
                        />
                      </Pressable>
                      <Pressable
                        style={global.IconButton}
                        onPress={() => deleteChild(item.userId.uid, setRefresh)}
                      >
                        <FontAwesome
                          name="trash-o"
                          size={sizes.iconSize}
                          color={colors.primary}
                        />
                      </Pressable>
                    </View>
                  </Pressable>
                </View>
              )}
            />
          </View>
          <Modal
            style={global.ModalContainer}
            animationType="fade"
            transparent={true}
            visible={editModal}
            onRequestClose={() => {
              setEditModal(!editModal);
            }}
          >
            <View style={global.ModalView}>
              <View style={global.ModalSettingsContainer}>
                <View style={global.TopModalSettingsView}>{editName()}</View>
                <View style={global.BottomModalView}>
                  <Pressable
                    onPress={() => {
                      updateChildRequest(),
                        setEditModal(!editModal),
                        setRefresh(true);
                    }}
                    style={global.CloseButton}
                  >
                    <Text style={global.ButtonText}>Send</Text>
                  </Pressable>
                  <Pressable
                    style={global.CloseButton}
                    onPress={() => setEditModal(!editModal)}
                  >
                    <Text style={global.ButtonText}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
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
