import React, { useState, useEffect } from "react";
import { Modal, TouchableNativeFeedback } from "react-native";
import styled from "styled-components";
import { RadioButton } from "react-native-paper";
import { useThemeContext } from "../helpers/AppProvider";

const ConfirmBuy = ({
  navigation,
  title = "هنا يوضع عنوان المنتج",
  price = 250,
  setConfirmBoxVisible = (visible) => null,
}) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const [isVisible, setIsVisible] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      _id: 1,
      name: "زين كاش",
    },
    {
      _id: 2,
      name: "اسيا حوالة",
    },
    {
      _id: 3,
      name: "ماستر الرافدين",
    },
    {
      _id: 4,
      name: "بايبال",
    },
  ]);

  /**************************************/
  const MainContainer = styled.View`
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    flex: 1;
  `;
  const Container = styled.View`
    background-color: ${Colors.white};
    border-radius: 10px;
    padding: 35px 20px;
    width: 85%;
  `;

  const Text = styled.Text`
    font-family: ${(props) => props.font || "Cairo-SemiBold"};
    font-size: 18px;
    text-align: center;
  `;

  const Line = styled.View`
    background-color: ${Colors.darkGray};
    width: 100%;
    height: 2px;
    border-radius: 8px;
    align-self: center;
    margin: 20px 10px;
  `;

  const PaymentsContainer = styled.View`
    margin: 20px 0px;
  `;

  const RowContainer = styled.View`
    flex-direction: row-reverse;
    margin-bottom: 5px;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
  `;

  const NormalText = styled.Text`
    font-family: Cairo-Regular;
    font-size: 18px;
    color: ${(props) => props.color || Colors.black};
    text-align: ${(props) => (props.center ? "center" : "right")};
  `;

  const Btn = styled.View`
    border-radius: 8px;
    background-color: ${(props) => props.color || Colors.green};
    padding: 5px 20px;
    overflow: hidden;
    width: 48%;
    justify-content: center;
    align-items: center;
  `;

  /**************************************/

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        setIsVisible(false);
        setConfirmBoxVisible(false);
      }}
    >
      <MainContainer>
        <Container>
          <Text>هل أنت متأكد من أنك تريد شراء</Text>
          <Text style={{ marginTop: 20, marginBottom: 30 }} font="Cairo-Bold">
            {title}
          </Text>
          <Text>
            السعر <Text font="Cairo-Bold">{price}</Text> دينار عراقي
          </Text>
          <Line />
          <Text>وسائل الدفع المتاحة</Text>
          <PaymentsContainer>
            {paymentMethods.map((method, i) => (
              <RowContainer key={i}>
                <RadioButton
                  color={Colors.primary}
                  value={method.name}
                  status={selectedMethod == i ? "checked" : "unchecked"}
                  onPress={() => setSelectedMethod(i)}
                  uncheckedColor={Colors.primary}
                />
                <NormalText>{method.name}</NormalText>
              </RowContainer>
            ))}
          </PaymentsContainer>
          <RowContainer style={{ justifyContent: "space-between" }}>
            <TouchableNativeFeedback
              useForeground
              onPress={() => {
                setIsVisible(false);
                setConfirmBoxVisible(false);
                navigation.navigate("Order");
              }}
            >
              <Btn>
                <NormalText center color={Colors.white}>
                  الذهاب للدفع
                </NormalText>
              </Btn>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              useForeground
              onPress={() => {
                setIsVisible(false);
                setConfirmBoxVisible(false);
              }}
            >
              <Btn color={Colors.red}>
                <NormalText center color={Colors.white}>
                  الغاء
                </NormalText>
              </Btn>
            </TouchableNativeFeedback>
          </RowContainer>
        </Container>
      </MainContainer>
    </Modal>
  );
};

export default ConfirmBuy;
