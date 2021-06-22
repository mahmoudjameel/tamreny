// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Modal, TouchableNativeFeedback, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components";
import { useThemeContext, useAppContext } from "../helpers/AppProvider";

const ChangeColor = ({ visible, onClose = () => null }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [faceImages, setFaceImages] = useState([]);

  const { Colors, setPrimaryColor } = useThemeContext();
  const { setPrimaryFace } = useAppContext();

  useEffect(() => {
    setIsVisible(visible);
    getImagesUri();
  }, [visible]);

  const selectFace = async ({ color, image }) => {
    try {
      await AsyncStorage.setItem("@primary_color", color);
      await AsyncStorage.setItem("@primary_face", JSON.stringify(image));
      setPrimaryColor(color);
      setPrimaryFace(image);
      onClose();
    } catch (e) {
      alert(e.message);
    }
  };

  //Get images uris
  const getImagesUri = async () => {
    setFaceImages({
      noFace: Image.resolveAssetSource(
        (await import("../assets/img/no-face1.png")).default
      ).uri,
      happyFace: Image.resolveAssetSource(
        (await import("../assets/img/happy-face1.png")).default
      ).uri,
      sadFace: Image.resolveAssetSource(
        (await import("../assets/img/sad-face1.png")).default
      ).uri,
      powerFace: Image.resolveAssetSource(
        (await import("../assets/img/power-face1.png")).default
      ).uri,
      afraidFace: Image.resolveAssetSource(
        (await import("../assets/img/afraid-face1.png")).default
      ).uri,
      exhaustedFace: Image.resolveAssetSource(
        (await import("../assets/img/exhausted-face1.png")).default
      ).uri,
      loveFace: Image.resolveAssetSource(
        (await import("../assets/img/love-face1.png")).default
      ).uri,
      angryFace: Image.resolveAssetSource(
        (await import("../assets/img/angry-face1.png")).default
      ).uri,
    });
  };

  /******************************************************/
  return (
    <MainContainer
      bgColor={Colors.white}
      animationType="fade"
      visible={isVisible}
      onRequestClose={() => onClose()}
      transparent
    >
      <Container bgColor={Colors.black + "cc"}>
        <RowContainer>
          <FaceContainer>
            <TouchableNativeFeedback
              onPress={() =>
                selectFace({
                  color: "#55BE6C",
                  image: faceImages.noFace,
                })
              }
              useForeground
            >
              <ImageContainer>
                <FaceImage source={{ uri: faceImages.noFace }}></FaceImage>
              </ImageContainer>
            </TouchableNativeFeedback>
            <FaceText color={Colors.white} numberOfLines={1}>
              أخضر
            </FaceText>
          </FaceContainer>
          <FaceContainer upper>
            <TouchableNativeFeedback
              onPress={() =>
                selectFace({
                  color: "#FECA57",
                  image: faceImages.happyFace,
                })
              }
              useForeground
            >
              <ImageContainer>
                <FaceImage source={{ uri: faceImages.happyFace }}></FaceImage>
              </ImageContainer>
            </TouchableNativeFeedback>
            <FaceText color={Colors.white} numberOfLines={1}>
              أصفر
            </FaceText>
          </FaceContainer>
          <FaceContainer>
            <TouchableNativeFeedback
              onPress={() =>
                selectFace({
                  color: "#B2BEC3",
                  image: faceImages.sadFace,
                })
              }
              useForeground
            >
              <ImageContainer>
                <FaceImage source={{ uri: faceImages.sadFace }}></FaceImage>
              </ImageContainer>
            </TouchableNativeFeedback>
            <FaceText color={Colors.white} numberOfLines={1}>
              رمادي
            </FaceText>
          </FaceContainer>
        </RowContainer>
        <RowContainer>
          <FaceContainer>
            <TouchableNativeFeedback
              onPress={() =>
                selectFace({
                  color: "#00A9FD",
                  image: faceImages.powerFace,
                })
              }
              useForeground
            >
              <ImageContainer>
                <FaceImage source={{ uri: faceImages.powerFace }}></FaceImage>
              </ImageContainer>
            </TouchableNativeFeedback>
            <FaceText color={Colors.white} numberOfLines={1}>
              سمائي
            </FaceText>
          </FaceContainer>
          <BigCircle bgColor={Colors.lightGray}>
            <BigText color={Colors.darkGray}>إختر لونك</BigText>
          </BigCircle>
          <FaceContainer>
            <TouchableNativeFeedback
              onPress={() =>
                selectFace({
                  color: "#576574",
                  image: faceImages.afraidFace,
                })
              }
              useForeground
            >
              <ImageContainer>
                <FaceImage source={{ uri: faceImages.afraidFace }}></FaceImage>
              </ImageContainer>
            </TouchableNativeFeedback>
            <FaceText color={Colors.white} numberOfLines={1}>
              رصاصي
            </FaceText>
          </FaceContainer>
        </RowContainer>
        <RowContainer>
          <FaceContainer>
            <TouchableNativeFeedback
              onPress={() =>
                selectFace({
                  color: "#F97F51",
                  image: faceImages.exhaustedFace,
                })
              }
              useForeground
            >
              <ImageContainer>
                <FaceImage
                  source={{ uri: faceImages.exhaustedFace }}
                ></FaceImage>
              </ImageContainer>
            </TouchableNativeFeedback>
            <FaceText color={Colors.white} numberOfLines={1}>
              برتقالي
            </FaceText>
          </FaceContainer>
          <FaceContainer lower>
            <TouchableNativeFeedback
              onPress={() =>
                selectFace({
                  color: "#B33771",
                  image: faceImages.loveFace,
                })
              }
              useForeground
            >
              <ImageContainer>
                <FaceImage source={{ uri: faceImages.loveFace }}></FaceImage>
              </ImageContainer>
            </TouchableNativeFeedback>
            <FaceText color={Colors.white} numberOfLines={1}>
              وردي
            </FaceText>
          </FaceContainer>
          <FaceContainer>
            <TouchableNativeFeedback
              onPress={() =>
                selectFace({
                  color: "#FF5252",
                  image: faceImages.angryFace,
                })
              }
              useForeground
            >
              <ImageContainer>
                <FaceImage source={{ uri: faceImages.angryFace }}></FaceImage>
              </ImageContainer>
            </TouchableNativeFeedback>
            <FaceText color={Colors.white} numberOfLines={1}>
              أحمر
            </FaceText>
          </FaceContainer>
        </RowContainer>
      </Container>
    </MainContainer>
  );
};

const MainContainer = styled(Modal)`
  background-color: ${(props) => props.bgColor};
`;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.bgColor};
  justify-content: center;
  align-items: center;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const FaceContainer = styled.View`
  margin: 0 10px;
  align-items: center;
  top: ${(props) => (props.upper ? -30 : props.lower ? 30 : 0)}px;
  width: 110px;
`;

const ImageContainer = styled.View`
  width: 65px;
  height: 65px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  elevation: 7;
`;
const FaceImage = styled.Image`
  width: 70px;
  height: 70px;
  resizeMode: center ;

  
  
`;


const FaceText = styled.Text`
  color: ${(props) => props.color};
  font-size: 16px;
  text-align: center;
  font-family: ArabicUI;
  margin-top: 2px;
  text-shadow: 0px 0px 1px #ffffff;
`;

const BigCircle = styled.View`
  width: 150px;
  height: 150px;
  border-radius: ${200 / 2}px;
  background-color: ${(props) => props.bgColor};
  elevation: 10;
  justify-content: center;
  align-items: center;
`;

const BigText = styled.Text`
  font-family: Cairo-Bold;
  font-size: 23px;
  color: ${(props) => props.color};
  text-align: center;
`;

export default ChangeColor;
