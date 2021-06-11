// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  Text,
} from "react-native";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../settings/Config";
import { Header } from "../components/index";
import { useThemeContext } from "../helpers/AppProvider";

const ProteinsCats = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  //Get params
  let { type, title } = props.route.params;

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      let response = await axios.post(`${API_URL}/protein-categories/get`, {
        type,
      });
      let data = await response.data;

      if (data.status) {
        setIsLoading(false);
        setCategories(data.proteinsCats);
      } else {
        setIsLoading(false);
        alert(data.errors);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /******************************************************/

  const styles = StyleSheet.create({
    FlatList: {
      width: "100%",
      backgroundColor: Colors.white,
    },
  });

  const MainContainer = styled.View`
    flex: 1;
    background-color: ${Colors.white};
  `;

  const CategoryCard = styled.View`
    width: 110px;
    height: 140px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.95);
    elevation: 6;
    background-color: ${Colors.white};
    border-radius: 10px;
    overflow: hidden;
    border: 0.5px solid ${Colors.black + "11"};
    padding: 10px 5px;
    align-items: center;
    margin: 15px 2%;
  `;

  const CardText = styled.Text`
    font-size: 14px;
    text-align: center;
    align-self: center;
    line-height: 21px;
    margin-top: 5px;
    font-family: Cairo-SemiBold;
    color: ${Colors.black};
  `;

  const SmallImage = styled.Image`
    width: 100px;
    height: 80px;
    resize-mode: contain;
    align-self: center;
  `;

  const NormalText = styled.Text`
    font-family: Cairo-Regular;
    font-size: 20px;
    margin-top: 10px;
    color: ${(props) => props.color};
    text-align: center;
  `;

  /******************************************************/
  return (
    <>
      <Header {...props} title={title} backBtnEnabled />
      <MainContainer>
        {isLoading ? (
          <NormalText color={Colors.darkGray}>جاري تحميل البيانات</NormalText>
        ) : (
          <FlatList
            contentContainerStyle={styles.FlatList}
            numColumns={3}
            data={categories}
            ListEmptyComponent={
              <NormalText color={Colors.darkGray}>لا توجد أي بيانات</NormalText>
            }
            renderItem={({ item }) => (
              <TouchableNativeFeedback
                useForeground
                onPress={() =>
                  props.navigation.navigate("Proteins", {
                    categoryId: item._id,
                    name: item.name,
                    type,
                  })
                }
              >
                <CategoryCard>
                  <SmallImage source={{ uri: item.image }} />
                  <CardText>{item.name}</CardText>
                </CategoryCard>
              </TouchableNativeFeedback>
            )}
            keyExtractor={(item, index) => item._id.toString() + index}
          />
        )}
      </MainContainer>
    </>
  );
};

export default ProteinsCats;
