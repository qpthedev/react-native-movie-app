import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/TV";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Movies" component={Movies} />
    <Tab.Screen name="TV" component={Tv} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
);

export default Tabs;
