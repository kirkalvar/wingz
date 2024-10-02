import React, { useRef, useEffect, useCallback } from "react";
import { useNavigation } from "expo-router";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  getUseCurrentLocation,
  fetchRideRequests,
} from "@/redux/actions/rideAction";
import { selectRideError } from "@/redux/slices/rideSlice";
import { useListsRegionAndMarkers } from "@/hooks";
import { Container, Map } from "@/components";
import ErrorMessage from "@/containers/ErrorMessage";

const Home = (): React.JSX.Element => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRideError);
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
      {error && <ErrorMessage message={error} />}

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
