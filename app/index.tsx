import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import View from "react-native-ui-lib/view";
import Text from "react-native-ui-lib/text";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  getDriverLocation,
  fetchRideRequests,
} from "@/redux/actions/rideAction";
import {
  selectRideDriverLocation,
  selectRideRequests,
} from "@/redux/slices/rideSlice";

const Home = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const driverLocation = useAppSelector(selectRideDriverLocation);
  const rideRequests = useAppSelector(selectRideRequests);

  console.log("driverLocation", driverLocation);
  console.log("rideRequests", rideRequests);

  const init = useCallback(async () => {
    const intialCoords = await dispatch(getDriverLocation()).unwrap();
    if (intialCoords) {
      dispatch(fetchRideRequests(intialCoords));
    }
  }, [dispatch, getDriverLocation, fetchRideRequests]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <View style={styles.container}>
      <Text>test</Text>
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
});

export default Home;
