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

const App = () => {
  const [fontsLoaded] = useFonts({
    Ionicons: require("react-native-ionicons/fonts/Ionicons.ttf"),
    "Cairo-Regular": require("./app/assets/fonts/Cairo-Regular.ttf"),
    "Cairo-SemiBold": require("./app/assets/fonts/Cairo-SemiBold.ttf"),
    "Cairo-Bold": require("./app/assets/fonts/Cairo-Bold.ttf"),
    ArabicUI: require("./app/assets/fonts/ArabicUITextMedium.otf"),
  });
  const adUnitID = Platform.select({
    // https://developers.google.com/admob/ios/test-ads
    ios: "ca-app-pub-3940256099942544/1712485313",
    // https://developers.google.com/admob/android/test-ads
    android: "ca-app-pub-3940256099942544/5224354917",
  });
  useEffect(() => {
    (async () => {
      await AdMobInterstitial.setAdUnitID(
        "ca-app-pub-3940256099942544/1033173712"
      ); // Test ID, Replace with your-admob-unit-id
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
      await AdMobInterstitial.showAdAsync();
    })();
  }, []);

  return (
    <AppProvider>
      {fontsLoaded && (
        <>
          <DrawerNavigation />

          <PublisherBanner
            bannerSize="banner"
            adUnitID={"ca-app-pub-1425926517331745/4139536433"}
            //didFailToReceiveAdWithError={this.bannerError}
            //admobDispatchAppEvent={this.adMobEvent}
          />
        </>
      )}
    </AppProvider>
  );
};

export default App;
