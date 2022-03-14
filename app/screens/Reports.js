import { React, useState } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, FlatList } from "react-native-web";
import colors from "../config/colors";
import SideMenu from "../components/SideMenu";
import global from "../config/global";
import Header from "../components/Header";
const Reports = ({ navigation }) => {
  const [report, setReport] = useState([
    { name: "Report number 1", id: "1" },
    { name: "Report number 2", id: "2" },
    { name: "Report number 3", id: "3" },
    { name: "Report number 4", id: "4" },
    { name: "Report number 5", id: "5" },
  ]);

  return (
    <SafeAreaView style={global.pageContainer} >

      <SideMenu navigation={navigation} />
      <View style={global.rightContainer}>
          <View style={global.headerMenu}>
            <Text style={global.headerText}>My Reports</Text>
          </View>
          <View style={global.rightMenu}>
            <View style={global.ListView}>
              <FlatList
                keyExtractor={(item) => item.id}
                data={report}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => navigation.navigate("Homepage")}
                    style={global.ButtonList}
                  ><Text style={global.ButtonText}>{item.name}</Text></Pressable>
                )}
              />
            </View>
          </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HeaderText: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: colors.primary,
  },
});

export default Reports;
