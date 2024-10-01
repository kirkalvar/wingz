import React, { forwardRef } from "react";
import { StyleSheet } from "react-native";
import View from "react-native-ui-lib/view";
import { Colors } from "react-native-ui-lib";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import type { MarkerProps, RegionProps } from "@/hooks/useRideData";
import { Circle } from "@/components";
import { SVGMapMarker } from "@/assets/svgs";

type MapProps = {
  region: RegionProps;
  markers: MarkerProps[];
  onPressMarker: (markerId: string) => void;
};

const Map = forwardRef(({ region, markers, onPressMarker }: MapProps, ref) => {
  const handleMarkerPress = (e) => {
    const index = e._targetInst.return.key;
    onPressMarker(markers[index].id);
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
      {markers.map(({ id, coordinate, isRideRequest }: MarkerProps, index) => {
        return (
          <Marker
            key={id}
            coordinate={coordinate}
            tracksViewChanges={false}
            onPress={handleMarkerPress}
          >
            <View>
              {(isRideRequest && (
                <SVGMapMarker color={Colors.red10} width={40} height={40} />
              )) || (
                <Circle
                  bg-white
                  size={15}
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.grey50,
                    backgroundColor: Colors.white,
                  }}
                />
              )}
            </View>
          </Marker>
        );
      })}
    </MapView>
  );
});

const styles = StyleSheet.create({
  mapView: {
    height: "100%",
  },
});

export default Map;
