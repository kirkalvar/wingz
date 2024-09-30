import { combineSlices } from "@reduxjs/toolkit";

import rideSlice from "./slices/rideSlice";

const reducer = combineSlices({
  ride: rideSlice,
});

export default reducer;
