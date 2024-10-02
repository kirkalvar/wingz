import { ThemeManager, Typography } from "react-native-ui-lib";

// Dark mode support
require("react-native-ui-lib/config").setConfig({ appScheme: "default" });

ThemeManager.setComponentTheme("Text", (props, context) => {
  return {
    text80: true, // will set the text70 typography modifier prop to be true by default
    grey10: true, // will set the grey10 color modifier prop to be true by default
    style: [
      {
        fontFamily: "Inter_400Regular",
      },
      props.style,
    ],
  };
});

ThemeManager.setComponentTheme("Button", (props, context) => {
  return {
    labelStyle: [
      {
        ...Typography.text80L,
        fontFamily: "Inter_400Regular",
        letterSpacing: 0.5,
      },
      props.labelStyle,
    ],
  };
});
