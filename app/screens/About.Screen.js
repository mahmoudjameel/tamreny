import React, { useState, useEffect } from "react";
import {
  TouchableNativeFeedback,
  useWindowDimensions,
  Linking,
} from "react-native";
import { Switch } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header, ChangeColor } from "../components/index";
import styled from "styled-components";
import { useThemeContext, useAppContext } from "../helpers/AppProvider";
import * as pkg from "../../app.json";

const About = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const [favouritesSwitch, setFavouritesSwitch] = useState(false);
  const [changeColorVisible, setChangeColorVisible] = useState(false);

  const { height } = useWindowDimensions();
  const { primaryFace } = useAppContext();

  useEffect(() => {
    (async () => {
      const favouritesOption = await AsyncStorage.getItem(
        "@settings_favourites_download"
      );
      if (favouritesOption) setFavouritesSwitch(eval(favouritesOption));
      else setFavouritesSwitch(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(
        "@settings_favourites_download",
        `${favouritesSwitch}`
      );
    })();
  }, [favouritesSwitch]);

  /******************************************************/
  return (
    <>
      <Header {...props} title="عن التطبيق" backBtnEnabled />
      <ChangeColor
        visible={changeColorVisible}
        onClose={() => {
          setChangeColorVisible(false);
        }}
      />
      <ScrollContainer>
        <MainContainer minHeight={height}>
          <Container bgColor={Colors.white} borderColor={Colors.black + "11"}>
            <RowContainer>
              <NormalText color={Colors.darkGray}>
                تطبيق تمريني هوه تطبيق شامل للرياضيين بشكل عام ولرياضة كمال
                الاجسام بشكل خاص بحيث هوه مزود بكل اقسام التي يحتاجها الرياضي
                -المقالات -حاسبه البروتينات -حاسبة القيم الغذائيه -متجر للمكملات
                العذائيه -اقسام للتمارين وكيفيه ادائها وغيرها من الاقسام المفيده
                اذا كنت تبحث عن تطبيق يكون رفيق تمرينك ويساعدك بكل شي يخص
                التمرين فأنت بالمكان الصحيح تطبيق تمريني هوه الحل لك
              </NormalText>
            </RowContainer>

            <NormalText
              color={Colors.darkGray}
              style={{ textAlign: "center", fontSize: 16, marginTop: "auto" }}
            >
              جميع الحقوق محفوظة {"\n"}
              Tamreny © {new Date().getFullYear()}
              {"\n"}
              تم تصميم وتطوير التطبيق بواسطة{"\n"}
              <NormalText
                color={Colors.darkGray}
                style={{ color: Colors.green }}
                onPress={() =>
                  Linking.openURL("https://web.facebook.com/ahmed987654")
                }

              >
                Ahmed Muthana

              </NormalText>
            </NormalText>
          </Container>
        </MainContainer>
      </ScrollContainer>
    </>
  );
};

const MainContainer = styled.View`
  flex: 1;
  padding: 10px 8px;
  min-height: ${(props) => props.minHeight - 100}px;
`;

const ScrollContainer = styled.ScrollView``;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.bgColor};
  elevation: 10;
  border: 1px ${(props) => props.borderColor};
  border-radius: 12px;
  padding: 25px 15px;
  padding-bottom: 30px;
`;

const RowContainer = styled.View`
  flex-direction: row-reverse;
  margin-bottom: 30px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const NormalText = styled.Text`
  font-family: Cairo-Regular;
  font-size: 18px;
  color: ${(props) => props.color};
`;

export default About;
