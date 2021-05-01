// @ts-nocheck
import React, { useState } from "react";
import { TouchableWithoutFeedback, Animated } from "react-native";
import styled from "styled-components";
import Icon from "react-native-ionicons";
import { useThemeContext, useAuthContext } from "../helpers/AppProvider";

const LikeBtn = ({ liked = false, style = styled.View``, size, onLike }) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const { isLoggedIn, setForceLogin } = useAuthContext();

  const [isLiked, setIsLiked] = useState(liked);
  const [pressAnim] = useState(new Animated.Value(0.9));

  const pressLike = () => {
    if (!isLoggedIn) {
      setForceLogin(true);
      return;
    }

    setIsLiked(!isLiked);
    onLike(!isLiked);
    Animated.sequence([
      Animated.timing(pressAnim, {
        toValue: isLiked ? 0.9 : 2,
        duration: 200,
        useNativeDriver: false
      }),
      Animated.timing(pressAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: false
      })
    ]).start();
  };

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
  `;

  const LikeIconStyled = styled(Icon)`
    font-size: ${size / 1.4 || 32}px;
    top: 2px;
  `;

  const LikeIcon = Animated.createAnimatedComponent(LikeIconStyled);

  /******************************************************/

  return (
    <TouchableWithoutFeedback useForeground onPress={pressLike}>
      <Container>
        <LikeIcon
          name="heart"
          color={isLiked ? Colors.red : Colors.gray}
          style={{ transform: [{ scale: pressAnim }] }}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default LikeBtn;
