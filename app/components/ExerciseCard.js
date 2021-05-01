import React, { useState } from "react";
import { TouchableNativeFeedback, Image } from "react-native";
import styled from "styled-components";
import WebView from "react-native-webview";
import ShareBtn from "./ShareBtn";
import LikeBtn from "./LikeBtn";
import { useThemeContext } from "../helpers/AppProvider";
import { YOUTUBE_PLAYER } from "../settings/Config";

const ExerciseCard = ({
  navigation,
  _id,
  images = [],
  title,
  description,
  categoryId,
  type,
  videoId,
}) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  /******************************************************/
  const Container = styled.View`
    width: 100%;
    height: 230px;
    border-radius: 10px;
    background-color: ${Colors.white};
    elevation: 10;
    margin-bottom: 15px;
    border: 1px solid ${Colors.black + "11"};
    overflow: hidden;
  `;

  const ImageContainer = styled.View`
    width: 100%;
    height: 70%;
    border-bottom-width: 1px;
    border-bottom-color: ${Colors.black + "22"};
  `;

  const Title = styled.Text`
    font-size: 18px;
    font-family: Cairo-Bold;
    line-height: 30px;
    margin-top: 5px;
    text-align: center;
  `;

  const Description = styled.Text`
    font-size: 14px;
    font-family: ArabicUI;
    margin: 0 10px;
    line-height: 26px;
    color: ${Colors.darkGray};
    text-align: center;
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
  /******************************************************/

  return (
    <TouchableNativeFeedback
      useForeground
      onPress={() => navigation.navigate("Exercise", { _id, type })}
    >
      <Container>
        <LikeBtn style={LikeBtnStyle} />
        <ShareBtn style={ShareBtnStyle} />
        <ImageContainer>
          <Image
            source={{
              uri:
                images[0] ||
                `http://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
            }}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        </ImageContainer>
        <Title numberOfLines={1}>{title}</Title>
        <Description numberOfLines={1}>{description}</Description>
      </Container>
    </TouchableNativeFeedback>
  );
};

export default ExerciseCard;
