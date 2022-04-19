import { React, useState } from "react";
import { Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native-web";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ParentMenu from "../components/ParentMenu";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Settings = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const { uid } = route.params;
  const { name } = route.params;
  const { type } = route.params;

  const settingsComponent = () => {
    switch (type) {
      case "NAME":
        return (
          <View>
            <View>
              <TextInput
                style={global.TextInput}
                placeholder="New name"
                placeholderTextColor={colors.primary}
                onChangeText={(newName) => setNewName(newName)}
              />
            </View>
          </View>
        );
      case "PASSWORD":
        return (
          <View>
            <View>
              <TextInput
                style={global.TextInput}
                placeholder="Old password"
                placeholderTextColor={colors.primary}
                //onChangeText={}
              />
            </View>
            <View>
              <TextInput
                style={global.TextInput}
                placeholder="New password"
                placeholderTextColor={colors.primary}
                //onChangeText={}
              />
            </View>
            <View>
              <TextInput
                style={global.TextInput}
                placeholder="Confirm new password"
                placeholderTextColor={colors.primary}
                //onChangeText={}
              />
            </View>
            <View>
              <TextInput
                style={global.TextInput}
                placeholder="New Hint"
                placeholderTextColor={colors.primary}
                //onChangeText={}
              />
            </View>
          </View>
        );
      case "NOTIFICATION":
        break;
      case "SECURITY":
        break;
      case "SUSPEND":
        break;
      case "DELETE":
        break;
      default:
        break;
    }
  };

  const setSettingRequests = () => {
    switch (type) {
      case "DELETE":
        return (
          fetch("https://localhost:8010/users/delete/" + oneTimeKey, {
            method: "DELETE",
            credentials: "include",
            headers: {
              Accept: "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                alert("The account has been deleted.");
              } else {
                alert("Deletion failed.");
              }
              return response.json(type);
            })
            .then((responseJson) => {
              console.log(responseJson);
            })
            .catch((error) => {
              console.log("error: " + error);
            })
          );
      case "PASSWORD":
        return (
          fetch("https://localhost:8010/users/reset/" + email + oneTimeKey, {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                alert("Password reset succeeded.");
              } else {
                alert("Password reset failed.");
              }
              return response.json(type);
            })
            .then((responseJson) => {
              console.log(responseJson);
            })
            .catch((error) => {
              console.log("error: " + error);
            })
          );

      default:
        return (
        fetch("https://localhost:8010/users/update", {
          method: "PUT",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              USERID: 
              {
                  UID: email,	
                  PASSWORD:
                  {
                    PASSWORD: password,
                    OPTINALPASSWORD: optinalPassword,
                    CREATIONTIME: null,
                    ACTIVE: true,
                    HINT: hint
                  }
              },
              ROLE: role,
              ACTIVE: true,
              DEVICECOUNT: deviceCount
          }),
        })
          .then((response) => {
            if (response.ok) {
              alert("The update was successful.");
            } else {
              alert("The update failed.");
            }
            return response.json(type);
          })
          .then((responseJson) => {
            console.log(responseJson);
          })
          .catch((error) => {
            console.log("error: " + error);
          })
        );
    }
  };

 
  return (
    <SafeAreaView style={global.PageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.RightContainer}>
        <View style={global.HeaderMenu}>
          <Text style={global.HeaderText}>Account Settings</Text>
        </View>
        <View style={global.RightMenu}>
          <View style={global.MenuRow}>
            <Pressable
              style={global.MenuButton}
              onPress={() => setModalVisible(true)}
            >
              <MaterialCommunityIcons
                name="rename-box"
                size={sizes.iconSize}
                color="white"
              />
              <Text style={global.MenuButtonText}>Update Name</Text>
            </Pressable>
            <Pressable
              style={global.MenuButton}
              onPress={() => setModalVisible(true)}
            >
              <MaterialCommunityIcons
                name="form-textbox-password"
                size={sizes.iconSize}
                color="white"
              />
              <Text style={global.MenuButtonText}>Update Password</Text>
            </Pressable>
            <Pressable
              style={global.MenuButton}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons
                name="md-notifications-circle"
                size={sizes.iconSize}
                color="white"
              />
              <Text style={global.MenuButtonText}>Notification Settings</Text>
            </Pressable>
          </View>
          <View style={global.MenuRow}>
            <Pressable
              style={global.MenuButton}
              onPress={() => setModalVisible(true)}
            >
              <MaterialIcons
                name="security"
                size={sizes.iconSize}
                color="white"
              />
              <Text style={global.MenuButtonText}>Security</Text>
            </Pressable>
            <Pressable
              style={global.MenuButton}
              onPress={() => setModalVisible(true)}
            >
              <MaterialCommunityIcons
                name="account-cancel-outline"
                size={sizes.iconSize}
                color="white"
              />
              <Text style={global.MenuButtonText}>Suspend Account</Text>
            </Pressable>
          </View>
          <View style={global.MenuRow}>
            <Pressable
              style={global.MenuButton}
              onPress={() => setModalVisible(true)}
            >
              <AntDesign
                name="deleteuser"
                size={sizes.iconSize}
                color="white"
              />
              <Text style={global.MenuButtonText}>Delete Account</Text>
            </Pressable>
          </View>
          <Modal
            style={global.ModalContainer}
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={global.ModalView}>
              <View style={global.ModalContainer}>
                <View style={global.TopModalView}>{settingsComponent()}</View>
                <View style={global.BottomModalView}>
                  <Pressable
                    onPress={() => {
                      setModalConfigVisible(!modalConfigVisible), setSettingRequests();
                    }}
                    style={global.CloseButton}
                  >
                    <Text style={global.ButtonText}>Send</Text>
                  </Pressable>
                  <Pressable
                    style={global.CloseButton}
                    onPress={() => setModalConfigVisible(!modalConfigVisible)}
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

export default Settings;
