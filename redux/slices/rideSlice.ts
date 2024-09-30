import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../store";
import type {
  DriverLocationProps,
  RideRequestsProps,
  RideProps,
} from "../actions/rideAction";
import { getDriverLocation, fetchRideRequests } from "../actions/rideAction";

const initialState: RideProps = {
  driverLocation: null,
  rideRequests: [],
  status: "",
};

const rideSlice = createSlice({
  name: "ride",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getDriverLocation.fulfilled,
      (state, action: PayloadAction<DriverLocationProps>) => {
        state.driverLocation = action.payload;
      }
    );
    builder.addCase(
      fetchRideRequests.fulfilled,
      (state, action: PayloadAction<RideRequestsProps>) => {
        state.rideRequests = action.payload;
      }
    );
  },
});

export const selectRide = (state: RootState): RideProps => state.ride;
export const selectRideDriverLocation = (
  state: RootState
): DriverLocationProps | object => state.ride.driverLocation;
export const selectRideRequests = (
  state: RootState
): RideRequestsProps | object => state.ride.rideRequests;

export default rideSlice.reducer;
