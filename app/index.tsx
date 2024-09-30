import React from "react";
import { StyleSheet } from "react-native";
import View from "react-native-ui-lib/view";
import MapView from "react-native-maps";

const Home = (): React.JSX.Element => {
  return (
    <View flex>
      <MapView style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Home;
