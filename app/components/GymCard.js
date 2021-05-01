// @ts-nocheck
import React from "react";
import { TouchableNativeFeedback, Image } from "react-native";
import styled from "styled-components";
import ShareBtn from "./ShareBtn";
import LikeBtn from "./LikeBtn";
import { useThemeContext } from "../helpers/AppProvider";

const GymCard = ({
  navigation,
  images = ["http://i3.ytimg.com/vi/erLk59H86ww/maxresdefault.jpg"],
}) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  /******************************************************/
  const Container = styled.View`
    width: 100%;
    height: 240px;
    border-radius: 10px;
    background-color: ${Colors.white};
    elevation: 10;
    margin-bottom: 15px;
    border: 1px solid ${Colors.black + "11"};
    overflow: hidden;
  `;

  const SliderContainer = styled.View`
    width: 102%;
    height: 60%;
  `;

  const Title = styled.Text`
    font-size: 20px;
    font-family: Cairo-Bold;
    margin-right: 8px;
  `;

  const NormalText = styled.Text`
    font-size: 18px;
    line-height: 22px;
    font-family: ArabicUI;
    color: ${Colors.black};
    opacity: 0.9;
    margin-right: 8px;
  `;

  const LikeBtnStyle = styled.View`
    position: absolute;
    z-index: 5;
    top: 10px;
    right: 10px;
  `;

  const ShareBtnStyle = styled(LikeBtnStyle)`
    left: 10px;
  `;

  const SmallImage = styled.Image`
    width: 25px;
    height: 30px;
    opacity: 0.7;
    resize-mode: contain;
  `;

  const RowContainer = styled.View`
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    margin-right: 15px;
  `;

  /******************************************************/

  return (
    <TouchableNativeFeedback
      useForeground
      onPress={() => navigation.navigate("Gym", { _id: 1 })}
    >
      <Container>
        <LikeBtn style={LikeBtnStyle} />
        <ShareBtn style={ShareBtnStyle} />
        <SliderContainer>
          <Image
            source={{
              uri: images[0],
            }}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        </SliderContainer>
        <RowContainer style={{ marginTop: 10, marginLeft: 15 }}>
          <RowContainer style={{ justifyContent: "flex-start", width: "60%" }}>
            <SmallImage source={require("../assets/img/name-sign.png")} />
            <Title numberOfLines={1}>قاعة بغداد</Title>
          </RowContainer>
          <RowContainer>
            <SmallImage source={require("../assets/img/location.png")} />
            <NormalText numberOfLines={1}>بغداد</NormalText>
          </RowContainer>
        </RowContainer>
        <RowContainer style={{ marginTop: 10, marginLeft: 15 }}>
          <RowContainer style={{ justifyContent: "flex-start", width: "60%" }}>
            <SmallImage source={require("../assets/img/price.png")} />
            <NormalText numberOfLines={1} style={{ maxWidth: "90%" }}>
              يومي ، اسبوعي ، شهري
            </NormalText>
          </RowContainer>
          <RowContainer>
            <SmallImage
              source={require("../assets/img/distance.png")}
              style={{ height: 25, width: 25 }}
            />
            <NormalText numberOfLines={1}>غير معروف</NormalText>
          </RowContainer>
        </RowContainer>
      </Container>
    </TouchableNativeFeedback>
  );
};

export default GymCard;
