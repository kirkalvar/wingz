import React from "react";
import { StyleSheet } from "react-native";
import View from "react-native-ui-lib/view";

type CircleProps = {
  size: number;
  color: string;
  style: object;
  readonly children: React.ReactNode;
};

const Circle = ({ size, color, style, children, ...rest }: CircleProps) => {
  const styles = StyleSheet.create({
    circle: {
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: StyleSheet.hairlineWidth,
      backgroundColor: color,
    },
  });

  return (
    <View center style={[styles.circle, style]} {...rest}>
      {children}
    </View>
  );
};

export default Circle;
