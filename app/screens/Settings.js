import { React, useState } from "react";
import { Pressable, Modal } from "react-native";
import { removeNonAscii } from "../config/Utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, StyleSheet } from "react-native-web";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ParentMenu from "../components/ParentMenu";
import { getData } from "../config/Utils";
import {
  checkConfirmPassword,
  checkKey,
  checkName,
  checkPassword,
} from "../components/Errors";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Settings = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [type, setType] = useState("");
  const [newName, setNewName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oneTimeKey, setOneTimeKey] = useState("");
  const [details, setDetails] = useState("");
  const [nameError, setNameError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [oneTimeKeyError, setOneTimeKeyError] = useState("");
  const [email, setEmail] = useState("");

  const handleSettings = (type) => {
    switch (type) {
      case "NAME":
        checkName(newName, setNameError);
        settingsRequests();
        setModalVisible(!modalVisible);
        break;
      case "PASSWORD":
        checkPassword(oldPassword, setOldPasswordError);
        checkPassword(newPassword, setNewPasswordError);
        checkConfirmPassword(
          newPassword,
          confirmPassword,
          setConfirmPasswordError
        );
        settingsRequests();
        setModalVisible(!modalVisible);
        break;
      case "DELETE":
        checkKey(oneTimeKey, setOneTimeKeyError);
      default:
        break;
    }
  };

  const settingsComponent = (type) => {
    getData("@email", setEmail);
    switch (type) {
      case "NAME":
        return (
          <View>
            <View>
              <TextInput
                style={styles.TextInputSettings}
                placeholder="New name"
                placeholderTextColor={colors.primary}
                onChangeText={(newName) => setNewName(newName)}
              />
            </View>
            <Text style={global.ErrorMsg}>{nameError}</Text>
          </View>
        );
      case "PASSWORD":
        return (
          <View>
            <View style={styles.TextInputView}>
              <TextInput
                style={styles.TextInputSettings}
                placeholder="Old password"
                secureTextEntry={true}
                placeholderTextColor={colors.primary}
                onChangeText={(oldPassword) => setOldPassword(oldPassword)}
              />
            </View>
            <Text style={global.ErrorMsg}>{oldPasswordError}</Text>
            <View style={styles.TextInputView}>
              <TextInput
                style={styles.TextInputSettings}
                placeholder="New password"
                secureTextEntry={true}
                placeholderTextColor={colors.primary}
                onChangeText={(newPassword) => setNewPassword(newPassword)}
              />
            </View>
            <Text style={global.ErrorMsg}>{newPasswordError}</Text>
            <View style={styles.TextInputView}>
              <TextInput
                style={styles.TextInputSettings}
                placeholder="Confirm new password"
                secureTextEntry={true}
                placeholderTextColor={colors.primary}
                onChangeText={(confirmPassword) =>
                  setConfirmPassword(confirmPassword)
                }
              />
            </View>
            <Text style={global.ErrorMsg}>{confirmPasswordError}</Text>
          </View>
        );
      case "NOTIFICATION":
        break;
      case "SECURITY":
        break;
      case "SUSPEND":
        return (
          <View>
            <View style={styles.InsideModalView}>
              <Pressable
                style={styles.SettingButton}
                //onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={global.ButtonText}>Suspend</Text>
              </Pressable>
            </View>
            <View style={styles.InsideModalView}>
              <Pressable
                style={styles.SettingButton}
                //onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={global.ButtonText}>Active</Text>
              </Pressable>
            </View>
          </View>
        );
      case "DELETE":
        return (
          <View>
            <View style={styles.InsideModalView}>
              <Text style={styles.TextInfo}>
                Click on "Get key" and enter the key you received in the email.
              </Text>
              <Pressable
                style={styles.SettingButton}
                //onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={global.ButtonText}>Get key</Text>
              </Pressable>
            </View>
            <View>
              <TextInput
                style={styles.TextInputSettings}
                placeholder="One time key"
                placeholderTextColor={colors.primary}
                onChangeText={(oneTimeKey) => setOneTimeKey(oneTimeKey)}
              />
            </View>
            <Text style={global.ErrorMsg}>{oneTimeKeyError}</Text>
          </View>
        );
      default: {
        break;
      }
    }
  };

  const getSettingsDetails = () => {
    fetch(
      "https://localhost:8010/data/get/" + email + "/CONFIGURATION@" + email,
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
        setDetails(removeNonAscii(JSON.stringify(responseJson.dataAttributes)));
      })
      .catch((error) => {
        console.log("error: " + error);
      });
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
      regOptionalPassword = null;
    if (type == "NAME") {
      regName = newName;
    } else if (type == "PASSWORD") {
      (regPassword = newPassword), (regOptionalPassword = newPassword);
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
                color={colors.primary}
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
                color={colors.primary}
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
                color={colors.primary}
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
                color={colors.primary}
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
                color={colors.primary}
              />
              <Text style={global.MenuButtonText}>Suspend Account</Text>
            </Pressable>
            <Pressable
              style={global.MenuButton}
              onPress={() => {
                setDetailsModalVisible(true), getSettingsDetails();
              }}
            >
              <MaterialCommunityIcons
                name="account-details"
                size={sizes.iconSize}
                color={colors.primary}
              />
              <Text style={global.MenuButtonText}>Account Details</Text>
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
                color={colors.primary}
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
              <View style={styles.ModalSettingsContainer}>
                <View style={styles.TopModalSettingsView}>
                  {settingsComponent(type)}
                </View>
                <View style={global.BottomModalView}>
                  <Pressable
                    onPress={() => {
                      handleSettings(type);
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
          <Modal //Details Modal
            style={global.ModalContainer}
            animationType="fade"
            transparent={true}
            visible={detailsModalVisible}
            onRequestClose={() => {
              setDetailsModalVisible(!detailsModalVisible);
            }}
          >
            <View style={global.ModalView}>
              <View style={styles.ModalSettingsContainer}>
                <View style={styles.TopModalSettingsView}>
                  <Text>{details}</Text>
                </View>
                <View style={global.BottomModalView}>
                  <Pressable
                    style={global.CloseButton}
                    onPress={() => setDetailsModalVisible(!detailsModalVisible)}
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
  ModalSettingsContainer: {
    flex: 0.5,
    flexDirection: "col",
    width: "30%",
    borderWidth: 2,
    borderRadius: 5,
    shadowRadius: 20,
    borderColor: colors.primary,
    backgroundColor: colors.secondary,
  },
  TopModalSettingsView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  TextInfo: {
    fontSize: 15,
    textAlign: "center",
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  InsideModalView: {
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  SettingButton: {
    height: 40,
    width: 100,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  TextInputView: {
    padding: 2,
  },
  TextInputSettings: {
    height: 35,
    borderWidth: 2,
    borderRadius: 2,
    fontWeight: "500",
    textAlign: "center",
    borderColor: colors.primary,
  },
});

export default Settings;