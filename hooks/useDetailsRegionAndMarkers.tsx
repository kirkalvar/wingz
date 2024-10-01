import { useMemo } from "react";

import type {
  CoordinatesProps,
  UserProps,
  RideRequestsProps,
} from "@/redux/actions/rideAction";
import { calculateRegion } from "@/helpers";
import { useAppSelector } from "@/redux/hook";
import { selectRide } from "@/redux/slices/rideSlice";

export type RegionProps = {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
};

export type MarkerProps = {
  id: string;
  coordinate: CoordinatesProps;
  isRideRequest: boolean;
  point: "pickup" | "destination";
};

const useListsRegionAndMarkers = (selectedRideRequest: RideRequestsProps) => {
  const { user, rideRequests } = useAppSelector(selectRide);

  return useMemo(() => {
    const markers: MarkerProps[] = [];
    const coordinates: CoordinatesProps[] = [];
    let region = null;

    if (selectedRideRequest) {
      markers.push({
        id: selectedRideRequest.pickupLocation.latitude.toString(),
        coordinate: selectedRideRequest.pickupLocation,
        isRideRequest: true,
        point: "pickup",
      });
      markers.push({
        id: selectedRideRequest.destination.latitude.toString(),
        coordinate: selectedRideRequest.destination,
        isRideRequest: true,
        point: "destination",
      });

      coordinates.push(selectedRideRequest.pickupLocation);
      coordinates.push(selectedRideRequest.destination);

      region = calculateRegion(coordinates);
    }

    return {
      markers,
      coordinates,
      region,
    };
  }, [user, rideRequests]);
};

export default useListsRegionAndMarkers;
