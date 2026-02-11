import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { mergedStacks } from "./ScreenCollection";

const Stack = createStackNavigator();
const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        animation: "fade",
      })}
      initialRouteName="splashScreen"
    >
      {mergedStacks?.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default MainNavigation;
