// @ts-nocheck
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import WebView from "react-native-webview";
import { Header, ReactBtn, ImageSlider } from "../components";
import { useThemeContext } from "../helpers/AppProvider";
import axios from "axios";
import { API_URL, YOUTUBE_PLAYER } from "../settings/Config";

const Gym = props => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;
  //Set the hall data from params
  const { _id, dis } = props.route.params;
  const [hall, setHall] = useState({});

  useEffect(() => {
    getHall();
  }, []);

  const getHall = async () => {
    try {
      let response = await axios.post(`${API_URL}/halls/get`, { _id });
      let data = await response.data;

      if (data.status) {
        setHall(data.halls[0]);
      } else {
        alert(data.errors);
      }
    } catch (e) {
      alert(e.message);
    }
  };
  /******************************************************/

  const MainContainer = styled.View`
    flex: 1;
    padding: 10px 8px;
  `;

  const ScrollContainer = styled.ScrollView``;

  const Container = styled.View`
    flex: 1;
    background-color: ${Colors.white};
    elevation: 10;
    border: 1px ${Colors.black + "11"};
    border-radius: 12px;
    padding: 18px 15px;
  `;

  const Title = styled.Text`
    font-family: Cairo-Bold;
    font-size: 20px;
    text-align: center;
    margin: 10px 0px 20px;
  `;

  const SliderContainer = styled.View`
    border-radius: 12px;
    elevation: 8;
    border: 1px ${Colors.black + "11"};
    overflow: hidden;
    width: 100%;
    height: 200px;
    background-color: ${Colors.white};
  `;

  const Content = styled.Text`
    font-size: 18px;
    font-family: ArabicUI;
    line-height: 34px;
  `;

  const RowContainer = styled.View`
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
  `;

  const SmallImage = styled.Image`
    width: 25px;
    height: 30px;
    opacity: 0.7;
    resize-mode: contain;
  `;

  const NormalText = styled.Text`
    font-size: 18px;
    line-height: 22px;
    font-family: ArabicUI;
    color: ${Colors.black};
    opacity: 0.9;
    margin-right: 8px;
  `;

  const BoldText = styled(Title)`
    font-size: 18px;
  `;

  const RegularText = styled(BoldText)`
    font-family: Cairo-SemiBold;
  `;

  /******************************************************/
  return (
    <>
      <Header {...props} title={hall.name} backBtnEnabled />
      <ReactBtn />
      <ScrollContainer>
        <MainContainer>
          <Container>
            <Title>{hall.name}</Title>
            <SliderContainer>
              <ImageSlider
                width={"100%"}
                height={"100%"}
                images={hall.images}
                videos={[]}
              />
            </SliderContainer>
            <RowContainer
              style={{
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20
              }}
            >
              <SmallImage source={require("../assets/img/location.png")} />
              <NormalText numberOfLines={1}>{hall.city}</NormalText>
              <SmallImage
                source={require("../assets/img/distance.png")}
                style={{ height: 25, width: 25, marginRight: 20 }}
              />
              <NormalText numberOfLines={1}>{Math.round(dis)} كم</NormalText>
            </RowContainer>
            <Title style={{ textAlign: "right", marginBottom: 5 }}>
              نبذة مختصرة
            </Title>
            <Content>{hall.brief}</Content>
            <Title style={{ textAlign: "right", marginBottom: 5 }}>
              نوع الاشتراك
            </Title>
            <RowContainer style={{ marginTop: 40, marginBottom: 5 }}>
              <BoldText>المدة</BoldText>
              <BoldText>السعر</BoldText>
            </RowContainer>
            {hall.subscriptions &&
              hall.subscriptions.map((sub, i) => {
                return (
                  <RowContainer key={i}>
                    <RegularText>{sub.name}</RegularText>
                    <RegularText>{sub.price}</RegularText>
                  </RowContainer>
                );
              })}
          </Container>
        </MainContainer>
      </ScrollContainer>
    </>
  );
};

export default Gym;
