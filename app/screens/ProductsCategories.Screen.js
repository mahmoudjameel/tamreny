// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import { Header, SearchBtn, ProductCategoryCard } from "../components/index";
import axios from "axios";
import { API_URL } from "../settings/Config";
import { useThemeContext, useAppContext } from "../helpers/AppProvider";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const ProductCategories = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const { setIsLoading } = useAppContext();

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      let response = await axios.post(`${API_URL}/product-categories/get`);
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

  return (
    <>
      <Header {...props} title="متجر المنتجات" backBtnEnabled />
      <KeyboardAwareScrollView>
        <ScrollView>
          {/* <SearchBtn
            //style={{ position: "absolute", bottom: 40, left: 18, zIndex: 6 }}
            onSearch={setSearchQuery}
          /> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              flexWrap: "wrap",
              flex: 1,
            }}
          >
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
                .map((category, i) => (
                  <ProductCategoryCard key={i} {...props} category={category} />
                ))
            ) : (
              <Text style={{ color: Colors.darkGray, textAlign: "center" }}>
                لا يوجد منتجات
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </>
  );
};

export default ProductCategories;
