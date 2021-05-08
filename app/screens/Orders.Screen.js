import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TouchableNativeFeedback, FlatList } from "react-native";
import axios from "axios";
import { API_URL } from "../settings/Config";
import { Header } from "../components/index";
import { useThemeContext } from "../helpers/AppProvider";

const Orders = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      let response = await axios.post(`${API_URL}/orders/get`);
      let data = await response.data;
      if (data.status) {
        setOrders(data.orders);
      } else {
        alert(data.errors);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  /******************************************************/

  const MainContainer = styled.View`
    flex: 1;
  `;

  const CardContainer = styled.View`
    flex: 1;
    background-color: ${Colors.white};
    elevation: 10;
    border: 1px ${Colors.black + "11"};
    border-radius: 12px;
    margin-bottom: 25px;
  `;

  const Title = styled.Text`
    font-family: Cairo-Bold;
    font-size: 18px;
    text-align: center;
  `;

  const MainImage = styled.Image`
    height: 100%;
    width: 100%;
    resize-mode: cover;
    width: 140px;
    height: 140px;
    border-top-left-radius: 12px;
  `;

  const NormalText = styled.Text`
    font-size: ${(props) => props.size || 14}px;
    font-family: ${(props) => (props.bold ? "Cairo-Bold" : "Cairo-SemiBold")};
    line-height: 34px;
    text-align: ${(props) => (props.center ? "center" : "right")};
    color: ${(props) => props.color || Colors.darkGray};
  `;

  const RowContainer = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  `;

  const DetailsContaienr = styled.View`
    margin-top: 40px;
    padding: 15px;
  `;

  const Line = styled.View`
    background-color: ${Colors.darkGray};
    width: 100%;
    height: 2px;
    border-radius: 8px;
    align-self: center;
    margin: 20px 10px;
  `;

  const Btn = styled.View`
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    background-color: ${Colors.primary};
    padding: 9px 25px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  `;

  const PriceContainer = styled.View`
    border-bottom-right-radius: 10px;
    border-top-left-radius: 10px;
    border: 1px solid ${Colors.black + "11"};
    background-color: ${Colors.primary};
    width: 75px;
    height: 40px;
    position: absolute;
    top: -2px;
    left: -1px;
    z-index: 10;
    justify-content: center;
    align-items: center;
    elevation: 5;
  `;
  const PriceText = styled.Text`
    font-family: Cairo-Bold;
    color: ${Colors.white};
    font-size: 14px;
  `;

  const StatusCotnainer = styled.View`
    border-bottom-left-radius: 10px;
    border-top-right-radius: 10px;
    border: 1px solid ${Colors.black + "11"};
    background-color: ${(props) => props.color || Colors.black};
    width: 120px;
    height: 40px;
    position: absolute;
    top: -2px;
    right: -1px;
    z-index: 1;
    justify-content: center;
    align-items: center;
    elevation: 5;
  `;
  const StatusText = styled(PriceText)`
    font-family: Cairo-SemiBold;
  `;
  /******************************************************/

  return (
    <>
      <Header {...props} title="طلباتي" backBtnEnabled />
      <MainContainer>
        <FlatList
          data={orders}
          keyExtractor={(item, i) => i.toString()}
          contentContainerStyle={{ padding: 15 }}
          renderItem={({ item }) => (
            <CardContainer>
              <PriceContainer>
                <PriceText>{item.productId.price} د.ع</PriceText>
              </PriceContainer>
              <StatusCotnainer
                color={
                  item.statusId == 1
                    ? Colors.black
                    : item.statusId == 2
                    ? Colors.green
                    : Colors.red
                }
              >
                <StatusText>
                  {item.statusId == 1
                    ? "لم يتم الدفع"
                    : item.statusId == 2
                    ? "تم الدفع"
                    : "ملغي"}
                </StatusText>
              </StatusCotnainer>
              <RowContainer>
                <MainImage source={{ uri: item.productId.mainImage }} />
                <DetailsContaienr>
                  <Title numberOfLines={1} style={{ maxWidth: 190 }}>
                    {item.productId.title}
                  </Title>
                  <NormalText>رقم الطلب {item._id}#</NormalText>
                </DetailsContaienr>
              </RowContainer>
              <TouchableNativeFeedback
                onPress={() =>
                  props.navigation.navigate("Order", {
                    selectedMethod: item.paymentMethodId,
                    product: item.productId,
                    order: item,
                  })
                }
              >
                <Btn>
                  <Title style={{ color: Colors.white }}>التفاصيل</Title>
                </Btn>
              </TouchableNativeFeedback>
            </CardContainer>
          )}
        />
      </MainContainer>
    </>
  );
};

export default Orders;
