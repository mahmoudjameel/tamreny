// @ts-nocheck
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePermissions, LOCATION } from "expo-permissions";
import * as Location from "expo-location";
import { Header } from "../components/index";
import { GymCard, SearchBtn } from "../components/index";
import { useThemeContext } from "../helpers/AppProvider";
import axios from "axios";
import { API_URL } from "../settings/Config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Gyms = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const [permission, askPermission, getPermission] = usePermissions(LOCATION, {
    ask: true,
  });
  const [halls, setHalls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getHalls();
  }, []);

  const getHalls = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      let response = await axios.post(`${API_URL}/halls/get/near`, {
        lng: location.coords.longitude,
        lat: location.coords.latitude,
      });
      let data = await response.data;

      if (data.status) {
        setHalls(data.halls);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        alert(data.errors);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /******************************************************/
  return (
    <>
      <Header {...props} title="الصالات الرياضية" backBtnEnabled />
      <SearchBtn
        style={{ position: "absolute", bottom: 15, left: 18, zIndex: 6 }}
        onSearch={setSearchQuery}
      />
      <KeyboardAwareScrollView>
        <MainContainer bgColor={Colors.white}>
          <ScrollContainer bgColor={Colors.white}>
            <Container bgColor={Colors.white}>
              {halls.filter(
                (hall) =>
                  hall.name.includes(searchQuery) ||
                  hall.brief.includes(searchQuery)
              ).length != 0 ? (
                halls
                  .filter(
                    (hall) =>
                      hall.name.includes(searchQuery) ||
                      hall.brief.includes(searchQuery)
                  )
                  .map(
                    ({
                      city,
                      brief,
                      name,
                      _id,
                      subscriptions,
                      images,
                      dis,
                    }) => (
                      <GymCard
                        key={_id}
                        {...props}
                        _id={_id}
                        name={name}
                        city={city}
                        brief={brief}
                        subscriptions={subscriptions}
                        images={images}
                        dis={dis}
                      />
                    )
                  )
              ) : isLoading ? (
                <NormalText color={Colors.darkGray}>
                  جاري تحميل البيانات
                </NormalText>
              ) : (
                <NormalText color={Colors.darkGray}>
                  لا يوجد صالات رياضية{" "}
                </NormalText>
              )}
            </Container>
          </ScrollContainer>
        </MainContainer>
      </KeyboardAwareScrollView>
    </>
  );
};

/******************************************************/

const ScrollContainer = styled.ScrollView`
  background-color: ${(props) => props.bgColor};
  min-height: 100%;
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.bgColor};
`;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.bgColor};
  padding: 20px 15px;
`;
const NormalText = styled.Text`
  font-family: Cairo-Regular;
  font-size: 20px;
  margin-top: 10px;
  color: ${(props) => props.color};
  text-align: center;
`;

export default Gyms;
