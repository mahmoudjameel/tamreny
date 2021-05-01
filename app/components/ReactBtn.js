// @ts-nocheck
import React, { useState } from "react";
import {
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import styled from "styled-components";
import LikeBtn from "./LikeBtn";
import ShareBtn from "./ShareBtn";
import CommentBtn from "./CommentBtn";
import { useThemeContext } from "../helpers/AppProvider";

const ReactBtn = ({ customStyle = {} }) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const [expanded, setExpanded] = useState(false);
  const [pressAnim1] = useState(new Animated.Value(10));
  const [pressAnim2] = useState(new Animated.Value(10));
  const [pressAnim3] = useState(new Animated.Value(10));

  const toggleBtn = () => {
    setExpanded(!expanded);
    Animated.parallel([
      Animated.spring(pressAnim1, {
        toValue: expanded ? 10 : 75,
        duration: 400,
        useNativeDriver: false,
      }),

      Animated.spring(pressAnim2, {
        toValue: expanded ? 10 : 145,
        duration: 400,
        useNativeDriver: false,
      }),

      Animated.spring(pressAnim3, {
        toValue: expanded ? 10 : 215,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();
  };
  /******************************************************/
  const BtnContainerStyle = styled.View`
    position: absolute;
    z-index: 2;
  `;

  const Container = styled.View`
    position: absolute;
    bottom: 25px;
    left: 25px;
    width: 70px;
    z-index: 1;
    align-items: center;
    justify-content: flex-end;
  `;

  const Circle = styled.View`
    width: ${(props) => props.size || 70}px;
    height: ${(props) => props.size || 70}px;
    border-radius: ${(props) => props.size / 2 || 35}px;
    border: 1px solid ${Colors.black + "11"};
    background-color: ${(props) => props.color || Colors.primary};
    align-items: center;
    justify-content: center;
    elevation: ${(props) => (props.shadow ? 8 : 0)};
    overflow: hidden;
    z-index: 2;
    background-color: ${(props) => props.color || Colors.primary};
  `;

  const SmallCircle = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 4px solid ${Colors.white + "80"};
    background-color: ${Colors.white};
    align-items: center;
    justify-content: center;
  `;

  /******************************************************/

  const BtnContainer = Animated.createAnimatedComponent(BtnContainerStyle);

  return (
    <TouchableWithoutFeedback>
      <Container style={{ height: expanded ? 280 : 70, ...customStyle }}>
        <TouchableNativeFeedback onPress={toggleBtn} useForeground>
          <Circle shadow style={{ zIndex: 3, bottom: 8 }}>
            <SmallCircle>
              <Circle size={25} />
            </SmallCircle>
          </Circle>
        </TouchableNativeFeedback>
        <BtnContainer style={{ bottom: pressAnim1 }}>
          <LikeBtn size={60} />
        </BtnContainer>
        <BtnContainer style={{ bottom: pressAnim2 }}>
          <ShareBtn size={60} />
        </BtnContainer>
        <BtnContainer style={{ bottom: pressAnim3 }}>
          <CommentBtn size={60} />
        </BtnContainer>
        {/* <Circle
          size={85}
          style={{ opacity: 0.2, position: "absolute", zIndex: 2 }}
        /> */}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default ReactBtn;
