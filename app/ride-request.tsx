import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { View, Colors } from "react-native-ui-lib";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Button } from "react-native-ui-lib";
import { useGlobalSearchParams } from "expo-router";
import _ from "lodash";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setRideRequests, selectRideRequests } from "@/redux/slices/rideSlice";
import { BackButton, Circle, Container } from "@/components";
import RideRequestInfo from "@/containers/RideRequestInfo";
import { useFetchAddresses, useDetailsRegionAndMarkers } from "@/hooks";
import { Map } from "@/components";

const RideRequestDetails = (): React.ReactNode => {
  const { id } = useGlobalSearchParams();
  const dispatch = useAppDispatch();
  const rideRequests = useAppSelector(selectRideRequests);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef(null);

  const snapPoints = useMemo(() => [400], []);
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

  const { status, timestamp, pickupTime, pickupLocation, destination } =
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
          <RideRequestInfo
            status={status}
            pickupTime={pickupTime}
            timestamp={timestamp}
            pickupAddress={pickupAddress}
            destinationAddress={destinationAddress}
          />
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
