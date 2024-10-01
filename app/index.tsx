import React, { useRef, useEffect, useCallback, useMemo } from "react";
import View from "react-native-ui-lib/view";
import Button from "react-native-ui-lib/button";
import { useNavigation } from "expo-router";

import { useAppDispatch } from "@/redux/hook";
import {
  getUseCurrentLocation,
  fetchRideRequests,
} from "@/redux/actions/rideAction";
import { useRideData } from "@/hooks";
import { Map } from "@/components";

const Home = (): React.JSX.Element => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const dispatch = useAppDispatch();
  const { markers, region } = useRideData();

  const handleOnPress = useMemo(() => {
    console.log("handleOnPress");
    navigation.navigate("ride-request", {
      id: "8fa57ef6-89b5-47a1-b07e-83bd7686aa3f",
    });
  }, [navigation]);

  const init = useCallback(async () => {
    const intialCoords = await dispatch(getUseCurrentLocation()).unwrap();
    if (intialCoords) {
      dispatch(fetchRideRequests(intialCoords));
    }
  }, [dispatch, getUseCurrentLocation, fetchRideRequests]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <View bg-white flex>
      <Button label="View" onPress={handleOnPress} />
      <Map
        ref={mapRef}
        region={region}
        markers={markers}
        onPressMarker={() => {}}
      />
    </View>
  );
};

export default Home;
