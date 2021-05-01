// @ts-nocheck
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableNativeFeedback } from "react-native";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../settings/Config";
import { Header } from "../components/index";
import { useThemeContext } from "../helpers/AppProvider";

const ExercisesCats = (props) => {
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
      let response = await axios.post(`${API_URL}/categories/get`, {
        type,
      });
      let data = await response.data;

      if (data.status) {
        setCategories(data.categories);
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
    height: 150px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.95);
    elevation: 6;
    background-color: ${Colors.white};
    border-radius: 10px;
    overflow: hidden;
    border: 0.5px solid ${Colors.black + "11"};
    padding: 15px 10px;
    align-items: center;
    margin: 15px 2%;
  `;

  const BigCard = styled(CategoryCard)`
    width: 90%;
    flex-direction: row;
    justify-content: space-between;
    align-self: center;
    padding: 20px;
    margin-bottom: 0;
  `;

  const BigImage = styled.Image`
    align-self: center;
    height: 80%;
    width: 50%;
    resize-mode: contain;
  `;

  const CardText = styled.Text`
    font-size: 14px;
    text-align: center;
    align-self: center;
    line-height: 30px;
    margin-top: 15px;
    font-family: Cairo-SemiBold;
    color: ${Colors.black};
  `;

  const CardBtnText = styled(CardText)`
    padding: 6px 40px;
    font-family: Cairo-Bold;
    font-size: 18px;
    line-height: 30px;
    margin: 0;
    color: ${Colors.white};
  `;

  const BigCardLeft = styled.View``;

  const CardBtn = styled.View`
    background-color: ${Colors.primary};
    border-radius: 20px;
    overflow: hidden;
    align-self: center;
    justify-content: center;
    align-items: center;
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
        <BigCard>
          <BigCardLeft>
            <TouchableNativeFeedback
              useForeground
              onPress={() =>
                props.navigation.navigate("Exercises", {
                  name: "جميع التمارين",
                  type,
                })
              }
            >
              <CardBtn>
                <CardBtnText>جميع التمارين</CardBtnText>
              </CardBtn>
            </TouchableNativeFeedback>
          </BigCardLeft>
          <BigImage
            source={
              type == 1
                ? require("../assets/img/fitness.png")
                : require("../assets/img/strength.png")
            }
          />
        </BigCard>
        <FlatList
          contentContainerStyle={styles.FlatList}
          numColumns={3}
          data={categories}
          renderItem={({ item }) => (
            <TouchableNativeFeedback
              useForeground
              onPress={() =>
                props.navigation.navigate("Exercises", {
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

export default ExercisesCats;
