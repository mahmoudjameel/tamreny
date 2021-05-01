// @ts-nocheck
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Autolink from "react-native-autolink";
import axios from "axios";
import { API_URL } from "../settings/Config";
import { Header, ReactBtn, ImageSlider } from "../components/index";
import { useThemeContext } from "../helpers/AppProvider";

const Supplement = props => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  //Set the article data from params
  const { _id } = props.route.params;

  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    try {
      let response = await axios.post(`${API_URL}/proteins/get`, { _id });
      let data = await response.data;

      if (data.status) {
        setArticle(data.proteins[0]);
      } else {
        alert(data.errors);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const formatTime = time => {
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
    padding: 18px 15px;
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
  `;
  const SliderContainer = styled.View`
    border-radius: 12px;
    elevation: 8;
    border: 1px ${Colors.black + "11"};
    overflow: hidden;
    width: 100%;
    height: 200px;
    background-color: ${Colors.white};
  `;

  const Content = styled.Text`
    font-size: 18px;
    font-family: ArabicUI;
    line-height: 34px;
  `;

  const CreateDate = styled(Content)`
    color: ${Colors.darkGray};
  `;

  /******************************************************/

  return (
    <>
      <Header {...props} title={article.name} backBtnEnabled />
      <ReactBtn />
      <ScrollContainer>
        <MainContainer>
          <Container>
            <Title>{article.name}</Title>
            <SliderContainer>
              <ImageSlider
                width={"100%"}
                height={"100%"}
                images={article.mainImage}
              />
            </SliderContainer>

            <Autolink text={article.description} component={Content} />
          </Container>
        </MainContainer>
      </ScrollContainer>
    </>
  );
};

export default Supplement;
