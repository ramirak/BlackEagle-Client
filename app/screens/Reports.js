import { React, useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, FlatList } from "react-native-web";
import colors from "../config/colors";
import SideMenu from "../components/SideMenu";

const Reports = ({ navigation }) => {
  const [report, setReport] = useState([
    { name: "Report number 1", id: "1" },
    { name: "Report number 2", id: "2" },
    { name: "Report number 3", id: "3" },
    { name: "Report number 4", id: "4" },
    { name: "Report number 5", id: "5" },
  ]);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <SideMenu navigation={navigation} />
      <View style={styles.Reports}>
        <View style={styles.ListView}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={report}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.navigate("Homepage")}
                style={styles.ButtonList}
              >
                {item.name}
              </Pressable>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 30,
  },
  Reports: {
    flex: 1,
    flexDirection: "col",
    backgroundColor: colors.borderRightColor,
    marginLeft: 20,
    borderRadius: 10,
  },
  ListView: {
    flex: 1,
  },
  Button: {
    height: 100,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    margin: 5,
    backgroundColor: colors.primary,
  },
  ButtonList: {
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: colors.secondary,
    textAlign: "left",
    borderRadius: 6,
    borderWidth: 1,
    height: 50,
    margin: 5,
    paddingLeft: 10,
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  ButtonText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: colors.secondary,
    textAlign: "center",
  },
  HeaderText: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: colors.primary,
  },
});

export default Reports;
