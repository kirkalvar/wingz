import { useCallback, useEffect, useState } from "react";

import type { RideRequestsProps } from "@/redux/actions/rideAction";
import { getAddressFromCoordinates } from "@/helpers";

const useFetchAddresses = (
  selectedRideRequest: RideRequestsProps | undefined
) => {
  const [pickupAddress, setPickupAddress] = useState<string | null>(null);
  const [destinationAddress, setDestinationAddress] = useState<string | null>(
    null
  );

  const fetchAddress = useCallback(async () => {
    if (!selectedRideRequest) return;

    const pickup = await getAddressFromCoordinates(
      selectedRideRequest.pickupLocation.latitude,
      selectedRideRequest.pickupLocation.longitude
    );
    setPickupAddress(pickup);

    const destination = await getAddressFromCoordinates(
      selectedRideRequest.destination.latitude,
      selectedRideRequest.destination.longitude
    );
    setDestinationAddress(destination);
  }, [selectedRideRequest]);

  useEffect(() => {
    // fetchAddress();
  }, [fetchAddress]);

  return { pickupAddress, destinationAddress };
};

export default useFetchAddresses;
