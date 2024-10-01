import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "@/components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

type Route = {
  name: string;
  options?: object;
};

// Ensure this array matches the structure and types defined above
const routes: Route[] = [
  {
    name: "index",
    options: { headerShown: false },
  },
  {
    name: "ride-request",
    options: { headerShown: false },
  },
];

export const initialRoute = routes[0];

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: initialRoute.name,
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {routes.map((route) => (
          <Stack.Screen
            key={route.name}
            name={route.name}
            options={route.options}
          />
        ))}
      </Stack>
    </ThemeProvider>
  );
}
