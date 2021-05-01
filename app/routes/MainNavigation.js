import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Home,
  Article,
  Articles,
  Food,
  Protein,
  Gyms,
  Gym,
  ExercisesCats,
  Exercises,
  Exercise,
  Login,
  Register,
  Supplements,
  Supplement,
  Products,
  Product,
  Order,
  Orders,
  Settings
} from "../screens/index";

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="Article" component={Article} />
      <Stack.Screen name="Articles" component={Articles} />
      <Stack.Screen name="Food" component={Food} />
      <Stack.Screen name="Protein" component={Protein} />
      <Stack.Screen name="Gyms" component={Gyms} />
      <Stack.Screen name="Gym" component={Gym} />
      <Stack.Screen name="ExercisesCats" component={ExercisesCats} />
      <Stack.Screen name="Exercises" component={Exercises} />
      <Stack.Screen name="Exercise" component={Exercise} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Supplements" component={Supplements} />
      <Stack.Screen name="Supplement" component={Supplement} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
