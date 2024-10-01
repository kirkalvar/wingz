import * as Location from "expo-location";

import type { CoordinatesProps } from "./redux/actions/rideAction";

export const generateRandomCoordinates = (
  lat: number,
  lon: number,
  radius: number = 100,
  count: number = 10
) => {
  const randomCoordinates = [];

  // Convert radius from meters to degrees (approximately)
  const radiusInDegrees = radius / 111320;

  for (let i = 0; i < count; i++) {
    // Generate random distance and angle
    const distance = Math.random() * radiusInDegrees;
    const angle = Math.random() * 2 * Math.PI;

    // Calculate new lat/lon
    const newLat = lat + distance * Math.cos(angle);
    const newLon =
      lon + (distance * Math.sin(angle)) / Math.cos(lat * (Math.PI / 180));

    randomCoordinates.push({
      latitude: newLat,
      longitude: newLon,
    });
  }

  return randomCoordinates;
};

export const calculateRegion = (coordinates: CoordinatesProps[]) => {
  // If there's only one coordinate, set default deltas
  if (coordinates.length === 1) {
    // Adjust this value to control zoom level for a single marker
    const defaultDelta = 0.04;

    return {
      latitude: coordinates[0].latitude,
      longitude: coordinates[0].longitude,
      latitudeDelta: defaultDelta,
      longitudeDelta: defaultDelta,
    };
  }

  // Calculate latitudes and longitudes
  const latitudes = coordinates.map((coord) => coord.latitude);
  const longitudes = coordinates.map((coord) => coord.longitude);

  // Find min and max latitudes and longitudes
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);

  // Calculate deltas
  const latitudeDelta = maxLatitude - minLatitude;
  const longitudeDelta = maxLongitude - minLongitude;

  // Add some padding to the region
  const paddingFactor = 0.5;

  // Calculate the center latitude and adjust it by the vertical offset
  const latitude = (minLatitude + maxLatitude) / 2;
  const longitude = (minLongitude + maxLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta: latitudeDelta + latitudeDelta * paddingFactor,
    longitudeDelta: longitudeDelta + longitudeDelta * paddingFactor,
  };
};

export const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number
) => {
  const apiKey = "AIzaSyAjvM66FjJ-pVjMDglq-InI8GvFwE1lRI4";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const address = data.results[0].formatted_address;
      console.log("Address:", address);
      return address;
    } else {
      console.error("No address found");
    }
  } catch (error) {
    console.error("Error getting address:", error);
  }
};
