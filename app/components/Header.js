import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import global from "../config/global";
const Header = () => {
  return (
    <SafeAreaView>
      <View style={global.headerMenu}>
        <Text style={styles.text}>Reports</Text>
      </View>    
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Header;