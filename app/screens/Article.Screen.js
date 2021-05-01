// @ts-nocheck
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Autolink from "react-native-autolink";
import axios from "axios";
import { API_URL } from "../settings/Config";
import { Header, ReactBtn } from "../components/index";
import { useThemeContext, useAppContext } from "../helpers/AppProvider";

const Article = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const { setIsLoading } = useAppContext();

  //Set the article data from params
  const { articleObj } = props.route.params;

  const [article, setArticle] = useState({});

  useEffect(() => {
    setArticle(articleObj);
    getArticle();
  }, []);

  const getArticle = async () => {
    try {
      // setIsLoading(true);
      let response = await axios.post(`${API_URL}/articles/get`, {
        _id: articleObj._id,
      });
      let data = await response.data;

      if (data.status) {
        setArticle(data.articles[0]);
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
    background-color: ${Colors.primary};
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
      <Header {...props} title={article.title} backBtnEnabled />
      <ReactBtn />
      <ScrollContainer>
        <MainContainer>
          <Container>
            <Title>{article.title}</Title>
            <MainImageContainer>
              <MainImage source={{ uri: article.mainImage }} />
            </MainImageContainer>
            <Content
              style={{
                marginBottom: 20,
                borderBottomWidth: 2,
                borderBottomColor: Colors.darkGray,
                borderRadius: 50,
                textAlign: "center",
              }}
            >
              تاريخ النشر :{" "}
              <CreateDate>{formatTime(article.createDate)}</CreateDate>
            </Content>
            <Autolink text={article.content} component={Content} />
          </Container>
        </MainContainer>
      </ScrollContainer>
    </>
  );
};

export default Article;
