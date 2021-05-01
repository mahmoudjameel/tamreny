import React, { useState } from "react";
import { Modal, ActivityIndicator } from "react-native";
import styled from "styled-components";
import { useThemeContext } from "../helpers/AppProvider";

const Loading = () => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const [isVisible, setIsVisible] = useState(true);

  /**************************************/
  const Container = styled.View`
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    flex: 1;
  `;
  /**************************************/

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={() => setIsVisible(false)}
    >
      <Container>
        <ActivityIndicator size={64} color={Colors.primary} />
      </Container>
    </Modal>
  );
};

export default Loading;
