import React, { useState, useEffect } from "react";
import { TouchableNativeFeedback } from "react-native";
import styled from "styled-components";
import Icon from "react-native-ionicons";
import { StatusBar } from "react-native";
import ChangeColor from "./ChangeColor";
import { useThemeContext, useAppContext } from "../helpers/AppProvider";

const Header = ({ title = "Header", navigation, backBtnEnabled = false }) => {
  const [changeColorVisible, setChangeColorVisible] = useState(false);

  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const { primaryFace } = useAppContext();

  /******************************************************/

  /******************************************************/

  return (
    <>
      <ChangeColor
        visible={changeColorVisible}
        onClose={() => {
          setChangeColorVisible(false);
        }}
      />
      <Container bgColor={Colors.primary}>
        <TouchableNativeFeedback
          onPress={() => setChangeColorVisible(true)}
          useForeground
        >
          <FaceContainer>
            <FaceImage source={{ uri: primaryFace.toString() }} />
          </FaceContainer>
        </TouchableNativeFeedback>
        <Title color={Colors.white} numberOfLines={1}>
          {title}
        </Title>
        {backBtnEnabled ? (
          <TouchableNativeFeedback
            onPress={() => navigation.goBack()}
            useForeground
          >
            <BackContainer>
              <BackIcon name="ios-arrow-back" />
            </BackContainer>
          </TouchableNativeFeedback>
        ) : (
          <TouchableNativeFeedback
            onPress={() => navigation.openDrawer()}
            useForeground
          >
            <BarContainer>
              <BarLine bgColor={Colors.white} width={100} />
              <BarLine bgColor={Colors.white} width={65} />
              <BarLine bgColor={Colors.white} width={80} />
            </BarContainer>
          </TouchableNativeFeedback>
        )}
      </Container>
    </>
  );
};

const Container = styled.View`
  elevation: 20;
  width: 100%;
  height: 95px;
  padding-top: ${StatusBar.currentHeight + 10}px;
  padding-bottom: 5px;
  background-color: ${(props) => props.bgColor};
  flex-direction: row;
  justify-content: space-between;
`;

const FaceContainer = styled.View`
  width: 45px;
  height: 45px;
  border-radius: ${100 / 2}px;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  overflow: hidden;
  elevation: 2;
`;

const FaceImage = styled.Image`
  width: 45px;
  height: 45px;
  resize-mode: contain;
`;

const ShareContainer = styled.View`
  width: 45px;
  height: 45px;
  border-radius: 15px;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  overflow: hidden;
`;

const ShareIcon = styled(Icon)`
  color: white;
  font-size: 30px;
  transform: rotateY(-180deg);
`;

const BackIcon = styled(Icon)`
  color: white;
  font-size: 30px;
  transform: rotateY(-180deg);
`;

const Title = styled.Text`
  font-size: 20px;
  font-family: Cairo-SemiBold;
  color: ${(props) => props.color};
  align-self: center;
  max-width: 50%;
  text-align: center;
`;

const BarContainer = styled.View`
  width: 50px;
  height: 45px;
  padding: 10px 6px;
  border-radius: 15px;
  overflow: hidden;
  align-self: center;
  justify-content: space-between;
  align-items: flex-end;
  margin-right: 15px;
`;

const BackContainer = styled(BarContainer)`
  justify-content: center;
  align-items: center;
`;

const BarLine = styled.View`
  width: ${(props) => props.width}%;
  height: 3.5px;
  background-color: ${(props) => props.bgColor};
  border-radius: 10px;
`;

export default Header;
