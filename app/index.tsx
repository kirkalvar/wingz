import React, { useRef, useEffect, useCallback } from "react";
import View from "react-native-ui-lib/view";
import { useNavigation } from "expo-router";

import { useAppDispatch } from "@/redux/hook";
import {
  getUseCurrentLocation,
  fetchRideRequests,
} from "@/redux/actions/rideAction";
import { useListsRegionAndMarkers } from "@/hooks";
import { Container, Map } from "@/components";

const Home = (): React.JSX.Element => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const dispatch = useAppDispatch();
  const { markers, region } = useListsRegionAndMarkers();

  const handleOnPress = useCallback(
    (id) => {
      navigation.navigate("ride-request", {
        id,
      });
    },
    [navigation]
  );

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
    <Container>
      {region && (
        <Map
          ref={mapRef}
          region={region}
          markers={markers}
          onPressMarker={handleOnPress}
        />
      )}
    </Container>
  );
};

export default Home;
