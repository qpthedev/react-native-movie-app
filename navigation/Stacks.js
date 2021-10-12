import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";

const ScreenOne = ({ navigation: { navigate } }) => (
  <View>
    <Pressable onPress={() => navigate("Two")}>
      <Text>Screen One</Text>
    </Pressable>
  </View>
);

const ScreenTwo = ({ navigation: { navigate } }) => (
  <View>
    <Pressable onPress={() => navigate("Three")}>
      <Text>Screen Two</Text>
    </Pressable>
  </View>
);

const ScreenThree = ({ navigation: { navigate } }) => (
  <View>
    <Pressable onPress={() => navigate("One")}>
      <Text>Screen Three</Text>
    </Pressable>
  </View>
);

const Stack = createNativeStackNavigator();

const Stacks = () => (
  <Stack.Navigator>
    <Stack.Screen name="One" component={ScreenOne} />
    <Stack.Screen name="Two" component={ScreenTwo} />
    <Stack.Screen name="Three" component={ScreenThree} />
  </Stack.Navigator>
);

export default Stacks;
