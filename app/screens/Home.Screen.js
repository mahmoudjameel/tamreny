// @ts-nocheck
import React from "react";
import { TouchableNativeFeedback } from "react-native";
import styled from "styled-components";
import { Header, ChangeColor } from "../components/index";
import { useThemeContext } from "../helpers/AppProvider";

const Home = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  /******************************************************/

  const ScrollContainer = styled.ScrollView`
    background-color: ${Colors.white};
  `;

  const Container = styled.View`
    flex: 1;
    background-color: ${Colors.white};
    padding: 40px 15px;
  `;

  const SmallCardsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
  `;

  const SmallCard = styled.View`
    width: 30%;
    height: 150px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.95);
    elevation: 6;
    background-color: ${Colors.white};
    border-radius: 10px;
    overflow: hidden;
    border: 0.5px solid ${Colors.black + "11"};
    padding: 10px 0px;
    align-items: center;
  `;

  const BigCard = styled(SmallCard)`
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding-right: 20px;
  `;

  const BigCardLeft = styled.View``;

  const CardBtn = styled.View`
    background-color: ${Colors.primary};
    border-radius: 20px;
    overflow: hidden;
    margin-top: 10px;
    align-self: center;
  `;

  const SmallImage = styled.Image`
    width: 80%;
    height: 50%;
    resize-mode: contain;
    align-self: center;
  `;

  const BigImage = styled.Image`
    align-self: center;
    height: 80%;
    width: 50%;
    resize-mode: contain;
  `;

  const CardText = styled.Text`
    font-size: 18px;
    text-align: center;
    align-self: center;
    line-height: 26px;
    margin-top: 15px;
    font-family: Cairo-SemiBold;
    color: ${Colors.black};
  `;

  const CardBtnText = styled(CardText)`
    padding: 6px 40px;
    font-family: Cairo-SemiBold;
    font-size: 16px;
    margin: 0;
    color: ${Colors.white};
  `;

  const CardTitle = styled.Text`
    font-size: 20px;
    font-family: Cairo-Bold;
    color: ${Colors.black};
    text-align: center;
  `;

  /******************************************************/
  return (
    <>
      <Header {...props} title="الرئيسية" />
      <ScrollContainer>
        <Container>
          <SmallCardsContainer>
            <TouchableNativeFeedback
              useForeground
              onPress={() => props.navigation.navigate("Food")}
            >
              <SmallCard>
                <SmallImage source={require("../assets/img/food.png")} />
                <CardText>القيمة{"\n"}الغذائية</CardText>
              </SmallCard>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              useForeground
              onPress={() => props.navigation.navigate("Protein")}
            >
              <SmallCard>
                <SmallImage source={require("../assets/img/monitoring.png")} />
                <CardText>حاسبة{"\n"}البروتينات</CardText>
              </SmallCard>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              useForeground
              onPress={() => props.navigation.navigate("Articles")}
            >
              <SmallCard>
                <SmallImage source={require("../assets/img/blog.png")} />
                <CardText>المقالات</CardText>
              </SmallCard>
            </TouchableNativeFeedback>
          </SmallCardsContainer>
          <BigCard>
            <BigImage source={require("../assets/img/shops.png")} />
            <BigCardLeft>
              <CardTitle>متجر المنتجات</CardTitle>
              <TouchableNativeFeedback
                useForeground
                onPress={() => props.navigation.navigate("Products")}
              >
                <CardBtn>
                  <CardBtnText>اشتري الأن</CardBtnText>
                </CardBtn>
              </TouchableNativeFeedback>
            </BigCardLeft>
          </BigCard>
          <SmallCardsContainer>
            <TouchableNativeFeedback
              useForeground
              onPress={
                () =>
                  props.navigation.navigate("Exercises", {
                    type: 2,
                    name: "تمارين رياضية",
                  }) //type = 2 => Video Exercises
              }
            >
              <SmallCard>
                <SmallImage source={require("../assets/img/strength.png")} />
                <CardText>تمارين{"\n"}رياضية</CardText>
              </SmallCard>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              useForeground
              onPress={() => props.navigation.navigate("Supplements")}
            >
              <SmallCard>
                <SmallImage source={require("../assets/img/flat.png")} />
                <CardText>المكملات{"\n"}الغذائية</CardText>
              </SmallCard>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              useForeground
              onPress={
                () =>
                  props.navigation.navigate("ExercisesCats", {
                    type: 1,
                    title: "تمارين جاهزة",
                  }) //type = 1 => Image Exercises
              }
            >
              <SmallCard>
                <SmallImage source={require("../assets/img/fitness.png")} />
                <CardText>تمارين{"\n"}جاهزة</CardText>
              </SmallCard>
            </TouchableNativeFeedback>
          </SmallCardsContainer>
          <BigCard>
            <BigImage source={require("../assets/img/gym.png")} />
            <BigCardLeft>
              <CardTitle>الصالات الرياضية</CardTitle>
              <TouchableNativeFeedback
                useForeground
                onPress={() => props.navigation.navigate("Gyms")}
              >
                <CardBtn>
                  <CardBtnText>معرفة المزيد</CardBtnText>
                </CardBtn>
              </TouchableNativeFeedback>
            </BigCardLeft>
          </BigCard>
        </Container>
      </ScrollContainer>
    </>
  );
};

export default Home;
