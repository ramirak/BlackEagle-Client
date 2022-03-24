import { React, useState, useEffect } from "react";
import { Pressable, Text, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList } from "react-native-web";
import ParentMenu from "../components/ParentMenu";
import RightPanel from "../components/RightPanel";
import PagingArrows from "../components/PagingArrows";
import global from "../config/global";

const Request = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [specificData, setSpecificData] = useState([]);
  const [pageCurrent, setpageCurrent] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const { uid } = route.params;
    const { type } = route.params;

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
  }, []);

  const addRequest = () => {
    const { uid } = route.params;
    const { type } = route.params;

    fetch("https://localhost:8010/data/add/" + uid, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dataType: "REQUEST",
        dataAttributes: { REQUEST_TYPE: type },
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  const getSpecificData = (dataId) => {
    const { uid } = route.params;

    fetch("https://localhost:8010/data/get/" + uid + "/" + dataId, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  /*
  const handlePreviousPage = () => {
    console.log("previous page clicked", pageCurrent);
    // Do this so your page can't go negative
    setpageCurrent(pageCurrent - 1 < 1 ? 1 : pageCurrent - 1);
  };

  const handleNextPage = () => {
    console.log("next page clicked", pageCurrent);
    setpageCurrent(pageCurrent + 1);
  };
  */

  return (
    <SafeAreaView style={global.pageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.rightContainer}>
        <RightPanel />
        <View style={global.rightMenu}>
          <PagingArrows />
          <FlatList
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            data={data}
            renderItem={({ item }) => (
              <Pressable
                style={global.ButtonList}
                onPress={() => setModalVisible(true), () => getSpecificData(item.dataId)}
              >
                <Text style={global.ButtonText}>
                  {item.dataType} : {item.createdTimestamp} : {item.dataId}
                </Text>
              </Pressable>
            )}
          />
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
                <View style={global.TopModalView}>

                </View>
                <View style={global.BottomModalView}>
                  <Pressable
                    style={global.buttonClose}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={global.ButtonText}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Pressable
            onPress={() => addRequest()}
            style={global.AddRequestButton}
          >
            <Text style={global.ButtonText}>Add Request</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Request;
