import { React, useState, useEffect } from "react";
import { Pressable, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, FlatList, StyleSheet } from "react-native-web";
import Checkbox from "expo-checkbox";
import { RadioButton } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import ParentMenu from "../components/ParentMenu";
import { configUpdate } from "../components/FetchRequest";
import { GoBackButton } from "../components/Buttons";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const DeviceConfiguration = ({ route, navigation }) => {
  const [data, setData] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [fakenews, setFakenews] = useState(false);
  const [gambling, setGambling] = useState(false);
  const [porn, setPorn] = useState(false);
  const [social, setSocial] = useState(false);
  const [specificUrl, setSpecificUrl] = useState("");
  const [urlList, setUrlList] = useState([]);
  const [checked, setChecked] = useState(true);
  const { uid } = route.params;
  const { name } = route.params;
  const { type } = route.params;

  useEffect(() => {
    if (!refresh) return;
    fetch("https://localhost:8010/data/get/" + uid + "/" + type + "@" + uid, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setChecked(responseJson.dataAttributes.IS_ACTIVE === "true");
        setFakenews(responseJson.dataAttributes.FAKENEWS === "true");
        setPorn(responseJson.dataAttributes.PORN === "true");
        setSocial(responseJson.dataAttributes.SOCIAL === "true");
        setGambling(responseJson.dataAttributes.GAMBLING === "true");
        setData(responseJson.dataAttributes);
        let str = responseJson.dataAttributes.ADDITIONAL_SITES.replace(
          /[\[\,/\"\]]/g,
          ""
        )
          .replaceAll("0.0.0.0", "")
          .trim();
        if (str.length > 0) setUrlList(str.split(" "));
      });
    setRefresh(false);
  }, [refresh]);

  const setAddRequestComponent = () => {
    return (
      <ScrollView>
        <View>
          <Text style={global.TextHeaderSettings}>Device Status</Text>
        </View>
        <View style={styles.RadioButtonStyle}>
          <RadioButton
            value="true"
            status={checked === true ? "checked" : false}
            onPress={() => setChecked(true)}
          />
          <Text style={sizes.FilterTextSize}>Active</Text>
          <RadioButton
            value="false"
            status={checked === false ? "checked" : true}
            onPress={() => setChecked(false)}
          />
          <Text style={sizes.FilterTextSize}>Suspend</Text>
        </View>
        <View>
          <Text style={global.TextHeaderSettings}>Filter Categories</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.CheckboxSection}>
            <Checkbox
              style={{ margin: 8 }}
              value={fakenews}
              onValueChange={setFakenews}
            />
            <Text style={sizes.FilterTextSize}>Fakenews</Text>
          </View>
          <View style={styles.CheckboxSection}>
            <Checkbox
              style={{ margin: 8 }}
              value={gambling}
              onValueChange={setGambling}
            />
            <Text style={sizes.FilterTextSize}>Gambling</Text>
          </View>
          <View style={styles.CheckboxSection}>
            <Checkbox
              style={{ margin: 8 }}
              value={porn}
              onValueChange={setPorn}
            />
            <Text style={sizes.FilterTextSize}>Porn</Text>
          </View>
          <View style={styles.CheckboxSection}>
            <Checkbox
              style={{ margin: 8 }}
              value={social}
              onValueChange={setSocial}
            />
            <Text style={sizes.FilterTextSize}>Social</Text>
          </View>
          <View>
            <Text style={global.TextHeaderSettings}>Custom blacklist</Text>
          </View>
          <View>
            <TextInput
              style={global.TextInputInModal}
              placeholder="blocked domain"
              placeholderTextColor={colors.primary}
              onChangeText={(specificUrl) => setSpecificUrl(specificUrl)}
            />
          </View>
        </View>
        <View style={{ margin: 10 }}>
          <FlatList
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            data={urlList}
            renderItem={({ item }) => (
              <Pressable style={global.ButtonList}>
                <Text style={global.ListItemText}>{item}</Text>
                <Pressable
                  style={global.IconButton}
                  onPress={() => {
                    defineConfigAttributes("REMOVE", item);
                  }}
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
        </View>
      </ScrollView>
    );
  };

  const defineConfigAttributes = (additionalSitesOP, url) => {
    let dataAttr = {
      IS_ACTIVE: checked.toString(),
      FAKENEWS: fakenews.toString(),
      GAMBLING: gambling.toString(),
      PORN: porn.toString(),
      SOCIAL: social.toString(),
      ADDITIONAL_SITES: url,
      ADDITIONAL_SITES_OPERATION: additionalSitesOP,
    };
      configUpdate(uid, dataAttr, setRefresh);
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
          {setAddRequestComponent()}
          <Pressable
            style={styles.AddRequestButton}
            onPress={() => defineConfigAttributes("ADD", specificUrl)}
          >
            <Text style={global.ButtonText}>Save</Text>
          </Pressable>
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
  RadioButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  CheckboxSection: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DeviceConfiguration;
