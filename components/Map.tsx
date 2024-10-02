import React, { forwardRef } from "react";
import { StyleSheet } from "react-native";
import View from "react-native-ui-lib/view";
import { Colors } from "react-native-ui-lib";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import Constants from "expo-constants";
import MapViewDirections from "react-native-maps-directions";

import type { CoordinatesProps } from "@/redux/actions/rideAction";
import type {
  MarkerProps,
  RegionProps,
} from "@/hooks/useListsRegionAndMarkers";
import { Circle } from "@/components";
import { SVGMapMarker } from "@/assets/svgs";

type DirectionProps = {
  origin: CoordinatesProps;
  destination: CoordinatesProps;
  point?: "pickup" | "destination";
};

type MapProps = {
  region: RegionProps;
  markers: MarkerProps[];
  direction?: DirectionProps;
  onPressMarker?: (markerId: string) => void;
};

const { GOOGLE_MAP_API_KEY } = Constants.expoConfig.extra;

const Map = forwardRef(
  ({ region, markers, direction, onPressMarker }: MapProps, ref) => {
    const markerprops = {};

    const handleMarkerPress = (e) => {
      const id = e._targetInst.return.key;

      if (onPressMarker) onPressMarker(id);
    };

    return (
      <MapView
        ref={ref}
        // provider={PROVIDER_GOOGLE}
        initialRegion={region}
        style={styles.mapView}
        onMapReady={() => {
          console.log("Map ready");
        }}
      >
        {markers.map(
          ({ id, coordinate, isRideRequest, point }: MarkerProps, index) => {
            return (
              <Marker
                key={id}
                coordinate={coordinate}
                tracksViewChanges={false}
                onPress={handleMarkerPress}
              >
                <View>
                  {(isRideRequest && (
                    <SVGMapMarker
                      color={point === "pickup" ? Colors.red10 : Colors.grey10}
                      width={40}
                      height={40}
                    />
                  )) || (
                    <Circle
                      bg-white
                      size={30}
                      style={{
                        borderWidth: 2,
                        borderColor: Colors.white,
                        backgroundColor: Colors.blue30,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 12,
                        },
                        shadowOpacity: 0.58,
                        shadowRadius: 16.0,
                        elevation: 24,
                      }}
                    />
                  )}
                </View>
              </Marker>
            );
          }
        )}

        {direction && (
          <MapViewDirections
            origin={direction.origin}
            destination={direction.destination}
            apikey={GOOGLE_MAP_API_KEY}
            strokeWidth={4}
            strokeColor={Colors.red10}
          />
        )}
      </MapView>
    );
  }
);

const styles = StyleSheet.create({
  mapView: {
    height: "100%",
  },
});

export default Map;
