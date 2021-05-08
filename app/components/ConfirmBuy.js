import React, { useState, useEffect } from "react";
import { Modal, TouchableNativeFeedback } from "react-native";
import styled from "styled-components";
import { RadioButton } from "react-native-paper";
import { useThemeContext, useAuthContext } from "../helpers/AppProvider";
import axios from "axios";
import { API_URL } from "../settings/Config";

const ConfirmBuy = ({
  navigation,
  product,
  setConfirmBoxVisible = (visible) => null,
}) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;
  const { user } = useAuthContext();

  const [isVisible, setIsVisible] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    getPayementMethods();
  }, []);

  const getPayementMethods = async () => {
    try {
      let response = await axios.post(`${API_URL}/paymentMethods/get`);
      let data = await response.data;

      if (data.status) {
        setPaymentMethods(data.paymentMethods);
      } else {
        alert(data.errors);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const createOrder = async () => {
    try {
      let response = await axios.post(`${API_URL}/orders/add`, {
        productId: product._id,
        paymentMethodId: paymentMethods[selectedMethod]._id,
        userId: user._id,
        statusId: 1,
      });
      let data = await response.data;
      if (data.status) {
        let order = data.product;
        setIsVisible(false);
        setConfirmBoxVisible(false);
        navigation.navigate("Order", {
          selectedMethod: paymentMethods[selectedMethod],
          order,
          product,
        });
      } else {
        alert(data.errors);
      }
    } catch (e) {
      alert(e.message);
    }
  };

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
            {product?.title}
          </Text>
          <Text>
            السعر <Text font="Cairo-Bold">{product?.price}</Text> دينار عراقي
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
              onPress={async () => {
                await createOrder();
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
