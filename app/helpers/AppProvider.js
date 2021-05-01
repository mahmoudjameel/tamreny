// @ts-nocheck
import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";

//Colors
import ColorsObj from "../settings/Colors";

//Assets
import PowerFace from "../assets/img/power-face.png";

const AppContext = createContext();
const ThemeContext = createContext();
const AuthContext = createContext();

export const useAppContext = () => useContext(AppContext);
export const useThemeContext = () => useContext(ThemeContext);
export const useAuthContext = () => useContext(AuthContext);

export const AppProvider = ({ children }) => {
  const [Colors, setColors] = useState(ColorsObj);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [forceLogin, setForceLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [primaryFace, setPrimaryFace] = useState(
    Image.resolveAssetSource(PowerFace).uri
  );

  useEffect(() => {
    getFaceImage();
    getPrimaryColor();

    (async () => {
      //Check if access_token & user_data exist on storage
      const accessToken = JSON.parse(
        await AsyncStorage.getItem("@access_token")
      );
      const userData = JSON.parse(await AsyncStorage.getItem("@user_data"));

      if (!accessToken || !userData) setIsLoggedIn(false);
      else setIsLoggedIn(true);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!isLoggedIn) {
        await AsyncStorage.removeItem("@access_token");
        await AsyncStorage.removeItem("@user_data");
      }
    })();
  }, [isLoggedIn]);

  const getPrimaryColor = async () => {
    try {
      let primary = await AsyncStorage.getItem("@primary_color");
      if (primary) {
        setColors({ ...Colors, primary });
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const getFaceImage = async () => {
    try {
      let imageUri = await AsyncStorage.getItem("@primary_face");
      if (imageUri) {
        setPrimaryFace(JSON.parse(imageUri));
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <AppContext.Provider
      value={{ isLoading, setIsLoading, primaryFace, setPrimaryFace }}
    >
      <ThemeContext.Provider
        value={{
          Colors,
          setPrimaryColor: (color) => setColors({ ...Colors, primary: color }),
        }}
      >
        <AuthContext.Provider
          value={{ isLoggedIn, setIsLoggedIn, forceLogin, setForceLogin }}
        >
          {children}
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </AppContext.Provider>
  );
};
