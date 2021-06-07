// @ts-nocheck
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableNativeFeedback } from "react-native";
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
        setCategories(data.proteinsCats);
      } else {
        alert(data.errors);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /******************************************************/

  const styles = StyleSheet.create({
    FlatList: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      backgroundColor: Colors.white,
      padding: 20,
    },
  });

  const MainContainer = styled.View`
    flex: 1;
    background-color: ${Colors.white};
  `;

  const CategoryCard = styled.View`
    width: 110px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.95);
    elevation: 6;
    background-color: ${Colors.white};
    border-radius: 10px;
    overflow: hidden;
    border: 0.5px solid ${Colors.black + "11"};
    padding: 20px 10px;
    align-items: center;
    margin: 15px 2%;
  `;

  const CardText = styled.Text`
    font-size: 14px;
    text-align: center;
    align-self: center;
    margin-top: 15px;
    font-family: Cairo-SemiBold;
    color: ${Colors.black};
  `;

  const SmallImage = styled.Image`
    width: 100%;
    height: 70%;
    resize-mode: contain;
    align-self: center;
  `;

  /******************************************************/
  return (
    <>
      <Header {...props} title={title} backBtnEnabled />
      <MainContainer>
        <FlatList
          contentContainerStyle={styles.FlatList}
          numColumns={3}
          data={categories}
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
          keyExtractor={(item, index) => item._id.toString()}
        />
      </MainContainer>
    </>
  );
};

export default ProteinsCats;
