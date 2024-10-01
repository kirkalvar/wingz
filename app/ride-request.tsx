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
import { selectRideRequests } from "@/redux/slices/rideSlice";
import { BackButton, Circle } from "@/components";
import { getAddressFromCoordinates } from "@/helpers";
import { useFetchAddresses } from "@/hooks";

const RideRequestDetails = (): React.ReactNode => {
  const { id } = useGlobalSearchParams();
  const dispatch = useAppDispatch();
  const rideRequests = useAppSelector(selectRideRequests);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["40%", "80%"], []);
  const selectedRideRequest = useMemo(
    () => _.find(rideRequests, { id }),
    [rideRequests]
  );

  const { pickupAddress, destinationAddress } =
    useFetchAddresses(selectedRideRequest);

  if (!selectedRideRequest) {
    return null;
  }

  const { userId, status, pickupTime, timestamp } = selectedRideRequest;

  return (
    <>
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
              label="Cancel"
              onPress={() => {}}
            />
            <Button bg-grey10 marginL-5 label="Accept" onPress={() => {}} />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 9,
  },
});

export default RideRequestDetails;
