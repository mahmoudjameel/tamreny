// @ts-nocheck
import React, { useState } from "react";
import { TouchableNativeFeedback } from "react-native";
import styled from "styled-components";
import Icon from "react-native-ionicons";
import { useThemeContext } from "../helpers/AppProvider";


const CommentBtn = ({ style = styled.View``, size }) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  /******************************************************/
  const Container = styled(style)`
    width: ${size || 45}px;
    height: ${size || 45}px;
    border-radius: ${size / 2 || 30}px;
    border: 1px solid ${Colors.black + "11"};
    background-color: ${Colors.white};
    align-items: center;
    justify-content: center;
    elevation: 8;
    overflow: hidden;
  `;

  const CommentIcon = styled(Icon)`
    font-size: ${size / 1.6 || 32}px;
    left: 1px;
    color: ${Colors.primary};
    transform: rotateY(-180deg);
  `;

  /******************************************************/
  return (
    <TouchableNativeFeedback useForeground onPress={() => null}>
      <Container>
        <CommentIcon name="ios-chatbubbles" />
      </Container>
    </TouchableNativeFeedback>
  );
};

export default CommentBtn;
