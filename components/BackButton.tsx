import React from "react";
import { router, useGlobalSearchParams } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Colors, View } from "react-native-ui-lib";
import { TouchableOpacity } from "react-native-gesture-handler";

type BackButtonProps = {
  color?: string;
  size?: number;
};

const BackButton = ({
  color = Colors.grey30,
  size = 18,
  ...rest
}: BackButtonProps): React.ReactNode => {
  if (!router.canGoBack()) {
    return null;
  }

  const params = useGlobalSearchParams();
  const goBackToIndex = () => router.replace("/");
  const goBackToPreviousScreen = () => router.back();
  const goBack = params.backToIndex ? goBackToIndex : goBackToPreviousScreen;

  return (
    <TouchableOpacity onPress={goBack}>
      <View {...rest}>
        <FontAwesome6 name="arrow-left" size={size} color={color} />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
