import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "../utils/NavigationUtils";
import { StatusBar, StyleSheet, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MainNavigation from "./MainNavigation";


const Navigation = () => {
const theme = useColorScheme();
  const activeColors = theme === "dark" ? "white" : "dark";
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: insets.bottom > 0 ? insets.bottom : undefined,
    },
    statusBarHeight: {
      height: insets.top * 1.1,
      backgroundColor: activeColors,
    },
  });
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={styles.statusBarHeight} />
      <NavigationContainer ref={navigationRef}>
        <MainNavigation />
      </NavigationContainer>
    </View>
  );
};

export default Navigation;
