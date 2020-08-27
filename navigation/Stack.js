import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Detail from "../screens/Detail";
import Tabs from "./Tabs";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      gestureEnabled: true,
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black",
        shadowColor: "black",
      },
      headerTitleAlign: "center",
      headerTintColor: "white",
      headerBackTitleVisible: false,
    }}
  >
    <Stack.Screen name="Tab" component={Tabs} />
    <Stack.Screen
      name="Detail"
      component={Detail}
      // options={{
      //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      // }}
    />
  </Stack.Navigator>
);
