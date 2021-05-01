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

const Gyms = props => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const [permission, askPermission, getPermission] = usePermissions(LOCATION, {
    ask: true
  });
  const [halls, setHalls] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getHalls();
  }, []);

  const getHalls = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      let response = await axios.post(`${API_URL}/halls/get/near`, {
        lng: location.coords.longitude,
        lat: location.coords.latitude
      });
      let data = await response.data;

      if (data.status) {
        setHalls(data.halls);
      } else {
        alert(data.errors);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /******************************************************/

  const ScrollContainer = styled.ScrollView`
    background-color: ${Colors.white};
    min-height: 100%;
  `;

  const MainContainer = styled.View`
    flex: 1;
    background-color: ${Colors.white};
  `;

  const Container = styled.View`
    flex: 1;
    background-color: ${Colors.white};
    padding: 20px 15px;
  `;
  const NormalText = styled.Text`
    font-family: Cairo-Regular;
    font-size: 20px;
    margin-top: 10px;
    color: ${props => props.color};
    text-align: center;
  `;

  /******************************************************/
  return (
    <>
      <Header {...props} title="الصالات الرياضية" backBtnEnabled />
      <MainContainer>
        <SearchBtn
          style={{ position: "absolute", bottom: 15, left: 18, zIndex: 6 }}
          onSearch={setSearchQuery}
        />
        <ScrollContainer>
          <Container>
            {halls.filter(
              hall =>
                hall.name.includes(searchQuery) ||
                hall.brief.includes(searchQuery)
            ).length != 0 ? (
              halls
                .filter(
                  hall =>
                    hall.name.includes(searchQuery) ||
                    hall.brief.includes(searchQuery)
                )
                .map(
                  ({ city, brief, name, _id, subscriptions, images, dis }) => (
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
            ) : (
              <NormalText color={Colors.darkGray}>
                لا يوجد مكملات غذائية
              </NormalText>
            )}
          </Container>
        </ScrollContainer>
      </MainContainer>
    </>
  );
};

export default Gyms;
