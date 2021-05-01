// @ts-nocheck
import React from "react";
import { TouchableNativeFeedback } from "react-native";
import styled from "styled-components";
import ShareBtn from "./ShareBtn";
import LikeBtn from "./LikeBtn";
import { useThemeContext } from "../helpers/AppProvider";

const ProductCard = ({ navigation, product }) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  /******************************************************/

  const Container = styled.View`
    width: 100%;
    height: 250px;
    border-radius: 10px;
    background-color: ${Colors.white};
    elevation: 10;
    margin-bottom: 15px;
    border: 1px solid ${Colors.black + "11"};
    overflow: hidden;
  `;

  const ProductImage = styled.Image`
    width: 102%;
    height: 60%;
  `;

  const Title = styled.Text`
    font-size: 18px;
    font-family: Cairo-SemiBold;
    line-height: 24px;
    margin: 14px 12px 5px 30px;
  `;

  const Description = styled.Text`
    font-size: 14px;
    line-height: 22px;
    font-family: ArabicUI;
    margin: 0px 12px 5px 30px;
    color: ${Colors.darkGray};
  `;

  const LikeBtnStyle = styled.View`
    position: absolute;
    z-index: 5;
    top: 10px;
    right: 10px;
  `;

  const ShareBtnStyle = styled(LikeBtnStyle)`
    left: 10px;
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
    left: 0px;
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

  /******************************************************/

  return (
    <TouchableNativeFeedback
      useForeground
      onPress={() =>
        navigation.navigate("Product", {
          productObj: product,
        })
      }
    >
      <Container>
        <LikeBtn style={LikeBtnStyle} />
        <PriceContainer>
          <PriceText>250 د.ع</PriceText>
        </PriceContainer>
        <ProductImage source={{ uri: product.mainImage }} />
        <Title numberOfLines={1}>{product.title}</Title>
        <Description numberOfLines={2}>{product.content}</Description>
      </Container>
    </TouchableNativeFeedback>
  );
};

export default ProductCard;
