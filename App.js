// @ts-nocheck
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import DrawerNavigation from "./app/routes/DrawerNavigation";
import { AppProvider } from "./app/helpers/AppProvider";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import { Platform, I18nManager } from "react-native";

const App = () => {
  try {
    I18nManager.allowRTL(false);
  } catch(e) {
    console.log("error", e);
  }
  const [fontsLoaded] = useFonts({
    Ionicons: require("react-native-ionicons/fonts/Ionicons.ttf"),
    "Cairo-Regular": require("./app/assets/fonts/Cairo-Regular.ttf"),
    "Cairo-SemiBold": require("./app/assets/fonts/Cairo-SemiBold.ttf"),
    "Cairo-Bold": require("./app/assets/fonts/Cairo-Bold.ttf"),
    ArabicUI: require("./app/assets/fonts/ArabicUITextMedium.otf"),
  });

  // useEffect(() => {
  //   (async () => {
  //     await AdMobInterstitial.setAdUnitID(
  //       Platform.OS == "android"
  //         ? "ca-app-pub-2927383253903778/8715601720"
  //         : "ca-app-pub-2927383253903778/2248419814"
  //     ); // Test ID, Replace with your-admob-unit-id
  //     await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
  //     await AdMobInterstitial.showAdAsync();
  //   })();
  // }, []);

  return (
    <AppProvider>
      {fontsLoaded && (
        <>
          <DrawerNavigation />

          <PublisherBanner
            bannerSize="banner"
            adUnitID={
              Platform.OS == "ios"
                ? "ca-app-pub-2927383253903778/2231752723"
                : "ca-app-pub-2927383253903778/3589421647"
            }
            //didFailToReceiveAdWithError={this.bannerError}
            //admobDispatchAppEvent={this.adMobEvent}
          />
        </>
      )}
    </AppProvider>
  );
};

export default App;
