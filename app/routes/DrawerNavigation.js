import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import MainNavigation from "./MainNavigation";
import { Loading } from "../components";
import { useAppContext } from "../helpers/AppProvider";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const { isLoading } = useAppContext();

  return (
    <>
      {isLoading && <Loading />}
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawer {...props} />}
          initialRouteName="MainNavigation"
          drawerPosition="right"
        >
          <Drawer.Screen name="MainNavigation" component={MainNavigation} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

export default DrawerNavigation;
