import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import View from "react-native-ui-lib/view";
import Text from "react-native-ui-lib/text";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getDriverLocation } from "@/redux/actions/rideAction";
import { selectRideDriverLocation } from "@/redux/slices/rideSlice";

const Home = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const driverLocation = useAppSelector(selectRideDriverLocation);

  console.log("driverLocation", driverLocation);

  useEffect(() => {
    dispatch(getDriverLocation());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default Home;
