import { Platform } from "react-native";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Device from "expo-device";
import * as Location from "expo-location";

import { generateRandomCoordinates } from "@/helpers";
import rideRequestsData from "../../data/ride-requests.json";

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

export type CoordinatesProps = {
  latitude: number;
  longitude: number;
};

export type UserProps = {
  id: string;
  coordinate: CoordinatesProps | null;
};

export type RideRequestsProps = {
  id: string; // Unique identifier for the ride
  userId: string; // ID of the user requesting the ride
  driverId: string | null; // ID of the driver accepting the ride (null if not accepted)
  pickupLocation: CoordinatesProps; // Latitude and Longitude of the pickup location
  destination: CoordinatesProps; // Latitude and Longitude of the destination
  status: StatusProp; // Status of the ride request
  pickupTime: Date; // Time when the ride is scheduled for pickup
  timestamp: Date; // Timestamp of when the ride request was made
};

export type RideProps = {
  user: UserProps;
  rideRequests: RideRequestsProps[];
  status: string;
};

export const getUseCurrentLocation = createAsyncThunk<
  UserProps["coordinate"],
  void,
  RejectValueProp
>("ride/driverLocation", async (_, { rejectWithValue }) => {
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
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "Unable to retrieve the driver's current location"
    );
  }
});

export const fetchRideRequests = createAsyncThunk<
  RideRequestsProps,
  CoordinatesProps,
  RejectValueProp
>("ride/rideRequests", async ({ latitude, longitude }, { rejectWithValue }) => {
  try {
    const randomCoordinates = generateRandomCoordinates(
      latitude,
      longitude,
      1000, // 100 meters radius
      22
    );

    return rideRequestsData.map((v, i) => ({
      ...v,
      pickupLocation: randomCoordinates[i * 2],
      destination: randomCoordinates[i * 2 + 1],
    }));
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "Unable to generate random ride requests"
    );
  }
});
