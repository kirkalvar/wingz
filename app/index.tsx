import React, { useRef, useEffect, useCallback, useMemo } from "react";
import View from "react-native-ui-lib/view";
import Button from "react-native-ui-lib/button";
import { useNavigation } from "expo-router";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  getUseCurrentLocation,
  fetchRideRequests,
} from "@/redux/actions/rideAction";
import { selectRide } from "@/redux/slices/rideSlice";
import { useRideData } from "@/hooks";
import { Map } from "@/components";

const Home = (): React.JSX.Element => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const dispatch = useAppDispatch();
  const { user, rideRequests } = useAppSelector(selectRide);
  const { markers, region } = useRideData(user, rideRequests);

  // console.log("user", user);
  // console.log("rideRequests", rideRequests);

  // console.log("markers", markers);
  // console.log("region", region);

  const handleOnPress = useMemo(() => {
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
    <View flex>
      <Button label="View" onPress={handleOnPress} />
      {/*<Map
        ref={mapRef}
        region={region}
        markers={markers}
        onPressMarker={() => {}}
      />*/}
    </View>
  );
};

export default Home;
