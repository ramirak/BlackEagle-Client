import { React, useState } from "react";
import { Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput } from "react-native-web";
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
  const [type, setType] = useState("");
  const [newName, setNewName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hint, setHint] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [oneTimeKey, setOneTimeKey] = useState("");
  const { email } = route.params;

  const settingsComponent = (type) => {
    console.log(type);
    switch (type) {
      case "NAME":
        return (
          <View>
            <View>
              <TextInput
                style={global.TextInputInModal}
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
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <View>
              <TextInput
                style={global.TextInput}
                placeholder="New password"
                placeholderTextColor={colors.primary}
                onChangeText={(newPassword) => setNewPassword(newPassword)}
              />
            </View>
            <View>
              <TextInput
                style={global.TextInput}
                placeholder="Confirm new password"
                placeholderTextColor={colors.primary}
                onChangeText={(confirmPassword) =>
                  setConfirmPassword(confirmPassword)
                }
              />
            </View>
            <View>
              <TextInput
                style={global.TextInput}
                placeholder="New hint"
                placeholderTextColor={colors.primary}
                onChangeText={(hint) => setHint(hint)}
              />
            </View>
          </View>
        );
      case "NOTIFICATION":
        break;
      case "SECURITY":
        break;
      case "SUSPEND":
        return (
          <View>
            <View>
              <Text>
                If you are sure, write in the text line "YES" and click Send.
              </Text>
              <TextInput
                style={global.TextInputInModal}
                placeholder="Are you sure?"
                placeholderTextColor={colors.primary}
                onChangeText={(userAnswer) => setUserAnswer(userAnswer)}
              />
            </View>
          </View>
        );
      case "DELETE":
        return (
          <View>
            <View>
              <Text>We have sent you one time key via email.</Text>
              <TextInput
                style={global.TextInputInModal}
                placeholder="One time key"
                placeholderTextColor={colors.primary}
                onChangeText={(oneTimeKey) => setOneTimeKey(oneTimeKey)}
              />
            </View>
          </View>
        );
      default:
        break;
    }
  };

  const settingsRequests = () => {
    switch (type) {
      case "DELETE":
        return fetch("https://localhost:8010/users/delete/" + oneTimeKey, {
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
          });
      default:
        let jsonBody = getJsonBodyByType();
         return fetch("https://localhost:8010/users/update", {
          method: "PUT",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonBody,
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
          });
        }
  };

  const getJsonBodyByType = () => {
    let regName = null,
      regPassword = null,
      regOptionalPassword = null,
      regHint = null;
    if (type == "NAME") {
      regName = newName;
    } else if (type == "PASSWORD") {
      (regPassword = newPassword),
        (regOptionalPassword = password),
        (regHint = hint);
    }
    let jsonTemplate = {
      userId: {
        uid: email,
        name: regName,
        password: {
          password: regPassword,
          optionalPassword: regOptionalPassword,
          creationTime: null,
          active: null,
          hint: regHint,
        },
      },
      role: null,
      active: null,
      deviceCount: null,
    };
    return jsonTemplate;
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
              onPress={() => {
                setModalVisible(true), setType("NAME");
              }}
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
              onPress={() => {
                setModalVisible(true), setType("PASSWORD");
              }}
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
              onPress={() => {
                setModalVisible(true), setType("NOTIFICATION");
              }}
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
              onPress={() => {
                setModalVisible(true), setType("SECURITY");
              }}
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
              onPress={() => {
                setModalVisible(true), setType("SUSPEND");
              }}
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
              onPress={() => {
                setModalVisible(true), setType("DELETE");
              }}
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
              <View style={global.ModalConfigContainer}>
                <View style={global.TopModalView}>
                  {settingsComponent(type)}
                </View>
                <View style={global.BottomModalView}>
                  <Pressable
                    onPress={() => {
                      setModalVisible(!modalVisible), settingsRequests();
                    }}
                    style={global.CloseButton}
                  >
                    <Text style={global.ButtonText}>Send</Text>
                  </Pressable>
                  <Pressable
                    style={global.CloseButton}
                    onPress={() => setModalVisible(!modalVisible)}
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
