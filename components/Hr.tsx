import React from "react";
import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { Colors, View } from "react-native-ui-lib";

type VerticalSeparatorProps = {
  style?: StyleProp<ViewStyle>;
  [key: string]: any;
};

const Hr: React.FC<VerticalSeparatorProps> = ({ style, ...rest }) => {
  return <View style={[styles.container, style]} {...rest} height={1} />;
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey50,
  },
});

export default Hr;
