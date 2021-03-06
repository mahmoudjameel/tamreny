// @ts-nocheck
import React, { useEffect, useState } from "react";
import { TouchableNativeFeedback, Linking } from "react-native";
import styled from "styled-components";
import { Header, ChangeColor, ImageSlider } from "../components/index";
import { useThemeContext } from "../helpers/AppProvider";
import axios from "axios";
import { API_URL } from "../settings/Config";
const Home = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    getAdvertisements();
  }, []);

  const getAdvertisements = async () => {
    try {
      let response = await axios.post(`${API_URL}/advertisements/get`);
      let data = await response.data;
      if (data.status) {
        setAdvertisements(data.advertisements);
      } else {
        //alert(data.errors);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  //
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

  const onAdsPress = (index) => {
    const link = advertisements[index].link;
    link && Linking.openURL(advertisements[index].link);
  };
  /******************************************************/
  return (
    <>
      <Header {...props} title="????????????????" />
      <ScrollContainer>
        <Container>
          {advertisements.length > 0 && (
            <MainImageContainer>
              <ImageSlider
                width={"100%"}
                height={"100%"}
                images={advertisements}
                onPress={onAdsPress}
              />
            </MainImageContainer>
          )}

          <SmallCardsContainer>
            <TouchableNativeFeedback
              useForeground
              onPress={() => props.navigation.navigate("Food")}
            >
              <SmallCard>
                <SmallImage source={require("../assets/img/food.png")} />
                <CardText>????????????{"\n"}????????????????</CardText>
              </SmallCard>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              useForeground
              onPress={() => props.navigation.navigate("Protein")}
            >
              <SmallCard>
                <SmallImage source={require("../assets/img/monitoring.png")} />
                <CardText>??????????{"\n"}????????????????????</CardText>
              </SmallCard>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              useForeground
              onPress={() => props.navigation.navigate("Articles")}
            >
              <SmallCard>
                <SmallImage source={require("../assets/img/blog.png")} />
                <CardText>????????????????</CardText>
              </SmallCard>
            </TouchableNativeFeedback>
          </SmallCardsContainer>
          <BigCard>
            <BigImage source={require("../assets/img/shops.png")} />
            <BigCardLeft>
              <CardTitle>???????? ????????????????</CardTitle>
              <TouchableNativeFeedback
                useForeground
                onPress={() => props.navigation.navigate("ProductsCategories")}
              >
                <CardBtn>
                  <CardBtnText>?????????? ????????</CardBtnText>
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
                    name: "???????? ???? ????????????",
                  }) //type = 2 => Video Exercises
              }
            >
              <SmallCard>
                <SmallImage source={require("../assets/img/strength.png")} />
                <CardText>???????? ????{"\n"}????????????</CardText>
              </SmallCard>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              useForeground
              //onPress={() => props.navigation.navigate("Supplements")}
              onPress={() =>
                props.navigation.navigate("ProteinsCats", {
                  type: null,
                  title: "???????????????? ????????????????",
                })
              }
            >
              <SmallCard>
                <SmallImage source={require("../assets/img/flat.png")} />
                <CardText>????????????????{"\n"}????????????????</CardText>
              </SmallCard>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              useForeground
              onPress={
                () =>
                  props.navigation.navigate("ExercisesCats", {
                    type: 1,
                    title: "???????????? ??????????",
                  }) //type = 1 => Image Exercises
              }
            >
              <SmallCard>
                <SmallImage source={require("../assets/img/fitness.png")} />
                <CardText>????????????{"\n"}??????????</CardText>
              </SmallCard>
            </TouchableNativeFeedback>
          </SmallCardsContainer>
          <BigCard>
            <BigImage source={require("../assets/img/gym.png")} />
            <BigCardLeft>
              <CardTitle>?????????????? ????????????????</CardTitle>
              <TouchableNativeFeedback
                useForeground
                onPress={() => props.navigation.navigate("Gyms")}
              >
                <CardBtn>
                  <CardBtnText>?????????? ????????????</CardBtnText>
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
