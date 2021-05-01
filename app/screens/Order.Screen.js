// @ts-nocheck
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TouchableNativeFeedback } from "react-native";
import axios from "axios";
import { API_URL } from "../settings/Config";
import { Header } from "../components/index";
import { useThemeContext } from "../helpers/AppProvider";

const Order = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  useEffect(() => {}, []);

  const formatTime = (time) => {
    let days = new Date(time).getDate();
    let month = new Date(time).getMonth() + 1;
    let year = new Date(time).getFullYear();

    return `${days}/${month}/${year}`;
  };

  /******************************************************/

  const MainContainer = styled.View`
    flex: 1;
    padding: 10px 8px;
  `;

  const ScrollContainer = styled.ScrollView``;

  const Container = styled.View`
    flex: 1;
    background-color: ${Colors.white};
    elevation: 10;
    border: 1px ${Colors.black + "11"};
    border-radius: 12px;
    padding: 25px 15px;
    padding-bottom: 70px;
  `;

  const Title = styled.Text`
    font-family: Cairo-Bold;
    font-size: 20px;
    text-align: center;
    margin: 10px 0px 20px;
  `;

  const MainImage = styled.Image`
    height: 200px;
    width: 100%;
    resize-mode: cover;
  `;

  const MainImageContainer = styled.View`
    border-radius: 12px;
    elevation: 8;
    border: 1px ${Colors.black + "11"};
    overflow: hidden;
    width: 100%;
    height: 200px;
    margin: 0 0 25px;
    background-color: ${Colors.primary};
  `;

  const NormalText = styled.Text`
    font-size: ${(props) => props.size || 18}px;
    font-family: ${(props) => (props.bold ? "Cairo-Bold" : "Cairo-SemiBold")};
    line-height: 34px;
    text-align: ${(props) => (props.center ? "center" : "right")};
    color: ${(props) => props.color || Colors.black};
  `;

  const Box = styled.View`
    border-radius: 8px;
    background-color: ${(props) => props.color || Colors.black};
    padding: 3px 15px;
    overflow: hidden;
    width: 48%;
    justify-content: center;
    align-items: center;
  `;

  const RowContainer = styled.View`
    flex-direction: row-reverse;
    margin: 15px 0px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
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
    border-radius: 8px;
    background-color: ${(props) => props.color || Colors.green};
    padding: 9px 25px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    margin: 15px;
  `;
  /******************************************************/

  return (
    <>
      <Header {...props} title="صفحة الطلب" backBtnEnabled />
      <ScrollContainer>
        <MainContainer>
          <Container>
            <NormalText center size={22} bold>
              رقم الطلب 134#
            </NormalText>
            <RowContainer>
              <NormalText>حالة الطلب</NormalText>
              <Box>
                <NormalText color={Colors.white}>لم يتم الدفع</NormalText>
              </Box>
            </RowContainer>
            <RowContainer>
              <NormalText>وسيلة الدفع</NormalText>
              <NormalText style={{ width: "50%" }} bold center>
                بايبال
              </NormalText>
            </RowContainer>
            <Line />

            <NormalText center size={22}>
              المنتج
            </NormalText>

            <NormalText style={{ marginTop: 15 }} center size={22} bold>
              هنا يوضع عنوان المنتج
            </NormalText>
            <NormalText
              style={{ marginTop: 25, marginBottom: 15 }}
              center
              size={22}
            >
              السعر{" "}
              <NormalText bold size={22}>
                250{" "}
              </NormalText>
              دينار عراقي
            </NormalText>
            <Line />
            <NormalText center size={22}>
              كيف يمكنني الدفع ؟
            </NormalText>
            <NormalText style={{ marginTop: 15 }} center>
              يرجي تحويل مبلغ الطلب علي البريد الالكتروني التالي
              {"\n"}elashmawydev@gmail.com{"\n"}وبعد التحويل يرجي ارفاق صورة من
              المعاملة وسوف نقوم بمراسلتك لتسليم المنتج
            </NormalText>

            <TouchableNativeFeedback useForground onPress={() => null}>
              <Btn style={{ marginTop: 25 }} color={Colors.primary}>
                <NormalText color={Colors.white}>
                  ارفاق صورة المعاملة
                </NormalText>
              </Btn>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback useForground onPress={() => null}>
              <Btn color={Colors.red}>
                <NormalText color={Colors.white}>الغاء الطلب</NormalText>
              </Btn>
            </TouchableNativeFeedback>
          </Container>
        </MainContainer>
      </ScrollContainer>
    </>
  );
};

export default Order;
