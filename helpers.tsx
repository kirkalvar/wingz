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
