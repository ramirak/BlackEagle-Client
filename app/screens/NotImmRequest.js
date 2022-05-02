import { React, useState, useEffect } from "react";
import { Pressable, Text, Modal, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, TextInput, StyleSheet } from "react-native-web";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import base64 from "react-native-base64";
import ParentMenu from "../components/ParentMenu";
import { handleRefresh, removeNonAscii } from "../config/Utils";
import { addRequest, deleteData, getSpecificData, addConfigurationRequest, deleteUrl } from "../config/FetchRequest";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

// History, Command, Configuration and Lockdown requests page
const NotImmRequest = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [specificData, setSpecificData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfigVisible, setModalConfigVisible] = useState(false);
  const [browser, setBrowser] = useState("");
  const [cmdType, setCmpType] = useState("");
  const [cmdParam, setCmdParam] = useState("");
  const [fakenews, setFakenews] = useState(false);
  const [gambling, setGambling] = useState(false);
  const [porn, setPorn] = useState(false);
  const [social, setSocial] = useState(false);
  const [specificUrl, setSpecificUrl] = useState("");
  const [additionalSitesOP, setAdditionalSitesOP] = useState("Add");
  const { uid } = route.params;
  const { name } = route.params;
  const { type } = route.params;

  useEffect(() => {
    if (!refresh) return;
    fetch("https://localhost:8010/data/getAll/" + uid + "/" + type, {
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
    setRefresh(false);
  }, [refresh]); //, pageCurrent]);

  const deleteByType = (dataId) => {
    if (type == "CONFIGURATION") {
      deleteUrl( dataId, type, fakenews, gambling, porn, social, specificUrl, additionalSitesOP);
    } else deleteData(dataId, setRefresh);
  };

  const setDataText = () => {
    //text
    let decodedData = base64.decode(specificData.toString());
    return (
      <ScrollView>
        <Text>{removeNonAscii(decodedData)}</Text>
      </ScrollView>
    );
  };

  const setAddRequestComponent = () => {
    switch (type) {
      case "COMMAND":
        return (
          <View>
            <View>
              <Picker
                style={global.TextInput}
                selectedValue={cmdType}
                onValueChange={(itemValue, itemIndex) => setCmpType(itemValue)}
              >
                <Picker.Item label="Show all processes" value="tasklist" />
                <Picker.Item label="Close a program" value="taskkill /IM" />
                <Picker.Item label="Show hidden files" value="dir /AH" />
                <Picker.Item label="Show folders and files" value="dir /ON" />
              </Picker>
            </View>
            <View>{getAdditionalParam(cmdType)}</View>
          </View>
        );
      case "HISTORY":
        return (
          <View>
            <Picker
              style={global.TextInput}
              selectedValue={browser}
              onValueChange={(itemValue, itemIndex) => setBrowser(itemValue)}
            >
              <Picker.Item label="Chrome" value="Chrome" />
              <Picker.Item label="Opera" value="Opera" />
              <Picker.Item label="Brave" value="Brave" />
              <Picker.Item label="Edge" value="Edge" />
            </Picker>
          </View>
        );
      case "CONFIGURATION":
        return (
          <ScrollView>
            <View style={styles.CheckboxContainer}>
              <View style={styles.CheckboxSection}>
                <Checkbox
                  style={styles.Checkbox}
                  value={fakenews}
                  onValueChange={setFakenews}
                />
                <Text style={sizes.FilterTextSize}>Fakenews</Text>
              </View>
              <View style={styles.CheckboxSection}>
                <Checkbox
                  style={styles.Checkbox}
                  value={gambling}
                  onValueChange={setGambling}
                />
                <Text style={sizes.FilterTextSize}>Gambling</Text>
              </View>
              <View style={styles.CheckboxSection}>
                <Checkbox
                  style={styles.Checkbox}
                  value={porn}
                  onValueChange={setPorn}
                />
                <Text style={sizes.FilterTextSize}>Porn</Text>
              </View>
              <View style={styles.CheckboxSection}>
                <Checkbox
                  style={styles.Checkbox}
                  value={social}
                  onValueChange={setSocial}
                />
                <Text style={sizes.FilterTextSize}>Social</Text>
              </View>
              <View>
                <TextInput
                  style={global.TextInputInModal}
                  placeholder="Specific URL"
                  placeholderTextColor={colors.primary}
                  onChangeText={(specificUrl) => setSpecificUrl(specificUrl)}
                />
              </View>
            </View>
          </ScrollView>
        );
      default:
        break;
    }
  };

  const checkRequestButton = () => {
    switch (type) {
      case "HISTORY":
        return (
          <Pressable
            onPress={() => setModalConfigVisible(true)}
            style={styles.AddRequestButton}
          >
            <Text style={global.ButtonText}>Download browser history</Text>
          </Pressable>
        );
      case "COMMAND":
      case "CONFIGURATION":
        return (
          <Pressable
            onPress={() => setModalConfigVisible(true)}
            style={styles.AddRequestButton}
          >
            <Text style={global.ButtonText}>
              Add {type.toLowerCase()} request
            </Text>
          </Pressable>
        );
      default:
        return (
          <Pressable
            onPress={() => defineTypeAttributes()}
            style={styles.AddRequestButton}
          >
            <Text style={global.ButtonText}>
              Add {type.toLowerCase()} request
            </Text>
          </Pressable>
        );
    }
  };

  const defineTypeAttributes = () => {
    let dataAttr;
    if (type == "COMMAND") {
      dataAttr = {
        REQUEST_TYPE: type,
        COMMAND_TYPE: cmdType,
        COMMAND_PARAMETER: cmdParam,
      };
      addRequest(uid, dataAttr);
    } else if (type == "CONFIGURATION") {
      dataAttr = {
        FAKENEWS: fakenews,
        GAMBLING: gambling,
        PORN: porn,
        SOCIAL: social,
        ADDITIONAL_SITES: specificUrl,
        ADDITIONAL_SITES_OPERATION: additionalSitesOP,
      };
      addConfigurationRequest(uid, dataAttr);
    } else {
      dataAttr = { REQUEST_TYPE: type };
      addRequest(uid, dataAttr);
    }
  };

  const getAdditionalParam = (cmdType) => {
    switch (cmdType) {
      case "taskkill /IM":
      case "dir /AH":
      case "dir /ON":
        return (
          <TextInput
            style={global.TextInputInModal}
            placeholder="Additional Param"
            placeholderTextColor={colors.primary}
            onChangeText={(cmdParam) => setCmdParam(cmdParam)}
          />
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={global.PageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.RightContainer}>
        <View>
          <Pressable
            style={global.RefreshButton}
            onPress={() => handleRefresh(setRefresh)}
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
          <Text style={global.HeaderText}>
            {name + " - " + type.toLowerCase()}
          </Text>
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
          <FlatList
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            data={data}
            renderItem={({ item }) => (
              <Pressable
                style={global.ButtonList}
                onPress={() => {
                  setModalVisible(true), getSpecificData(uid, item.dataId, setSpecificData);
                }}
              >
                <Text style={global.ListItemText}>
                  {item.dataType} : {item.createdTimestamp} : {item.dataId}
                </Text>
                <Pressable
                  style={global.IconButton}
                  onPress={() => deleteByType(item.dataId)}
                >
                  <FontAwesome
                    name="trash-o"
                    size={sizes.iconSize}
                    color={colors.primary}
                  />
                </Pressable>
              </Pressable>
            )}
          />
          <Modal /*Modal for showing a specific data*/
            style={global.ModalContainer}
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={global.ModalView}>
              <View style={global.ModalContainer}>
                <View style={global.TopModalView}>{setDataText()}</View>
                <View style={global.BottomModalView}>
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
          <Modal /* Modal for COMMAND, HISTORY and CONFIGURATION components */
            style={global.ModalConfigContainer}
            animationType="fade"
            transparent={true}
            visible={modalConfigVisible}
            onRequestClose={() => {
              setModalConfigVisible(!modalConfigVisible);
            }}
          >
            <View style={global.ModalView}>
              <View style={global.ModalConfigContainer}>
                <View style={global.TopModalView}>
                  {setAddRequestComponent()}
                </View>
                <View style={global.BottomModalView}>
                  <Pressable
                    onPress={() => {
                      defineTypeAttributes(),
                        setModalConfigVisible(!modalConfigVisible);
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
          {checkRequestButton()}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  CheckboxContainer: {
    flex: 1,
  },
  CheckboxSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  Checkbox: {
    margin: 8,
  },
});

export default NotImmRequest;