import React, { useRef, useEffect, useCallback } from "react";
import View from "react-native-ui-lib/view";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  getDriverLocation,
  fetchRideRequests,
} from "@/redux/actions/rideAction";
import { selectRide } from "@/redux/slices/rideSlice";
import { useRideData } from "@/hooks";
import { Map } from "@/components";

const Home = (): React.JSX.Element => {
  const mapRef = useRef(null);
  const dispatch = useAppDispatch();
  const { user, rideRequests } = useAppSelector(selectRide);
  const { markers, region } = useRideData(user, rideRequests);

  // console.log("user", user);
  // console.log("rideRequests", rideRequests);

  // console.log("markers", markers);
  // console.log("region", region);

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
    <View flex>
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
