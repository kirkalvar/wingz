import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../store";
import type {
  UserProps,
  RideRequestsProps,
  RideProps,
} from "../actions/rideAction";
import {
  getUseCurrentLocation,
  fetchRideRequests,
} from "../actions/rideAction";
import userData from "../../data/user.json";

const initialState: RideProps = {
  user: {
    id: userData.userId,
    coordinate: null,
  },
  rideRequests: [],
  status: null,
  error: null,
};

const rideSlice = createSlice({
  name: "ride",
  initialState,
  reducers: {
    setRideRequests: (state, action: PayloadAction<RideRequestsProps>) => {
      state.rideRequests = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUseCurrentLocation.fulfilled,
      (state, action: PayloadAction<UserProps["coordinate"]>) => {
        state.user.coordinate = action.payload;
        state.status = "success";
      }
    );
    builder.addCase(
      getUseCurrentLocation.rejected,
      (state, action: PayloadAction<string>) => {
        state.status = action.payload;
        state.status = "failed";
      }
    );
    builder.addCase(
      fetchRideRequests.fulfilled,
      (state, action: PayloadAction<RideRequestsProps>) => {
        state.rideRequests = action.payload;
        state.status = "success";
      }
    );
    builder.addCase(
      fetchRideRequests.rejected,
      (state, action: PayloadAction<string>) => {
        state.status = action.payload;
        state.status = "failed";
      }
    );
  },
});

export const { setRideRequests } = rideSlice.actions;

export const selectRide = (state: RootState): RideProps => state.ride;

export const selectRideUser = (state: RootState): UserProps | object =>
  state.ride.user;

export const selectRideRequests = (
  state: RootState
): RideRequestsProps | object => state.ride.rideRequests;

export const selectRideStatus = (state: RootState): RideProps["status"] =>
  state.ride.status;

export const selectRideError = (state: RootState): RideProps["error"] =>
  state.ride.error;

export default rideSlice.reducer;
