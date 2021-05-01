// @ts-nocheck
import React from "react";
import styled from "styled-components";
import WebView from "react-native-webview";
import { Header, ReactBtn, ImageSlider } from "../components";
import { useThemeContext } from "../helpers/AppProvider";
import { YOUTUBE_PLAYER } from "../settings/Config";

const Gym = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

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
      <Header {...props} title="قاعة بغداد" backBtnEnabled />
      <ReactBtn />
      <ScrollContainer>
        <MainContainer>
          <Container>
            <Title>قاعة بغداد</Title>
            <SliderContainer>
              <ImageSlider
                width={"100%"}
                height={"100%"}
                images={[
                  "http://i3.ytimg.com/vi/quoINM6twdg/maxresdefault.jpg",
                  "http://i3.ytimg.com/vi/erLk59H86ww/maxresdefault.jpg",
                  "http://i3.ytimg.com/vi/c7I17N-Tfz0/maxresdefault.jpg",
                ]}
                videos={["quoINM6twdg", "erLk59H86ww"]}
              />
            </SliderContainer>
            <RowContainer
              style={{
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <SmallImage source={require("../assets/img/location.png")} />
              <NormalText numberOfLines={1}>بغداد</NormalText>
              <SmallImage
                source={require("../assets/img/distance.png")}
                style={{ height: 25, width: 25, marginRight: 20 }}
              />
              <NormalText numberOfLines={1}>1.2 كم</NormalText>
            </RowContainer>
            <Title style={{ textAlign: "right", marginBottom: 5 }}>
              نبذة مختصرة
            </Title>
            <Content>
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
              هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو
              العديد
            </Content>
            <Title style={{ textAlign: "right", marginBottom: 5 }}>
              نوع الاشتراك
            </Title>
            <RowContainer style={{ marginTop: 40, marginBottom: 5 }}>
              <BoldText>المدة</BoldText>
              <BoldText>السعر</BoldText>
            </RowContainer>
            <RowContainer>
              <RegularText>يومي</RegularText>
              <RegularText>كالوري</RegularText>
            </RowContainer>
            <RowContainer>
              <RegularText>اسبوعي</RegularText>
              <RegularText>غرام</RegularText>
            </RowContainer>
            <RowContainer>
              <RegularText>شهري</RegularText>
              <RegularText>غرام</RegularText>
            </RowContainer>
          </Container>
        </MainContainer>
      </ScrollContainer>
    </>
  );
};

export default Gym;
