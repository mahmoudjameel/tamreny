// @ts-nocheck
import React, { useEffect } from "react";
import styled from "styled-components";
import { usePermissions, LOCATION } from "expo-permissions";
import * as Location from "expo-location";
import { Header } from "../components/index";
import { GymCard, SearchBtn } from "../components/index";
import { useThemeContext } from "../helpers/AppProvider";

const Gyms = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const [permission, askPermission, getPermission] = usePermissions(LOCATION, {
    ask: true,
  });

  useEffect(() => {
    // getLocation();
  }, []);

  const getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});

    console.log(location);
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

  /******************************************************/
  return (
    <>
      <Header {...props} title="الصالات الرياضية" backBtnEnabled />
      <MainContainer>
        <SearchBtn
          style={{ position: "absolute", bottom: 15, left: 18, zIndex: 6 }}
    
        />
        <ScrollContainer>
          <Container>
            <GymCard {...props} />
            <GymCard {...props} />
            <GymCard {...props} />
            <GymCard {...props} />
            <GymCard {...props} />
            <GymCard {...props} />
          </Container>
        </ScrollContainer>
      </MainContainer>
    </>
  );
};

export default Gyms;
