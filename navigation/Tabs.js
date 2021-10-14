import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import TV from "../screens/TV";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { kBLACK, kDARK_GRAY, kLIGHT_GRAY, kYELLOW } from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? kBLACK : "white",
      }}
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: isDark ? kBLACK : "white",
        },
        tabBarActiveTintColor: isDark ? kYELLOW : kBLACK,
        tabBarInactiveTintColor: isDark ? kDARK_GRAY : kLIGHT_GRAY,
        headerStyle: {
          backgroundColor: isDark ? kBLACK : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : kBLACK,
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 12,
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={TV}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
