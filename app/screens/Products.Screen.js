import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../settings/Config";
import { Header } from "../components/index";
import { ProductCard, SearchBtn } from "../components/index";
import { useThemeContext, useAppContext } from "../helpers/AppProvider";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Products = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const { setIsLoading } = useAppContext();
  //get category id
  const category = props.route.params.category;
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      let response = await axios.post(`${API_URL}/products/get/category`, {
        categoryId: category._id,
      });
      let data = await response.data;
      if (data.status) {
        setProducts(data.products);
      } else {
        alert(data.errors);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  /******************************************************/

  return (
    <>
      <Header {...props} title={category.title} backBtnEnabled />
      <SearchBtn
        style={{ position: "absolute", bottom: 40, left: 18, zIndex: 6 }}
        onSearch={setSearchQuery}
      />
      <MainContainer bgColor={Colors.white}>
        <ScrollContainer bgColor={Colors.white}>
          <Container bgColor={Colors.white}>
            {products.filter(
              (product) =>
                product.title.includes(searchQuery) ||
                product.description.includes(searchQuery)
            ).length != 0 ? (
              products
                .filter(
                  (product) =>
                    product.title.includes(searchQuery) ||
                    product.description.includes(searchQuery)
                )
                .map((product, i) => (
                  <ProductCard key={i} {...props} product={product} />
                ))
            ) : (
              <NormalText color={Colors.darkGray}>لا يوجد منتجات</NormalText>
            )}
          </Container>
        </ScrollContainer>
      </MainContainer>
    </>
  );
};

const ScrollContainer = styled.ScrollView`
  background-color: ${(props) => props.bgColor};
  min-height: 100%;
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.bgColor};
`;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.bgColor};
  padding: 20px 15px;
  height: 100%;
`;

const NormalText = styled.Text`
  font-family: Cairo-Regular;
  font-size: 20px;
  margin-top: 10px;
  color: ${(props) => props.color};
  text-align: center;
`;
export default Products;
