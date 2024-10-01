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
};

const useListsRegionAndMarkers = () => {
  const { user, rideRequests } = useAppSelector(selectRide);

  return useMemo(() => {
    let markers: MarkerProps[] = [];
    let coordinates: CoordinatesProps[] = [];
    let region = null;

    if (user?.coordinate && rideRequests.length) {
      markers = rideRequests.map((item) => ({
        id: item.id,
        coordinate: item.pickupLocation,
        isRideRequest: true,
      }));
      markers.push({
        id: user.id,
        coordinate: user.coordinate,
        isRideRequest: false,
      });

      coordinates = rideRequests.map((item) => item.pickupLocation);
      region = calculateRegion([user.coordinate, ...coordinates]);
    }

    return {
      markers,
      coordinates,
      region,
    };
  }, [user, rideRequests]);
};

export default useListsRegionAndMarkers;
