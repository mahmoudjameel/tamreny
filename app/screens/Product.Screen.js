// @ts-nocheck
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TouchableNativeFeedback } from "react-native";
import Autolink from "react-native-autolink";
import axios from "axios";
import Icon from "react-native-ionicons";
import { API_URL } from "../settings/Config";
import { Header, ReactBtn, ConfirmBuy } from "../components";
import { useThemeContext, useAppContext } from "../helpers/AppProvider";

const Product = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const { setIsLoading } = useAppContext();

  //Set the article data from params
  const { productObj } = props.route.params;

  const [product, setProduct] = useState({});
  const [confirmBoxVisible, setConfirmBoxVisible] = useState(false);

  useEffect(() => {
    setProduct(productObj);
    getArticle();
  }, []);

  const getArticle = async () => {
    try {
      // setIsLoading(true);
      let response = await axios.post(`${API_URL}/products/get`, {
        _id: productObj._id,
      });
      let data = await response.data;

      if (data.status) {
        setProduct(data.products[0]);
      } else {
        alert(data.errors);
      }
      // setIsLoading(false);
    } catch (e) {
      alert(e.message);
      // setIsLoading(false);
    }
  };

  const formatTime = (time) => {
    let days = new Date(time).getDate();
    let month = new Date(time).getMonth() + 1;
    let year = new Date(time).getFullYear();

    return `${days}/${month}/${year}`;
  };

  /******************************************************/

  const MainContainer = styled.View`
    flex: 1;
    padding: 10px 8px 80px;
  `;

  const ScrollContainer = styled.ScrollView``;

  const Container = styled.View`
    flex: 1;
    background-color: ${Colors.white};
    elevation: 10;
    border: 1px ${Colors.black + "11"};
    border-radius: 12px;
    padding: 50px 15px 18px;
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

  const Content = styled.Text`
    font-size: 18px;
    font-family: ArabicUI;
    line-height: 34px;
  `;

  const PriceContainer = styled.View`
    border-bottom-right-radius: 10px;
    border-top-left-radius: 10px;
    border: 1px solid ${Colors.black + "11"};
    background-color: ${Colors.primary};
    width: 90px;
    height: 50px;
    position: absolute;
    top: -2px;
    left: -1px;
    z-index: 1;
    justify-content: center;
    align-items: center;
    elevation: 5;
  `;
  const PriceText = styled.Text`
    font-family: Cairo-Bold;
    color: ${Colors.white};
    font-size: 18px;
  `;

  const BuyBtn = styled.View`
    background-color: ${Colors.primary};
    padding: 15px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: 2;
    width: 100%;
  `;
  const BuyBtnText = styled.Text`
    font-family: Cairo-Bold;
    font-size: 20px;
    margin-right: 7px;
    color: ${Colors.white};
  `;

  /******************************************************/

  return (
    <>
      <Header {...props} title={product.title} backBtnEnabled />
      <ReactBtn customStyle={{ bottom: 90 }} />
      {!!confirmBoxVisible && (
        <ConfirmBuy setConfirmBoxVisible={setConfirmBoxVisible} {...props} />
      )}
      <ScrollContainer>
        <MainContainer>
          <Container>
            <PriceContainer>
              <PriceText>{product.price} د.ع</PriceText>
            </PriceContainer>
            <Title>{product.title}</Title>
            <MainImageContainer>
              <MainImage source={{ uri: product.mainImage }} />
            </MainImageContainer>
            <Title style={{ textAlign: "right" }}>التفاصيل</Title>
            <Autolink text={product.description} component={Content} />
            {!!product.coachBrief && (
              <>
                <Title style={{ textAlign: "right" }}>
                  السيرة الذاتية للكوتش
                </Title>
                <Autolink text={product.coachBrief} component={Content} />
              </>
            )}
          </Container>
        </MainContainer>
      </ScrollContainer>
      <TouchableNativeFeedback onPress={() => setConfirmBoxVisible(true)}>
        <BuyBtn>
          <BuyBtnText>اشتري</BuyBtnText>
          <Icon name="cart" size={34} color={Colors.white} />
        </BuyBtn>
      </TouchableNativeFeedback>
    </>
  );
};

export default Product;
