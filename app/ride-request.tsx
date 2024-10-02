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

  const { status, pickupTime, pickupLocation, destination, timestamp } =
    selectedRideRequest;

  const isPendingStatus = status === "pending";

  return (
    <Container>
      {region && (
        <Map
          ref={mapRef}
          region={region}
          markers={markers}
          direction={{
            origin: pickupLocation,
            destination: destination,
          }}
        />
      )}

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
          <Text text70 marginB-15>
            Ride Request Details
          </Text>
          <Text marginB-5>Status: {status}</Text>
          <Text marginB-5>
            Book Date: {moment(timestamp).format("ddd, MMM DD")}
          </Text>
          <Text marginB-5>
            Pick-up Date: {moment(pickupTime).format("ddd, MMM DD @ hh:mm a")}
          </Text>
          <Text marginB-5>Pick-up Location: {pickupAddress}</Text>
          <Text marginB-5>Drop-off Location: {destinationAddress}</Text>

          <View row spread marginT-15>
            <Button
              bg-grey10
              outline
              outlineColor={Colors.grey10}
              marginR-5
              label="Decline"
              onPress={() => handleAcceptOrDeclinedPress("declined")}
              disabled={!isPendingStatus}
            />
            <Button
              flex-1
              bg-grey10
              marginL-5
              label="Accept"
              onPress={() => handleAcceptOrDeclinedPress("accept")}
              disabled={!isPendingStatus}
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
    paddingHorizontal: 15,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 15,
    zIndex: 9,
  },
});

export default RideRequestDetails;
