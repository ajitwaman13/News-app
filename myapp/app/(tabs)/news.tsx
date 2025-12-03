import { View, StyleSheet } from "react-native";
import React from "react";
import News from "@/components/news";

const NewsScreen = () => {
  return (
    <View style={style.container}>
      <News />
    </View>
  );
};

export default NewsScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F2F7FB",
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
