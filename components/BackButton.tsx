import React from "react";
import { StyleSheet } from "react-native";
import { router, useGlobalSearchParams } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Colors, View } from "react-native-ui-lib";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Circle } from "@/components";

const BackButton = (): React.ReactNode => {
  if (!router.canGoBack()) {
    return null;
  }

  const params = useGlobalSearchParams();
  const goBackToIndex = () => router.replace("/");
  const goBackToPreviousScreen = () => router.back();
  const goBack = params.backToIndex ? goBackToIndex : goBackToPreviousScreen;

  return (
    <View style={styles.backButton}>
      <Circle
        size={35}
        color="#0000004d"
        style={{
          borderWidth: 0,
        }}
      >
        <TouchableOpacity onPress={goBack}>
          <FontAwesome6 name="arrow-left" size={18} color={Colors.white} />
        </TouchableOpacity>
      </Circle>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 15,
    zIndex: 9,
  },
});

export default BackButton;
