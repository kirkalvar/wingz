import { Platform } from "react-native";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Device from "expo-device";
import * as Location from "expo-location";

type RejectValueProp = {
  rejectValue: string;
};

export type StatusProp =
  | "pending"
  | "accepted"
  | "declined"
  | "started"
  | "picked-up"
  | "dropped-off"
  | null;

export type DriverLocationProps = {
  latitude: string;
  longitude: string;
} | null;

export type RideRequestsProps = {
  id: string; // Unique identifier for the ride
  userId: string; // ID of the user requesting the ride
  driverId: string | null; // ID of the driver accepting the ride (null if not accepted)
  pickupLocation: {
    latitude: number; // Latitude of the pickup location
    longitude: number; // Longitude of the pickup location
  };
  destination: {
    latitude: number; // Latitude of the destination
    longitude: number; // Longitude of the destination
  };
  status: StatusProp; // Status of the ride request
  pickupTime: Date; // Time when the ride is scheduled for pickup
  timestamp: Date; // Timestamp of when the ride request was made
};

export type RideProps = {
  driverLocation: DriverLocationProps | object;
  rideRequests: RideRequestsProps[];
  status: string;
};

export const getDriverLocation = createAsyncThunk<
  DriverLocationProps,
  void,
  RejectValueProp
>("data/driverLocation", async (_, { rejectWithValue }) => {
  try {
    if (Platform.OS === "android" && !Device.isDevice) {
      throw new Error(
        "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
      );
    }

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to access location was denied");
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude.toString(),
      longitude: location.coords.longitude.toString(),
    };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "Unable to retrieve the driver's current location"
    );
  }
});
