import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native-ui-lib";

type ContainerProp = {
  readonly children: React.ReactNode;
};

const Container = ({ children }: ContainerProp) => {
  return (
    <>
      <StatusBar style="dark" backgroundColor={Colors.white} />
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default Container;
