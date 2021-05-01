// @ts-nocheck
import React, { useState } from "react";
import { TouchableNativeFeedback, Modal } from "react-native";
import styled from "styled-components";
import { useThemeContext, useAuthContext } from "../helpers/AppProvider";

const MustLogin = ({ navigation }) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const { setForceLogin } = useAuthContext();

  const [isVisible, setIsVisible] = useState(true);

  const closeModal = () => {
    setIsVisible(false);
    setForceLogin(false);
  };

  /******************************************************/
  const Container = styled.View`
    background-color: rgba(0, 0, 0, 0.6);
    flex: 1;
    justify-content: center;
    align-items: center;
  `;
  const Title = styled.Text`
    font-family: Cairo-Bold;
    color: ${Colors.white};
    font-size: 24px;
    margin-bottom: 60px;
  `;
  const Btn = styled.View`
    background-color: ${Colors.primary};
    width: 70%;
    height: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    border: 1.5px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin: 15px 0px;
    elevation: 6;
  `;
  const BtnText = styled.Text`
    font-family: Cairo-SemiBold;
    color: ${Colors.white};
    font-size: 20px;
  `;
  const NoticeText = styled.Text`
    font-family: Cairo-Regular;
    color: ${Colors.white};
    font-size: 16px;
  `;

  /******************************************************/

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationDuration={2000}
      animationType="slide"
      onRequestClose={closeModal}
    >
      <Container>
        <Title>يجب عليك تسجيل الدخول أولا</Title>
        <TouchableNativeFeedback
          onPress={() => {
            closeModal();
            navigation.navigate("Login");
          }}
          useForeground
        >
          <Btn>
            <BtnText>تسجيل الدخول</BtnText>
          </Btn>
        </TouchableNativeFeedback>
        <NoticeText>اذا لم يكن لديك حساب مسبقا</NoticeText>
        <TouchableNativeFeedback
          onPress={() => {
            closeModal();
            navigation.navigate("Register");
          }}
          useForeground
        >
          <Btn>
            <BtnText>حساب جديد</BtnText>
          </Btn>
        </TouchableNativeFeedback>
        <NoticeText
          style={{ color: "#fff", marginTop: 20, fontSize: 20 }}
          onPress={closeModal}
        >
          إلغاء
        </NoticeText>
      </Container>
    </Modal>
  );
};

export default MustLogin;
