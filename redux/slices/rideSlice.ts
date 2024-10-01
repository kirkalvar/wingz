import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../store";
import type {
  UserProps,
  RideRequestsProps,
  RideProps,
} from "../actions/rideAction";
import { getDriverLocation, fetchRideRequests } from "../actions/rideAction";
import userData from "../../data/user.json";

const initialState: RideProps = {
  user: {
    id: userData.userId,
    coordinate: null,
  },
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
      (state, action: PayloadAction<UserProps["coordinate"]>) => {
        state.user.coordinate = action.payload;
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
export const selectRideUser = (state: RootState): UserProps | object =>
  state.ride.user;
export const selectRideRequests = (
  state: RootState
): RideRequestsProps | object => state.ride.rideRequests;

export default rideSlice.reducer;
