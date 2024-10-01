import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import { View, Text, Colors } from "react-native-ui-lib";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Button } from "react-native-ui-lib";
import { useGlobalSearchParams } from "expo-router";
import moment from "moment";
import _ from "lodash";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setRideRequests, selectRideRequests } from "@/redux/slices/rideSlice";
import { BackButton, Circle, Container } from "@/components";
import { getAddressFromCoordinates } from "@/helpers";
import { useFetchAddresses, useDetailsRegionAndMarkers } from "@/hooks";
import { Map } from "@/components";

const RideRequestDetails = (): React.ReactNode => {
  const { id } = useGlobalSearchParams();
  const dispatch = useAppDispatch();
  const rideRequests = useAppSelector(selectRideRequests);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef(null);

  const snapPoints = useMemo(() => ["40%", "80%"], []);
  const selectedRideRequest = useMemo(
    () => _.find(rideRequests, { id }),
    [rideRequests]
  );

  const { markers, region } = useDetailsRegionAndMarkers(selectedRideRequest);
  const { pickupAddress, destinationAddress } =
    useFetchAddresses(selectedRideRequest);

  const handleAcceptOrDeclinedPress = useCallback(
    (action) => {
      const updatedRequests = rideRequests.map((v) => ({
        ...v,
        status: v.id === selectedRideRequest?.id ? action : v.status,
      }));

      dispatch(setRideRequests(updatedRequests));
    },
    [rideRequests, selectedRideRequest, dispatch]
  );

  if (!selectedRideRequest) {
    return null;
  }

  const { status, pickupTime, timestamp } = selectedRideRequest;

  console.log(markers, region);

  return (
    <Container>
      {region && <Map ref={mapRef} region={region} markers={markers} />}

      <View style={styles.backButton}>
        <Circle
          size={35}
          color="#0000004d"
          style={{
            borderWidth: 0,
          }}
        >
          <BackButton color={Colors.white} size={18} />
        </Circle>
      </View>

      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <BottomSheetView style={styles.contentContainer}>
          <Text>Status: {status}</Text>
          <Text>Book Date: {moment(timestamp).format("ddd, MMM DD")}</Text>
          <Text>
            Pick-up Date: {moment(pickupTime).format("ddd, MMM DD @ hh:mm a")}
          </Text>
          <Text>Pick-up Location: {pickupAddress}</Text>
          <Text>Drop-off Location: {destinationAddress}</Text>

          <View row spread marginT-15>
            <Button
              bg-grey10
              outline
              outlineColor={Colors.grey10}
              marginR-5
              label="Declined"
              onPress={() => handleAcceptOrDeclinedPress("declined")}
            />
            <Button
              flex-1
              bg-grey10
              marginL-5
              label="Accept"
              onPress={() => handleAcceptOrDeclinedPress("accept")}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 15,
    zIndex: 9,
  },
});

export default RideRequestDetails;
