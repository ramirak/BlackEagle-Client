import { React } from "react";
import { Text, View, SafeAreaView } from "react-native";
import global from "../config/global";
import ParentMenu from "../components/ParentMenu";
import { ScrollView, StyleSheet } from "react-native-web";

const About = ({ navigation }) => {
  return (
    <SafeAreaView style={global.PageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.RightContainer}>
        <View style={global.HeaderMenu}>
          <Text style={global.HeaderText}>About</Text>
        </View>
        <View style={global.RightMenu}>
          <ScrollView style={global.TextView}>
            <Text style={styles.AboutText}>
              In the recent years we have witnessed a widespread increase in the
              use of technological means for consuming internet content as well
              as for interpersonal communication.{"\n"}
              Following the corona plague that broke out around the world, this
              phenomenon became more and more acute and most of the public began
              to conduct themselves frequently through the network, both at
              work, at school, and in private life. With the increasing rate of
              screen time among users, there has also been a widespread increase
              in the amount of dangers lurking in the internet, and especially
              for the younger generation among them. We are witnessing a
              phenomenon in which adolescents are exposed to content that is not
              appropriate for their age, while parents and educational
              institutions are not always deeply aware of the dangers to which
              children are exposed.{"\n"} The content includes, among other
              things, pornographic content, gambling sites, as well as
              correspondence with strangers that can pose a real danger to their
              safety. With the understanding that our dependence on internet use
              is not diminishing, we were interested in finding a solution to
              make the internet use safer among the younger generation. For this
              purpose we developed this solution, which is able to filter
              content as well as report back to parents, while keeping the
              security of sensitive data as high and private as possible.
              {"\n\n"}
              This is our final project as part of our engineering degree - at
              Afeka College of Engineering - Tel-Aviv, Israel.{"\n\n"}
              All Rights Reserved - {"\n"}
              Liron Eli Shabtai & Rami Rak. {"\n"}
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AboutText: {
    lineHeight: 28,
    fontSize: 16,
  },
});
export default About;
